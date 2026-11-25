import { Op } from "sequelize";
import { AnneeUniversitaire, Inscription, Personne } from "../../models/index.js";
import { ErreurMetier } from "../planning/enseignements.js";
import { etatsSuivants, nettoyerTexte, transitionAutorisee, verifierInscription } from "../../../shared/vieScolaire.js";

/**
 * Inscriptions d'une année (VSC-02) : création, avancement d'état, réinscription.
 *
 * Une inscription ne recule jamais et ne s'efface jamais (question 6) : elle avance d'un cran, ou se
 * termine par une radiation datée. L'année suivante crée une nouvelle ligne reliée à la précédente
 * (question 7) : l'historique se lit sans table d'archive.
 */

const aujourdhui = () => new Date().toISOString().slice(0, 10);

const exigerAdministration = (user) => {
    if (user?.role !== "admin") throw new ErreurMetier("Réservé à l'administration", 403);
};

const inscriptionOuErreur = async (id) => {
    const inscription = await Inscription.findByPk(id);
    if (!inscription) throw new ErreurMetier("Inscription introuvable", 404);
    return inscription;
};

const serialiser = (inscription, personne = null) => ({
    id_inscription: inscription.id_inscription,
    id_personne: inscription.id_personne,
    id_annee: inscription.id_annee,
    niveau: inscription.niveau,
    etat: inscription.etat,
    date_entree: inscription.date_entree,
    date_sortie: inscription.date_sortie,
    id_inscription_precedente: inscription.id_inscription_precedente,
    ...(personne ? { personne: { id_personne: personne.id_personne, nom: personne.nom, prenom: personne.prenom, cne: personne.cne } } : {}),
});

/** Les années scolaires connues, la plus récente d'abord : l'écran n'a pas à les deviner. */
export const anneesScolaires = async (user) => {
    exigerAdministration(user);
    const annees = await AnneeUniversitaire.findAll({ order: [["libelle", "DESC"]] });
    return { data: annees.map((a) => ({ id_annee: a.id_annee, libelle: a.libelle, active: Boolean(a.active) })) };
};

/** Inscriptions d'une année (toutes par défaut), avec la personne pour la liste de l'écran. */
export const inscriptions = async (user, { id_annee, etat, niveau, recherche, limite } = {}) => {
    exigerAdministration(user);
    const where = {};
    if (id_annee) where.id_annee = Number(id_annee);
    if (etat) where.etat = etat;
    if (nettoyerTexte(niveau)) where.niveau = nettoyerTexte(niveau);
    const mot = nettoyerTexte(recherche);
    const taille = Math.min(Math.max(Number(limite) || 100, 1), 500);
    const { rows, count } = await Inscription.findAndCountAll({
        where,
        include: [
            {
                model: Personne,
                as: "personne",
                ...(mot ? { where: { [Op.or]: [{ nom: { [Op.like]: `%${mot}%` } }, { prenom: { [Op.like]: `%${mot}%` } }, { cne: { [Op.like]: `%${mot}%` } }] } } : {}),
            },
        ],
        order: [["id_annee", "DESC"], ["niveau", "ASC"]],
        limit: taille,
    });
    return { data: rows.map((i) => serialiser(i, i.personne)), total: count };
};

/** Crée l'inscription d'une personne pour une année : le doublon est refusé avec son numéro (C5-4). */
export const creerInscription = async (user, idPersonne, { id_annee, niveau, date_entree } = {}) => {
    exigerAdministration(user);
    const motif = verifierInscription({ id_annee, niveau });
    if (motif) throw new ErreurMetier(motif);
    const personne = await Personne.findByPk(idPersonne);
    if (!personne) throw new ErreurMetier("Personne introuvable", 404);
    if (!(await AnneeUniversitaire.findByPk(Number(id_annee)))) throw new ErreurMetier("Année scolaire introuvable", 404);

    const existante = await Inscription.findOne({ where: { id_personne: Number(idPersonne), id_annee: Number(id_annee) } });
    if (existante) throw new ErreurMetier(`Une inscription existe déjà pour cette année (n° ${existante.id_inscription})`, 409, "INSCRIPTION_EXISTANTE");

    const inscription = await Inscription.create({
        id_personne: Number(idPersonne),
        id_annee: Number(id_annee),
        niveau: nettoyerTexte(niveau),
        date_entree: date_entree || null,
    });
    return serialiser(inscription, personne);
};

/** Avance l'état d'un cran, ou radie ; rien d'autre n'est accepté (C5-états). */
export const changerEtatInscription = async (user, id, { etat, date_sortie } = {}) => {
    exigerAdministration(user);
    const inscription = await inscriptionOuErreur(id);
    if (etat === inscription.etat) return serialiser(inscription);
    if (!transitionAutorisee(inscription.etat, etat)) {
        const suite = etatsSuivants(inscription.etat);
        throw new ErreurMetier(
            suite.length ? `Depuis « ${inscription.etat} », l'étape suivante est : ${suite.join(" ou ")}` : `Une inscription « ${inscription.etat} » est close`,
            409,
            "ETAT_INVALIDE"
        );
    }
    const valeurs = { etat };
    if (etat === "inscrite" && !inscription.date_entree) valeurs.date_entree = date_sortie || aujourdhui();
    if (etat === "radiee" || etat === "passante") valeurs.date_sortie = date_sortie || aujourdhui();
    await inscription.update(valeurs);
    return serialiser(inscription);
};

/** Réinscription : une nouvelle ligne pour l'année suivante, reliée à celle-ci (question 7). */
export const reinscrire = async (user, id, { id_annee, niveau } = {}) => {
    exigerAdministration(user);
    const precedente = await inscriptionOuErreur(id);
    if (!["confirmee", "inscrite", "passante"].includes(precedente.etat)) throw new ErreurMetier("L'inscription de l'année précédente doit être confirmée avant la réinscription", 409, "PRECEDENTE_NON_CONFIRMEE");
    if (!id_annee) throw new ErreurMetier("Année scolaire de la réinscription requise");
    const niveauVise = nettoyerTexte(niveau) || precedente.niveau;
    const deja = await Inscription.findOne({ where: { id_personne: precedente.id_personne, id_annee: Number(id_annee) } });
    if (deja) throw new ErreurMetier(`Une inscription existe déjà pour cette année (n° ${deja.id_inscription})`, 409, "INSCRIPTION_EXISTANTE");
    if (!(await AnneeUniversitaire.findByPk(Number(id_annee)))) throw new ErreurMetier("Année scolaire introuvable", 404);

    const inscription = await Inscription.create({
        id_personne: precedente.id_personne,
        id_annee: Number(id_annee),
        niveau: niveauVise,
        id_inscription_precedente: precedente.id_inscription,
    }).catch((erreur) => {
        if (erreur.name === "SequelizeUniqueConstraintError") throw new ErreurMetier("Cette inscription a déjà un successeur", 409, "REINSCRIPTION_EXISTANTE");
        throw erreur;
    });
    const personne = await Personne.findByPk(inscription.id_personne);
    return serialiser(inscription, personne);
};
