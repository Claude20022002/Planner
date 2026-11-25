import { Op } from "sequelize";
import { enTransaction } from "../../models/acces.js";
import { Inscription, LienFamille, Personne, ResponsableLegal, Users } from "../../models/index.js";
import { ErreurMetier } from "../planning/enseignements.js";
import { LIENS_FAMILLE, nomComplet, nettoyerTexte, verifierPersonne } from "../../../shared/vieScolaire.js";

/**
 * Dossiers des élèves et des familles (VSC-02).
 *
 * Une seule porte d'entrée, réservée à l'administration tant que l'espace parents n'est pas ouvert :
 * une personne se crée sans compte (Q-14), un responsable est une personne plus un rôle (Q-4), et une
 * fratrie s'inscrit en une transaction — tout ou rien (question 3 du plan, EP-5).
 */

const CHAMPS = ["nom", "prenom", "date_naissance", "sexe", "lieu_naissance", "telephone", "email_contact", "cne"];
const VIDE = (valeur) => valeur === undefined || valeur === null || valeur === "";

export const exigerAdministration = (user) => {
    if (user?.role !== "admin") throw new ErreurMetier("Réservé à l'administration", 403);
};

/** Ce qui sort vers le site : l'état civil, jamais le compte lui-même. */
export const serialiserPersonne = (personne) => {
    const brute = typeof personne.toJSON === "function" ? personne.toJSON() : personne;
    return {
        id_personne: brute.id_personne,
        nom: brute.nom,
        prenom: brute.prenom,
        nom_complet: nomComplet(brute),
        date_naissance: brute.date_naissance,
        sexe: brute.sexe,
        lieu_naissance: brute.lieu_naissance,
        telephone: brute.telephone,
        email_contact: brute.email_contact,
        cne: brute.cne,
        a_un_compte: Boolean(brute.id_user),
    };
};

const donneesNettes = (donnees = {}) => {
    const valeurs = {};
    for (const champ of CHAMPS) {
        if (donnees[champ] === undefined) continue;
        const valeur = donnees[champ];
        valeurs[champ] = VIDE(valeur) ? null : typeof valeur === "string" ? nettoyerTexte(valeur) : valeur;
    }
    return valeurs;
};

const verifier = (donnees) => {
    const motif = verifierPersonne(donnees);
    if (motif) throw new ErreurMetier(motif);
};

const personneOuErreur = async (id, options = {}) => {
    const personne = await Personne.findByPk(id, options);
    if (!personne) throw new ErreurMetier("Personne introuvable", 404);
    return personne;
};

const responsableOuErreur = async (id) => {
    const responsable = await ResponsableLegal.findByPk(id, { include: [{ model: Personne, as: "personne" }] });
    if (!responsable) throw new ErreurMetier("Responsable introuvable", 404);
    return responsable;
};

/** Personnes de l'école, filtrées par un mot (nom, prénom, code Massar) ; 50 par défaut. */
export const personnes = async (user, { recherche, limite } = {}) => {
    exigerAdministration(user);
    const mot = nettoyerTexte(recherche);
    const where = mot
        ? { [Op.or]: [{ nom: { [Op.like]: `%${mot}%` } }, { prenom: { [Op.like]: `%${mot}%` } }, { cne: { [Op.like]: `%${mot}%` } }] }
        : {};
    const taille = Math.min(Math.max(Number(limite) || 50, 1), 200);
    const { rows, count } = await Personne.findAndCountAll({ where, order: [["nom", "ASC"], ["prenom", "ASC"]], limit: taille });
    return { data: rows.map(serialiserPersonne), total: count };
};

/** Le dossier complet : l'état civil, le rôle de responsable, les liens et les inscriptions. */
export const dossier = async (user, id) => {
    exigerAdministration(user);
    const personne = await personneOuErreur(id);
    const role = await ResponsableLegal.findOne({ where: { id_personne: personne.id_personne } });
    const liens = await LienFamille.findAll({
        where: { id_personne: personne.id_personne },
        include: [{ model: ResponsableLegal, as: "responsable", include: [{ model: Personne, as: "personne" }] }],
    });
    const inscriptions = await Inscription.findAll({ where: { id_personne: personne.id_personne }, order: [["id_annee", "DESC"]] });
    return {
        ...serialiserPersonne(personne),
        responsable: role ? { id_responsable: role.id_responsable, profession: role.profession, a_un_compte: Boolean(role.id_user) } : null,
        responsable_de: liens.map((lien) => ({
            id_responsable: lien.id_responsable,
            nom_complet: nomComplet(lien.responsable?.personne ?? {}),
            lien: lien.lien,
            titulaire: Boolean(lien.titulaire),
        })),
        inscriptions: inscriptions.map((i) => ({
            id_inscription: i.id_inscription,
            id_annee: i.id_annee,
            niveau: i.niveau,
            etat: i.etat,
            date_entree: i.date_entree,
            date_sortie: i.date_sortie,
        })),
    };
};

/** Crée une personne sans compte : l'adresse et le mot de passe ne sont pas demandés (Q-20). */
export const creerPersonne = async (user, donnees) => {
    exigerAdministration(user);
    const valeurs = donneesNettes(donnees);
    verifier(valeurs);
    const personne = await Personne.create(valeurs).catch((erreur) => {
        if (erreur.name === "SequelizeUniqueConstraintError") throw new ErreurMetier("Ce code Massar appartient déjà à une autre personne", 409, "CNE_DEJA_PRIS");
        throw erreur;
    });
    return serialiserPersonne(personne);
};

export const modifierPersonne = async (user, id, donnees) => {
    exigerAdministration(user);
    const personne = await personneOuErreur(id);
    const valeurs = donneesNettes(donnees);
    verifier({ nom: valeurs.nom ?? personne.nom, prenom: valeurs.prenom ?? personne.prenom, ...valeurs });
    await personne.update(valeurs).catch((erreur) => {
        if (erreur.name === "SequelizeUniqueConstraintError") throw new ErreurMetier("Ce code Massar appartient déjà à une autre personne", 409, "CNE_DEJA_PRIS");
        throw erreur;
    });
    return serialiserPersonne(personne);
};

/** Suppression possible seulement sans inscription : une scolarité ne s'efface pas (question 6). */
export const supprimerPersonne = async (user, id) => {
    exigerAdministration(user);
    const personne = await personneOuErreur(id);
    const inscriptions = await Inscription.count({ where: { id_personne: id } });
    if (inscriptions) throw new ErreurMetier("Cette personne a des inscriptions : radiez-les, elles gardent leur trace", 409, "PERSONNE_INSCRITE");
    const role = await ResponsableLegal.findOne({ where: { id_personne: Number(id) } });
    const liens = await LienFamille.count({
        where: { [Op.or]: [{ id_personne: Number(id) }, ...(role ? [{ id_responsable: role.id_responsable }] : [])] },
    });
    if (liens) throw new ErreurMetier("Cette personne est liée à une famille : retirez le lien d'abord", 409, "PERSONNE_LIEE");
    await personne.destroy();
};

/**
 * Crée une personne et son rôle de responsable dans la même transaction : le responsable saisi une
 * fois pour la fratrie (EP-5).
 */
export const creerResponsable = async (user, { personne: donnees, profession } = {}) =>
    enTransaction(async (transaction) => {
        exigerAdministration(user);
        const valeurs = donneesNettes(donnees ?? {});
        verifier(valeurs);
        const eleve = await Personne.create(valeurs, { transaction });
        const responsable = await ResponsableLegal.create({ id_personne: eleve.id_personne, profession: nettoyerTexte(profession) || null }, { transaction });
        return { ...serialiserPersonne(eleve), id_responsable: responsable.id_responsable, profession: responsable.profession };
    });

/** Responsables enregistrés, avec le nombre d'enfants rattachés. */
export const responsables = async (user, { recherche, limite } = {}) => {
    exigerAdministration(user);
    const mot = nettoyerTexte(recherche);
    const taille = Math.min(Math.max(Number(limite) || 50, 1), 200);
    const trouves = await ResponsableLegal.findAll({
        include: [{ model: Personne, as: "personne", ...(mot ? { where: { [Op.or]: [{ nom: { [Op.like]: `%${mot}%` } }, { prenom: { [Op.like]: `%${mot}%` } }] } } : {}) }],
        order: [[{ model: Personne, as: "personne" }, "nom", "ASC"]],
        limit: taille,
    });
    const enfants = await LienFamille.findAll({ where: { id_responsable: { [Op.in]: trouves.map((r) => r.id_responsable) } }, attributes: ["id_responsable"] });
    const compte = enfants.reduce((total, lien) => total.set(lien.id_responsable, (total.get(lien.id_responsable) ?? 0) + 1), new Map());
    return {
        data: trouves.map((r) => ({
            id_responsable: r.id_responsable,
            personne: serialiserPersonne(r.personne),
            profession: r.profession,
            a_un_compte: Boolean(r.id_user),
            enfants: compte.get(r.id_responsable) ?? 0,
        })),
    };
};

/** Les enfants d'un responsable : le dossier d'inscription en une lecture. */
export const enfantsDuResponsable = async (user, idResponsable) => {
    exigerAdministration(user);
    const responsable = await responsableOuErreur(idResponsable);
    const liens = await LienFamille.findAll({
        where: { id_responsable: idResponsable },
        include: [{ model: Personne, as: "eleve", include: [{ model: Inscription, as: "inscriptions" }] }],
    });
    return {
        id_responsable: responsable.id_responsable,
        responsable: serialiserPersonne(responsable.personne),
        data: liens.map((lien) => ({ lien: lien.lien, titulaire: lien.titulaire, ...serialiserPersonne(lien.eleve), inscriptions: lien.eleve?.inscriptions ?? [] })),
    };
};

/** Rattache un élève à un responsable ; un seul titulaire à la fois (question 3). */
export const lierEleve = async (user, idPersonne, { id_responsable, lien, titulaire } = {}) => {
    exigerAdministration(user);
    if (!LIENS_FAMILLE.includes(lien)) throw new ErreurMetier("Lien de famille inconnu");
    await personneOuErreur(idPersonne);
    const responsable = await responsableOuErreur(Number(id_responsable));
    if (responsable.id_personne === Number(idPersonne)) throw new ErreurMetier("Une personne ne peut pas être son propre responsable");

    const existant = await LienFamille.findOne({ where: { id_personne: Number(idPersonne), id_responsable: responsable.id_responsable } });
    if (existant) throw new ErreurMetier("Ce responsable est déjà rattaché à cet élève", 409, "LIEN_EXISTANT");

    if (titulaire) {
        const autre = await LienFamille.findOne({ where: { id_personne: Number(idPersonne), titulaire: true }, include: [{ model: ResponsableLegal, as: "responsable", include: [{ model: Personne, as: "personne" }] }] });
        if (autre) throw new ErreurMetier(`Un titulaire existe déjà (${nomComplet(autre.responsable?.personne ?? {})}) : changez-le au lieu d'en ajouter un`, 409, "TITULAIRE_EXISTANT");
    }
    await LienFamille.create({ id_personne: Number(idPersonne), id_responsable: responsable.id_responsable, lien, titulaire: Boolean(titulaire) });
    return { id_personne: Number(idPersonne), id_responsable: responsable.id_responsable, lien, titulaire: Boolean(titulaire) };
};

export const delierEleve = async (user, idPersonne, idResponsable) => {
    exigerAdministration(user);
    const lien = await LienFamille.findOne({ where: { id_personne: Number(idPersonne), id_responsable: Number(idResponsable) } });
    if (!lien) throw new ErreurMetier("Lien introuvable", 404);
    await lien.destroy();
};

/**
 * Inscrit une fratrie en une transaction : le responsable, ses enfants, leurs liens et leurs
 * inscriptions, ou rien (test C5-3). Le groupe n'est pas ici : il reste dans `Appartenir`.
 */
export const inscrireFamille = async (user, { responsable, enfants, id_annee } = {}) =>
    enTransaction(async (transaction) => {
        exigerAdministration(user);
        if (!Array.isArray(enfants) || enfants.length === 0) throw new ErreurMetier("Au moins un enfant est attendu");
        if (enfants.length > 20) throw new ErreurMetier("Vingt enfants au plus par saisie");

        const valeursResponsable = donneesNettes(responsable ?? {});
        verifier(valeursResponsable);
        for (const enfant of enfants) {
            verifier(donneesNettes(enfant?.personne ?? {}));
            if (!nettoyerTexte(enfant?.personne?.niveau) && !nettoyerTexte(enfant?.niveau)) throw new ErreurMetier("Niveau de l'enfant requis");
        }

        const personneResponsable = await Personne.create(valeursResponsable, { transaction });
        const roleResponsable = await ResponsableLegal.create({ id_personne: personneResponsable.id_personne, profession: nettoyerTexte(responsable?.profession) || null }, { transaction });

        const crees = [];
        for (const enfant of enfants) {
            const valeurs = donneesNettes(enfant.personne ?? {});
            const eleve = await Personne.create(valeurs, { transaction });
            const lien = enfant.lien ?? "tuteur";
            if (!LIENS_FAMILLE.includes(lien)) throw new ErreurMetier("Lien de famille inconnu");
            const titulaire = enfants.length === 1 ? enfant.titulaire !== false : Boolean(enfant.titulaire);
            await LienFamille.create({ id_personne: eleve.id_personne, id_responsable: roleResponsable.id_responsable, lien, titulaire }, { transaction });
            const inscription = await Inscription.create(
                { id_personne: eleve.id_personne, id_annee: Number(id_annee), niveau: nettoyerTexte(enfant.niveau ?? enfant.personne?.niveau), date_entree: enfant.date_entree ?? null },
                { transaction }
            );
            crees.push({ ...serialiserPersonne(eleve), lien, titulaire, id_inscription: inscription.id_inscription, etat: inscription.etat });
        }
        return { responsable: { ...serialiserPersonne(personneResponsable), id_responsable: roleResponsable.id_responsable }, enfants: crees };
    });

/** Comptes reliés à une personne, pour la reprise de `0065` et l'écran d'administration. */
export const compterSansCompte = async (user) => {
    exigerAdministration(user);
    const total = await Personne.count();
    const avecCompte = await Personne.count({ where: { id_user: { [Op.ne]: null } } });
    const comptes = await Users.count();
    return { personnes: total, avec_compte: avecCompte, sans_compte: total - avecCompte, comptes };
};
