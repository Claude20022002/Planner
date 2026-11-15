import { Op } from "sequelize";
import { Cours, Creneau, Enseignant, Filiere, Groupe, Salle, Users } from "../../../models/index.js";
import { ligneesDe } from "../../planning/groupes.js";
import { cleDeNom } from "./phrases.js";

/**
 * Cibles des contraintes déclarées, lues dans la base de l'école courante (MOT-13) : leur existence
 * (une cible orpheline est refusée, contrairement à une valeur de MP-1, R-8), leurs noms pour les
 * phrases, et le contexte du contrôle de place (filière d'une matière, sous-groupes d'un groupe).
 */

// Les matières citées par une contrainte : ses cibles « matiere » et ses deux listes
const matieresDe = (c) => [...(c.cibles ?? []).filter((x) => x.type === "matiere").map((x) => x.id), ...(c.parametres?.matieres_a ?? []), ...(c.parametres?.matieres_b ?? [])];

const idsParType = (contraintes) => {
    const ids = { filiere: new Set(), groupe: new Set(), matiere: new Set(), enseignant: new Set(), salle: new Set(), rythme: new Set() };
    for (const c of contraintes) {
        for (const x of c.cibles ?? []) if (ids[x.type] && x.type !== "matiere") ids[x.type].add(x.id);
        for (const m of matieresDe(c)) ids.matiere.add(m);
    }
    return Object.fromEntries(Object.entries(ids).map(([t, s]) => [t, [...s]]));
};

/** Lit les noms des cibles et des matières citées. @returns {Map<string,string>} par cleDeNom */
export const lireNoms = async (contraintes, { transaction } = {}) => {
    const ids = idsParType(contraintes);
    const vide = Promise.resolve([]);
    const [filieres, groupes, cours, enseignants, salles] = await Promise.all([
        ids.filiere.length ? Filiere.findAll({ where: { id_filiere: ids.filiere }, attributes: ["id_filiere", "nom_filiere"], transaction }) : vide,
        ids.groupe.length ? Groupe.findAll({ where: { id_groupe: ids.groupe }, attributes: ["id_groupe", "nom_groupe"], transaction }) : vide,
        ids.matiere.length ? Cours.findAll({ where: { id_cours: ids.matiere }, attributes: ["id_cours", "nom_cours"], transaction }) : vide,
        ids.enseignant.length ? Enseignant.findAll({ where: { id_user: ids.enseignant }, attributes: ["id_user"], include: [{ model: Users, as: "user", attributes: ["nom", "prenom"] }], transaction }) : vide,
        ids.salle.length ? Salle.findAll({ where: { id_salle: ids.salle }, attributes: ["id_salle", "nom_salle"], transaction }) : vide,
    ]);
    return new Map([
        ...filieres.map((f) => [cleDeNom("filiere", f.id_filiere), f.nom_filiere]),
        ...groupes.map((g) => [cleDeNom("groupe", g.id_groupe), g.nom_groupe]),
        ...cours.map((c) => [cleDeNom("matiere", c.id_cours), c.nom_cours]),
        ...enseignants.map((e) => [cleDeNom("enseignant", e.id_user), `${e.user?.prenom ?? ""} ${e.user?.nom ?? ""}`.trim()]),
        ...salles.map((s) => [cleDeNom("salle", s.id_salle), s.nom_salle]),
        ...ids.rythme.map((r) => [cleDeNom("rythme", r), r]),
    ]);
};

/**
 * Cibles et matières qui n'existent pas dans cette école.
 * @param {object[]} contraintes normalisées
 * @returns {{ index: number, champ: string, code: string, message: string }[]}
 */
export const ciblesInexistantes = async (contraintes, { transaction } = {}) => {
    const noms = await lireNoms(contraintes, { transaction });
    const rythmes = new Set((await Creneau.findAll({ attributes: ["regime"], group: ["regime"], transaction })).map((c) => c.regime));
    const refus = [];
    contraintes.forEach((c, index) => {
        for (const x of c.cibles ?? []) {
            if (x.type === "ecole") continue;
            const existe = x.type === "rythme" ? rythmes.has(x.id) : noms.has(cleDeNom(x.type, x.id));
            if (!existe) refus.push({ index, champ: "cibles", code: "cible_inexistante", message: `La cible « ${x.type} » n° ${x.id} n'existe pas dans cette école. Choisissez une cible existante.` });
        }
        for (const champ of ["matieres_a", "matieres_b"]) {
            for (const m of c.parametres?.[champ] ?? []) {
                if (!noms.has(cleDeNom("matiere", m))) refus.push({ index, champ, code: "cible_inexistante", message: `La matière n° ${m} n'existe pas dans cette école.` });
            }
        }
    });
    return refus;
};

/**
 * Contexte du contrôle de place pour un problème construit (probleme.js) : filière de chaque matière,
 * groupes les plus fins sous chaque groupe visé, et noms (groupes fins, matières, cibles).
 */
export const contexteDuControle = async (lecons, contraintes, { transaction } = {}) => {
    const coursIds = [...new Set(lecons.map((l) => l.coursId).filter(Boolean))];
    const feuillesIds = [...new Set(lecons.flatMap((l) => l.feuilles))];
    const groupesVises = [...new Set(contraintes.flatMap((c) => (c.cibles ?? []).filter((x) => x.type === "groupe").map((x) => x.id)))];
    const [cours, feuilles, lignees, noms] = await Promise.all([
        coursIds.length ? Cours.findAll({ where: { id_cours: coursIds }, attributes: ["id_cours", "id_filiere", "nom_cours"], transaction }) : [],
        feuillesIds.length ? Groupe.findAll({ where: { id_groupe: { [Op.in]: feuillesIds } }, attributes: ["id_groupe", "nom_groupe"], transaction }) : [],
        Promise.all(groupesVises.map(async (g) => [g, new Set((await ligneesDe(g, transaction)).map((l) => l.feuille))])),
        lireNoms(contraintes, { transaction }),
    ]);
    for (const c of cours) noms.set(cleDeNom("matiere", c.id_cours), c.nom_cours);
    for (const g of feuilles) noms.set(cleDeNom("groupe", g.id_groupe), g.nom_groupe);
    return { filiereDuCours: new Map(cours.map((c) => [c.id_cours, c.id_filiere])), feuillesDuGroupe: new Map(lignees), noms };
};
