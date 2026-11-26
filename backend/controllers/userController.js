import { Op } from "sequelize";
import { AuthSession, Users } from "../models/index.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { getPaginationParams, createPaginationResponse } from "../utils/paginationHelper.js";
import { hashPassword, comparePassword, verifierMotDePasse } from "../utils/passwordHelper.js";
import { pick } from "../utils/validationHelper.js";
import sequelize from "../config/db.js";
import { creerLienInvitation, creerProfil, empreinteInutilisable, envoyerInvitation } from "../services/comptes.js";
import { contexteDe, journaliser } from "../services/journalSecurite.js";
import { changerActif } from "../services/desactivation/desactivation.js";
import { aUnHistorique } from "../services/desactivation/regles.js";
import { ErreurMetier } from "../services/planning/enseignements.js";
import { accorder } from "../../shared/accords.js";

// Champs dont un changement est une décision de sécurité (journalisée avec avant / après)
const CHAMPS_SENSIBLES = ["role", "actif", "identifiant", "email"];

/**
 * Contrôleur pour les utilisateurs
 */

// Champs modifiables par l'utilisateur sur son propre profil
const SELF_EDITABLE_FIELDS = ["nom", "prenom", "telephone", "avatar_url"];
// Champs modifiables par un administrateur
const ADMIN_EDITABLE_FIELDS = [...SELF_EDITABLE_FIELDS, "identifiant", "email", "role", "actif"];

// 🔍 Récupérer tous les utilisateurs (avec pagination)
export const getAllUsers = asyncHandler(async (req, res) => {
    const { page, limit, offset } = getPaginationParams(req, 10);

    // Filtre facultatif par rôle (ex. comptes enseignants sans fiche, page Enseignants)
    const where = ["admin", "enseignant", "etudiant"].includes(req.query.role) ? { role: req.query.role } : {};
    const { count, rows: users } = await Users.findAndCountAll({
        where,
        attributes: { exclude: ["password_hash"] },
        limit,
        offset,
        order: [["id_user", "DESC"]],
    });

    res.json(createPaginationResponse(users, count, page, limit));
});

// 🔍 Récupérer un utilisateur par ID
export const getUserById = asyncHandler(async (req, res) => {
    const user = await Users.findByPk(req.params.id, {
        attributes: { exclude: ["password_hash"] },
    });

    if (!user) {
        return res.status(404).json({
            message: "Utilisateur non trouvé",
            error: `Aucun utilisateur trouvé avec l'ID ${req.params.id}`,
        });
    }

    res.json(user);
});

// ➕ Créer un utilisateur
export const createUser = asyncHandler(async (req, res) => {
    // L'identifiant est obligatoire (VSC-03, Q-20) ; l'adresse est facultative. À défaut d'identifiant
    // saisi, l'adresse en tient lieu : c'est une valeur réelle, comme la reprise de 0064, et les
    // clients déjà installés continuent de créer des comptes.
    const email = typeof req.body.email === "string" && req.body.email.trim() ? req.body.email.trim() : null;
    const identifiant =
        (typeof req.body.identifiant === "string" ? req.body.identifiant.trim() : "") || email || "";
    if (!identifiant) {
        return res.status(400).json({
            message: "Identifiant requis",
            error: "Un identifiant de connexion est requis (il peut reprendre l'adresse)",
        });
    }

    // Mot de passe provisoire facultatif : sans lui, le compte reçoit un lien d'invitation
    const motDePasse = typeof req.body.password === "string" && req.body.password ? req.body.password : null;
    // Sans adresse, aucune invitation ne peut partir : le mot de passe initial est alors obligatoire.
    if (!motDePasse && !email) {
        return res.status(400).json({
            message: "Mot de passe initial requis",
            error: "Sans adresse, l'école doit remettre un mot de passe initial (aucune invitation possible)",
        });
    }

    const parIdentifiant = await Users.findOne({ where: { identifiant } });
    const parAdresse = parIdentifiant || !email ? null : await Users.findOne({ where: { email } });
    if (parIdentifiant || parAdresse) {
        const surIdentifiant = Boolean(parIdentifiant);
        return res.status(409).json({
            message: surIdentifiant ? "Identifiant déjà utilisé" : "Email déjà utilisé",
            error: surIdentifiant ? "Un compte utilise déjà cet identifiant" : "Un utilisateur avec cet email existe déjà",
        });
    }
    if (motDePasse) {
        const verification = await verifierMotDePasse(motDePasse, { user: req.body });
        if (!verification.valid) {
            return res.status(400).json({ message: verification.errors[0], error: verification.errors[0], errors: verification.errors });
        }
    }

    // Compte et fiche (enseignant, étudiant) dans la même transaction : jamais de compte sans fiche
    const { user, lien } = await sequelize.transaction(async (transaction) => {
        const compte = await Users.create(
            {
                ...pick(req.body, ["nom", "prenom", "identifiant", "email", "role", "telephone", "actif"]),
                identifiant,
                email,
                password_hash: motDePasse ? await hashPassword(motDePasse) : await empreinteInutilisable(),
                must_change_password: true,
            },
            { transaction }
        );
        await creerProfil(compte, req.body.profil, transaction);
        return { user: compte, lien: motDePasse ? null : await creerLienInvitation(compte, transaction) };
    });
    const envoyee = lien ? await envoyerInvitation(user, lien) : false;
    await journaliser(contexteDe(req), { evenement: "compte_cree", user, acteur: req.user, details: { role: user.role } });

    // Retourner l'utilisateur sans le mot de passe
    const userResponse = user.toJSON();
    delete userResponse.password_hash;

    res.status(201).json({
        message: lien ? "Compte créé : invitation envoyée" : "Utilisateur créé avec succès",
        user: userResponse,
        // Le lien reste visible par l'administration : à transmettre si l'email n'est pas parti
        invitation: lien ? { envoyee, lien } : null,
    });
});

// ✏️ Mettre à jour un utilisateur
export const updateUser = asyncHandler(async (req, res) => {
    const user = await Users.findByPk(req.params.id);

    if (!user) {
        return res.status(404).json({
            message: "Utilisateur non trouvé",
            error: `Aucun utilisateur trouvé avec l'ID ${req.params.id}`,
        });
    }

    // Liste blanche selon le rôle : un utilisateur ne peut jamais modifier son propre rôle, ni
    // son statut actif. L'identifiant (clé de connexion, VSC-03) et l'adresse sont réservés à
    // l'administrateur ; seuls le nom, le prénom, le téléphone, la photo et le mot de passe
    // restent au titulaire.
    const isAdmin = req.user.role === "admin";
    const updateData = pick(req.body, isAdmin ? ADMIN_EDITABLE_FIELDS : SELF_EDITABLE_FIELDS);

    // Si l'identifiant est modifié, vérifier qu'il n'est pas déjà pris (c'est la clé de connexion)
    if (updateData.identifiant !== undefined) {
        updateData.identifiant = String(updateData.identifiant ?? "").trim();
        if (!updateData.identifiant) {
            return res.status(400).json({ message: "Identifiant requis", error: "L'identifiant ne peut pas être vide" });
        }
        if (updateData.identifiant !== user.identifiant) {
            const existingUser = await Users.findOne({ where: { identifiant: updateData.identifiant } });
            if (existingUser) {
                return res.status(409).json({
                    message: "Identifiant déjà utilisé",
                    error: "Un compte utilise déjà cet identifiant",
                });
            }
        }
    }

    // L'adresse est facultative (VSC-03) : une saisie vide vaut « pas d'adresse », jamais une
    // chaîne vide, qui serait unique et enverrait des courriels dans le vide
    if (updateData.email !== undefined) {
        updateData.email = String(updateData.email ?? "").trim() || null;
    }

    // Si l'email est modifié, vérifier qu'il n'existe pas déjà
    if (updateData.email && updateData.email !== user.email) {
        const existingUser = await Users.findOne({ where: { email: updateData.email } });
        if (existingUser) {
            return res.status(409).json({
                message: "Email déjà utilisé",
                error: "Un utilisateur avec cet email existe déjà",
            });
        }
    }

    if (req.body.password) {
        const verification = await verifierMotDePasse(String(req.body.password), { user: { ...user.get({ plain: true }), ...updateData } });
        if (!verification.valid) {
            return res.status(400).json({ message: verification.errors[0], error: verification.errors[0], errors: verification.errors });
        }

        // Changer son propre mot de passe exige l'actuel (session volée ≠ compte volé).
        // L'administrateur qui réinitialise le mot de passe d'un autre compte n'en a pas besoin.
        const isOwnAccount = user.id_user === req.user.id_user;
        if (isOwnAccount) {
            const withHash = await Users.scope("withPassword").findByPk(user.id_user);
            const currentOk =
                typeof req.body.current_password === "string" &&
                (await comparePassword(req.body.current_password, withHash.password_hash));
            if (!currentOk) {
                return res.status(400).json({
                    message: "Mot de passe actuel incorrect",
                    error: "Saisissez votre mot de passe actuel pour en définir un nouveau",
                });
            }
        }

        updateData.password_hash = await hashPassword(String(req.body.password));
        // Son propre mot de passe : l'obligation tombe ; celui d'un autre (admin) : provisoire, à changer
        updateData.must_change_password = !isOwnAccount;
    }

    const changements = Object.fromEntries(
        CHAMPS_SENSIBLES.filter((champ) => champ in updateData && String(updateData[champ]) !== String(user[champ])).map((champ) => [champ, { avant: user[champ], apres: updateData[champ] }])
    );
    // Désactiver ou réactiver passe par les règles de la désactivation (lot ME-17)
    if ("actif" in updateData) await changerActif(req.user, user, updateData.actif, contexteDe(req));
    await user.update(updateData);
    if (Object.keys(changements).length) {
        await journaliser(contexteDe(req), { evenement: "compte_modifie", user, acteur: req.user, details: changements });
    }

    // Nouveau mot de passe : les sessions ouvertes avec l'ancien sont fermées (un compte volé ne
    // reste pas ouvert chez le voleur). Son propre compte : toutes sauf la session courante.
    if (updateData.password_hash) {
        const isOwnAccount = user.id_user === req.user.id_user;
        await AuthSession.update(
            { revoked_at: new Date(), revoked_reason: isOwnAccount ? "password_change" : "password_reset_admin" },
            {
                where: {
                    id_user: user.id_user,
                    revoked_at: null,
                    ...(isOwnAccount ? { session_id: { [Op.ne]: req.auth?.sessionId ?? "" } } : {}),
                },
            }
        );
        await journaliser(contexteDe(req), { evenement: isOwnAccount ? "mot_de_passe_change" : "mot_de_passe_reinitialise_admin", user, acteur: req.user });
    }

    // Recharger l'utilisateur pour obtenir les données à jour
    await user.reload();

    // Retourner l'utilisateur sans le mot de passe
    const userResponse = user.toJSON();
    delete userResponse.password_hash;

    res.json({
        message: "Utilisateur mis à jour avec succès",
        user: userResponse,
    });
});

// 🗑️ Supprimer un utilisateur
export const deleteUser = asyncHandler(async (req, res) => {
    const user = await Users.findByPk(req.params.id);

    if (!user) {
        return res.status(404).json({
            message: "Utilisateur non trouvé",
            error: `Aucun utilisateur trouvé avec l'ID ${req.params.id}`,
        });
    }

    if (await aUnHistorique(user.id_user)) throw new ErreurMetier("Ce compte a un historique : désactivez-le au lieu de le supprimer", 409, "A_UN_HISTORIQUE");
    await user.destroy();
    await journaliser(contexteDe(req), { evenement: "compte_supprime", user, acteur: req.user, details: { role: user.role } });

    res.json({
        message: "Utilisateur supprimé avec succès",
    });
});

// 📥 Importer des utilisateurs en masse
export const importUsers = asyncHandler(async (req, res) => {
    const { users } = req.body;

    if (!Array.isArray(users) || users.length === 0) {
        return res.status(400).json({
            message: "Données invalides",
            error: "Un tableau d'utilisateurs est requis",
        });
    }

    const results = {
        success: [],
        errors: [],
    };

    for (const userData of users) {
        let identifiant = "";
        try {
            // L'identifiant vient du fichier ; à défaut, l'adresse en tient lieu (valeur réelle).
            identifiant = String(userData.identifiant ?? userData.email ?? "").trim();
            const email = String(userData.email ?? "").trim() || null;
            if (!identifiant) {
                results.errors.push({ identifiant: "N/A", error: "Identifiant requis" });
                continue;
            }
            const existingUser = await Users.findOne({ where: { identifiant } });
            if (existingUser) {
                results.errors.push({
                    identifiant,
                    error: "Identifiant déjà utilisé",
                });
                continue;
            }

            // Préparer les données pour la création
            const userCreateData = {
                nom: userData.nom,
                prenom: userData.prenom,
                identifiant,
                email,
                role: userData.role || 'etudiant',
                telephone: userData.telephone || null,
                actif: userData.actif !== undefined ? userData.actif : true,
            };

            // Mot de passe du fichier (provisoire) ou aléatoire + invitation ; à changer à la connexion.
            // Provisoire, il suit quand même la politique : il reste valable jusqu'à la première connexion
            if (userData.password) {
                const verification = await verifierMotDePasse(String(userData.password), { user: userData });
                if (!verification.valid) {
                    results.errors.push({ identifiant, error: verification.errors[0] });
                    continue;
                }
            }
            userCreateData.password_hash = userData.password ? await hashPassword(String(userData.password)) : await empreinteInutilisable();
            userCreateData.must_change_password = true;

            const user = await sequelize.transaction(async (transaction) => {
                const compte = await Users.create(userCreateData, { transaction });
                await creerProfil(compte, userData, transaction);
                return compte;
            });
            if (!userData.password) await envoyerInvitation(user, await creerLienInvitation(user));
            const userResponse = user.toJSON();
            delete userResponse.password_hash;
            results.success.push(userResponse);
        } catch (error) {
            console.error(`Erreur lors de la création de l'utilisateur ${identifiant}:`, error);
            results.errors.push({
                identifiant: identifiant || "N/A",
                error: error.message || "Erreur lors de la création",
            });
        }
    }

    await journaliser(contexteDe(req), { evenement: "comptes_importes", acteur: req.user, id_user: req.user.id_user, details: { crees: results.success.length, erreurs: results.errors.length } });
    res.status(201).json({
        message: `${accorder(results.success.length, "utilisateur créé", "utilisateurs créés")} avec succès`,
        success: results.success,
        errors: results.errors,
        total: users.length,
        successCount: results.success.length,
        errorCount: results.errors.length,
    });
});
