import { ContrainteDeclaree, Users, ValeurParametre, VersionParametres } from "../../../models/index.js";
import { lireNoms } from "../contraintes/cibles.js";
import { phraseDe } from "../contraintes/phrases.js";
import { ErreurMetier } from "../../planning/enseignements.js";
import { leCatalogue } from "./lecture.js";

/**
 * Historique des versions des réglages du moteur (ADM-02, R-3) : une liste allégée, sans les lignes,
 * pour un historique rapide ; le détail d'une version à la demande, avec le nom de chaque réglage et la
 * phrase (en français) de chaque contrainte ajoutée ou retirée. Rien n'écrit ici.
 */

const LIMITE = 100;
const AUTEUR = { model: Users, as: "auteur", attributes: ["id_user", "nom", "prenom"] };

const auteurDe = (v) => (v.auteur ? { id_user: v.auteur.id_user, nom: [v.auteur.prenom, v.auteur.nom].filter(Boolean).join(" ") } : null);

const compter = (lignes, garder = () => true) => {
    const n = new Map();
    for (const l of lignes.filter(garder)) n.set(l.id_version, (n.get(l.id_version) ?? 0) + 1);
    return n;
};

/** Les 100 dernières versions, de la plus récente à la plus ancienne, sans leurs lignes. */
export const listerVersionsAllegees = async () => {
    const versions = await VersionParametres.findAll({ include: [AUTEUR], order: [["id_version", "DESC"]], limit: LIMITE });
    const ids = versions.map((v) => v.id_version);
    if (!ids.length) return [];
    const [valeurs, contraintes, annulations] = await Promise.all([
        ValeurParametre.findAll({ where: { id_version: ids }, attributes: ["id_version"], raw: true }),
        ContrainteDeclaree.findAll({ where: { id_version: ids }, attributes: ["id_version", "gabarit", "retire_id"], raw: true }),
        VersionParametres.findAll({ where: { annule_version: ids }, attributes: ["id_version", "annule_version"], raw: true }),
    ]);
    const nbReglages = compter(valeurs);
    const nbAjouts = compter(contraintes, (c) => c.gabarit);
    const nbRetraits = compter(contraintes, (c) => c.retire_id);
    const annuleePar = new Map(annulations.map((a) => [a.annule_version, a.id_version]));
    return versions.map((v) => ({
        id_version: v.id_version,
        libelle: v.libelle,
        date_effet: v.date_effet,
        statut: v.statut,
        appliquee_le: v.appliquee_le,
        auteur: auteurDe(v),
        nb_reglages: nbReglages.get(v.id_version) ?? 0,
        nb_contraintes: nbAjouts.get(v.id_version) ?? 0,
        nb_retraits: nbRetraits.get(v.id_version) ?? 0,
        annule_version: v.annule_version,
        annulee_par: annuleePar.get(v.id_version) ?? null,
    }));
};

/** Le détail d'une version : ses réglages, ses contraintes ajoutées et retirées, avec leur phrase. */
export const detailVersion = async (id) => {
    const version = await VersionParametres.findByPk(id, { include: [AUTEUR, { model: ValeurParametre, as: "valeurs" }, { model: ContrainteDeclaree, as: "contraintes" }] });
    if (!version) throw new ErreurMetier("Version introuvable", 404, "VERSION_INTROUVABLE");
    const nomDe = new Map(leCatalogue().parametres.map((p) => [p.id, p.nom]));
    const ajouts = version.contraintes.filter((c) => c.gabarit);
    const retraitsIds = version.contraintes.filter((c) => c.retire_id).map((c) => c.retire_id);
    const retirees = retraitsIds.length ? await ContrainteDeclaree.findAll({ where: { id_contrainte: retraitsIds } }) : [];
    const noms = await lireNoms([...ajouts, ...retirees]);
    const annulation = await VersionParametres.findOne({ where: { annule_version: version.id_version }, attributes: ["id_version"] });
    return {
        id_version: version.id_version,
        libelle: version.libelle,
        date_effet: version.date_effet,
        statut: version.statut,
        appliquee_le: version.appliquee_le,
        auteur: auteurDe(version),
        annule_version: version.annule_version,
        annulee_par: annulation?.id_version ?? null,
        reglages: version.valeurs.map((l) => ({ cle: l.cle, nom: nomDe.get(l.cle) ?? l.cle, portee: l.portee, id_portee: l.id_portee || null, valeur: l.valeur, force: l.force, poids: l.poids, retiree: l.retiree })),
        contraintes: ajouts.map((c) => ({ id_contrainte: c.id_contrainte, gabarit: c.gabarit, cibles: c.cibles, parametres: c.parametres, nature: c.nature, insistance: c.insistance, phrase: phraseDe(c, noms) })),
        retraits: retirees.map((c) => ({ id_contrainte: c.id_contrainte, gabarit: c.gabarit, cibles: c.cibles, parametres: c.parametres, nature: c.nature, insistance: c.insistance, phrase: phraseDe(c, noms) })),
    };
};
