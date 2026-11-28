/**
 * Feuille d'un quiz sans les réponses (EP-18, M-2a).
 * L'enseignant l'imprime pour un élève sans appareil. La correction ne sort pas.
 */

const textes = (liste) => (Array.isArray(liste) ? liste : []).map((e) => (typeof e === "string" ? e : e?.texte)).filter((t) => typeof t === "string" && t !== "");

/**
 * Ce que la feuille peut montrer d'une question. Pas d'explication, pas de bonne réponse,
 * pas de valeur attendue. L'ordre et les paires ne suivent pas la solution enregistrée.
 * @param {object} question
 * @returns {object}
 */
export const contenuFeuille = (question) => {
    const d = question?.donnees ?? {};
    const base = { enonce: question?.enonce ?? "", points: question?.points ?? 0 };
    switch (question?.type) {
        case "choix_unique":
            return { ...base, choix: textes(d.options) };
        case "choix_multiple": {
            const feuille = { ...base, choix: textes(d.options) };
            if (d.annoncer_nombre !== false) feuille.nombre = (Array.isArray(d.bonnes) ? d.bonnes : []).length;
            return feuille;
        }
        case "vrai_faux":
            return { ...base, choix: ["vrai", "faux"] };
        case "reponse_courte":
        case "reponse_libre":
            return { ...base, ligne: true };
        case "numerique":
            return { ...base, ligne: true, unite: d.unite || null };
        case "texte_trous":
            return {
                ...base,
                texte: String(d.texte ?? "").replace(/\{\{\d{1,2}\}\}/g, "________"),
                listes: (Array.isArray(d.trous) ? d.trous : [])
                    .filter((t) => Array.isArray(t?.options) && t.options.length)
                    .map((t) => ({ id: String(t.id), options: t.options.map(String) })),
            };
        case "association": {
            const droites = [...(d.paires ?? []).map((p) => p?.droite), ...(d.distracteurs ?? [])].filter((t) => typeof t === "string" && t !== "");
            return { ...base, gauches: (d.paires ?? []).map((p) => p?.gauche).filter(Boolean), droites: [...droites].reverse() };
        }
        case "ordre":
            return { ...base, elements: [...textes(d.elements)].reverse() };
        case "zone_image":
            return { ...base, image: true };
        default:
            return { ...base, ligne: true };
    }
};
