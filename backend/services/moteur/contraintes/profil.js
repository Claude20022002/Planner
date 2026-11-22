/**
 * Liste « Déjà pris en compte » (MOT-13, § 4.3) : les règles du profil résolu que le calcul tient
 * vraiment, chacune avec son état pour l'école. Une règle que le solveur n'applique pas n'est pas
 * montrée (question 14 : ce qui est montré est tenu) ; une règle souple ne l'est que si le solveur
 * lit son poids (`regle_solveur`, MOT-13b). « Sans effet » se lit sur les conditions
 * active_si (réponse 16) : un seul campus, et la règle de trajet ne fait rien. Fonction pure.
 */

// Ce que l'école peut changer : ce qui est modifiable à son niveau ou en dessous (MP-1, ecriture.js)
const MODIFIABLES_PAR_L_ECOLE = ["etablissement", "responsable", "personne"];

const QUANTITE = { ">=": "au moins", "<=": "au plus", "=": "exactement", "!=": "autre chose que" };

const conditionManquee = (d, valeurs, nomDe) => {
    const actuelle = valeurs.get(d.vers);
    const valeurLisible = typeof d.val === "boolean" ? (d.val ? "oui" : "non") : d.val;
    return `« ${nomDe(d.vers)} » vaut ${actuelle ?? "rien"} ; il faut ${QUANTITE[d.op] ?? d.op} ${valeurLisible}.`;
};

const remplie = (d, valeurs) => {
    const a = valeurs.get(d.vers);
    if (d.op === ">=") return a !== null && a !== undefined && a >= d.val;
    if (d.op === "<=") return a !== null && a !== undefined && a <= d.val;
    if (d.op === "=") return a === d.val;
    if (d.op === "!=") return (a ?? null) !== d.val;
    return [a].flat().includes(d.val);
};

/**
 * @param {object} o
 * @param {object[]} o.parametres le catalogue
 * @param {object[]} o.dependances
 * @param {Map} o.resultats résultats de resoudreTout (valeur, force, poids, origine par paramètre)
 * @param {Map} o.valeurs valeurs résolues, faits compris (nombre de campus…)
 * @returns {object[]} une entrée par règle tenue par le calcul
 */
export const listeDuProfil = ({ parametres, dependances, resultats, valeurs }) => {
    const parId = new Map(parametres.map((p) => [p.id, p]));
    const nomDe = (id) => parId.get(id)?.nom ?? id;
    return parametres
        .filter((p) => p.role === "regle" && p.etat === "solveur" && (p.force !== "souple" || p.regle_solveur))
        .map((p) => {
            const r = resultats.get(p.id);
            const manquees = dependances.filter((d) => d.type === "active_si" && d.de === p.id && !remplie(d, valeurs));
            let etat = "active";
            let raison = null;
            if (r.valeur === false) etat = "coupee";
            else if (r.valeur === null || r.valeur === undefined) [etat, raison] = ["sans_effet", "Aucune valeur n'est renseignée."];
            else if (manquees.length) [etat, raison] = ["sans_effet", manquees.map((d) => conditionManquee(d, valeurs, nomDe)).join(" ")];
            return {
                id: p.id,
                nom: p.nom,
                description: p.description,
                famille: p.categorie,
                force: r.force,
                poids: r.poids,
                poids_de_depart: p.force === "souple" ? p.poids : null,
                origine: r.origine,
                verrouillee: !MODIFIABLES_PAR_L_ECOLE.includes(p.modifiable),
                etat,
                raison,
            };
        });
};
