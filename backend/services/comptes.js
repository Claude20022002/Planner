import crypto from "crypto";
import { Op } from "sequelize";
import { Appartenir, Enseignant, Etudiant, PasswordResetToken, Users } from "../models/index.js";
import { enTransaction } from "../models/acces.js";
import { hashPassword, verifierMotDePasse } from "../utils/passwordHelper.js";
import { pick } from "../utils/validationHelper.js";
import { sendEmail } from "../utils/sendEmail.js";

/**
 * Comptes créés par l'administration (phase B) : plus aucun mot de passe par défaut connu.
 * Sans mot de passe fourni, le compte reçoit un mot de passe aléatoire jamais communiqué et un
 * lien d'invitation (le jeton de réinitialisation, valable 7 jours) pour choisir le sien.
 * Avec un mot de passe provisoire, il devra le changer à la première connexion.
 */

const DUREE_INVITATION_JOURS = 7;
const sha256 = (valeur) => crypto.createHash("sha256").update(valeur).digest("hex");

/** Empreinte d'un mot de passe aléatoire que personne ne connaît. */
export const empreinteInutilisable = () => hashPassword(`${crypto.randomBytes(32).toString("base64url")}aA1!`);

/** Q-2 : l'identifiant n'a pas d'espace et tient dans la colonne (255). Renvoie null si valide. */
export const verifierIdentifiant = (identifiant) => {
    if (/\s/.test(identifiant)) return "L'identifiant ne peut pas contenir d'espace";
    if (identifiant.length > 255) return "L'identifiant dépasse 255 caractères";
    return null;
};

/**
 * Une clé de connexion ne désigne qu'un compte : un identifiant ne peut pas reprendre l'adresse
 * d'un autre compte, ni une adresse l'identifiant d'un autre compte (condition du chef du 26 nov.).
 * Sinon la connexion et « mot de passe oublié » trouvent le mauvais compte, et le lien de
 * réinitialisation part chez lui. Renvoie null si tout va bien, sinon { message, error }.
 */
export const collisionCleConnexion = async ({ identifiant = null, email = null, idExclu = null }) => {
    const saufSoi = idExclu ? { id_user: { [Op.ne]: idExclu } } : {};
    if (identifiant) {
        const compte = await Users.findOne({ where: { email: identifiant, ...saufSoi } });
        if (compte) return { message: "Identifiant déjà utilisé", error: "Cet identifiant est l'adresse d'un autre compte" };
    }
    // Même compte : identifiant égal à sa propre adresse (reprise de 0064), rien à signaler
    if (email && email !== identifiant) {
        const compte = await Users.findOne({ where: { identifiant: email, ...saufSoi } });
        if (compte) return { message: "Email déjà utilisé", error: "Cette adresse est l'identifiant d'un autre compte" };
    }
    return null;
};

/** Crée (ou remplace) le jeton d'invitation d'un compte et renvoie le lien à ouvrir. */
export const creerLienInvitation = async (user, transaction) => {
    const jeton = crypto.randomBytes(32).toString("hex");
    const expiration = new Date(Date.now() + DUREE_INVITATION_JOURS * 24 * 3600 * 1000);
    await PasswordResetToken.destroy({ where: { id_user: user.id_user, used: false }, transaction });
    await PasswordResetToken.create({ id_user: user.id_user, token: sha256(jeton), expires_at: expiration, used: false }, { transaction });
    return `${process.env.FRONTEND_URL || "http://localhost:5173"}/reinitialiser-mot-de-passe?token=${jeton}&id=${user.id_user}&invitation=1`;
};

const echapper = (valeur = "") =>
    String(valeur).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

/** Envoie le lien d'invitation ; renvoie vrai si l'envoi a abouti (sans jamais lever). */
export const envoyerInvitation = async (user, lien) => {
    // Sans adresse (VSC-03), l'invitation ne part pas : le lien est remis par l'école
    if (!user.email) return false;
    try {
        const resultat = await sendEmail({
            to: user.email,
            subject: "Votre compte {{produit}}",
            text: `Bonjour ${user.prenom} ${user.nom},\n\nUn compte {{produit}} a été créé pour vous. Choisissez votre mot de passe en ouvrant ce lien (valable ${DUREE_INVITATION_JOURS} jours) :\n\n${lien}\n\nL'équipe {{produit}}`,
            html: `<div style="font-family: Arial, sans-serif; max-width: 600px;">
                <p>Bonjour ${echapper(user.prenom)} ${echapper(user.nom)},</p>
                <p>Un compte {{produit}} a été créé pour vous. Choisissez votre mot de passe :</p>
                <p><a href="${lien}" style="background:#001861;color:#fff;padding:12px 24px;text-decoration:none;border-radius:4px;display:inline-block;">Choisir mon mot de passe</a></p>
                <p style="color:#666;font-size:12px;">Ce lien est valable ${DUREE_INVITATION_JOURS} jours.</p>
            </div>`,
        });
        return resultat?.success !== false;
    } catch (error) {
        console.error(`Invitation non envoyée à ${user.email} :`, error.message);
        return false;
    }
};

/**
 * Fiche liée au rôle, créée dans la même transaction que le compte : enseignant (spécialité,
 * département, statut) ou étudiant (numéro, niveau, groupe facultatif).
 */
export const creerProfil = async (user, profil = {}, transaction) => {
    if (user.role === "enseignant") {
        await Enseignant.create(
            {
                id_user: user.id_user,
                specialite: profil.specialite?.trim() || "À préciser",
                departement: profil.departement?.trim() || "À préciser",
                grade: profil.grade || null,
                ...(["permanent", "vacataire"].includes(profil.statut) ? { statut: profil.statut } : {}),
            },
            { transaction }
        );
    }
    if (user.role === "etudiant") {
        await Etudiant.create(
            {
                id_user: user.id_user,
                numero_etudiant: profil.numero_etudiant?.trim() || `ETU-${user.id_user}`,
                niveau: profil.niveau?.trim() || "À préciser",
            },
            { transaction }
        );
        if (profil.id_groupe) await Appartenir.create({ id_user_etudiant: user.id_user, id_groupe: Number(profil.id_groupe) }, { transaction });
    }
};

/**
 * Création d'un compte et de sa fiche, règles communes à la saisie unitaire et à l'import
 * (conditions du chef du 26 nov.) : identifiant obligatoire (à défaut, l'adresse en tient lieu),
 * Q-2 (sans espace, 255 au plus), Q-8 (sans adresse, mot de passe initial obligatoire), unicité de
 * l'identifiant et de l'adresse, et pas de collision entre les deux clés de connexion.
 * Renvoie { refus: { statut, corps } } si une règle refuse, sinon { user, lien, envoyee }.
 */
export const creerCompte = async (donnees = {}) => {
    const email = String(donnees.email ?? "").trim() || null;
    const identifiant = String(donnees.identifiant ?? "").trim() || email || "";
    if (!identifiant) {
        return { refus: { statut: 400, corps: { message: "Identifiant requis", error: "Un identifiant de connexion est requis (il peut reprendre l'adresse)" } } };
    }
    const motDePasse = typeof donnees.password === "string" && donnees.password ? donnees.password : null;
    // Sans adresse, aucune invitation ne peut partir : le mot de passe initial est alors obligatoire
    if (!motDePasse && !email) {
        return { refus: { statut: 400, corps: { message: "Mot de passe initial requis", error: "Sans adresse, un mot de passe initial est requis" } } };
    }
    const format = verifierIdentifiant(identifiant);
    if (format) return { refus: { statut: 400, corps: { message: format, error: format } } };

    const parIdentifiant = await Users.findOne({ where: { identifiant } });
    if (parIdentifiant) return { refus: { statut: 409, corps: { message: "Identifiant déjà utilisé", error: "Un compte utilise déjà cet identifiant" } } };
    const parAdresse = email ? await Users.findOne({ where: { email } }) : null;
    if (parAdresse) return { refus: { statut: 409, corps: { message: "Email déjà utilisé", error: "Un utilisateur avec cet email existe déjà" } } };
    const collision = await collisionCleConnexion({ identifiant, email });
    if (collision) return { refus: { statut: 409, corps: collision } };

    // Mot de passe provisoire : il suit quand même la politique (et ne contient pas l'identifiant)
    if (motDePasse) {
        const verification = await verifierMotDePasse(motDePasse, { user: donnees });
        if (!verification.valid) {
            return { refus: { statut: 400, corps: { message: verification.errors[0], error: verification.errors[0], errors: verification.errors } } };
        }
    }

    // Compte et fiche (enseignant, étudiant) dans la même transaction : jamais de compte sans fiche
    const { user, lien } = await enTransaction(async (transaction) => {
        const compte = await Users.create(
            {
                ...pick(donnees, ["nom", "prenom", "role", "telephone", "actif"]),
                identifiant,
                email,
                password_hash: motDePasse ? await hashPassword(motDePasse) : await empreinteInutilisable(),
                must_change_password: true,
            },
            { transaction }
        );
        await creerProfil(compte, donnees.profil ?? donnees, transaction);
        return { user: compte, lien: motDePasse ? null : await creerLienInvitation(compte, transaction) };
    });
    const envoyee = lien ? await envoyerInvitation(user, lien) : false;
    return { user, lien, envoyee };
};

/**
 * Import de comptes : chaque ligne crée un compte complet ou renvoie son erreur, sans bloquer les
 * autres. Les règles sont celles de la création unitaire (creerCompte), donc Q-2 et Q-8 comprises.
 */
export const importerComptes = async (users) => {
    const results = { success: [], errors: [] };
    for (const ligne of users) {
        const identifiant = String(ligne.identifiant ?? ligne.email ?? "").trim();
        try {
            const { refus, user } = await creerCompte({
                ...ligne,
                identifiant,
                role: ligne.role || "etudiant",
                actif: ligne.actif !== undefined ? ligne.actif : true,
            });
            if (refus) {
                results.errors.push({ identifiant: identifiant || "N/A", error: refus.corps.error });
                continue;
            }
            const userResponse = user.toJSON();
            delete userResponse.password_hash;
            results.success.push(userResponse);
        } catch (error) {
            console.error(`Erreur lors de la création de l'utilisateur ${identifiant}:`, error);
            results.errors.push({ identifiant: identifiant || "N/A", error: error.message || "Erreur lors de la création" });
        }
    }
    return results;
};
