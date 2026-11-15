/**
 * Sonde de santé n8n PLA-06 : lecture seule, URL locale hors Git, échec fermé.
 * Référence sur 40 requêtes espacées de 15 s pendant 10 min ; comparaison sur 4 mesures.
 */
export const PERIODE_SONDE = 15_000;
export const DUREE_REFERENCE = 600_000;
export const DELAI_SONDE = 5000;

/** Valide une URL locale de santé, sans identifiant ni redirection implicite. */
export function verifierUrlSonde(texte) {
    let url;
    try { url = new URL(texte); } catch { throw new Error("URL locale de santé invalide"); }
    if (!["http:", "https:"].includes(url.protocol) || !["localhost", "127.0.0.1", "[::1]"].includes(url.hostname) || url.username || url.password || url.hash) throw new Error("la sonde exige une URL de santé sur la boucle locale, sans identifiant ni fragment");
    return url.href;
}

/** Médiane arithmétique des valeurs centrales ; toute mesure absente ou nulle est refusée. */
export function medianeSonde(valeurs) {
    if (!valeurs.length || valeurs.some((v) => !Number.isFinite(v) || v <= 0)) throw new Error("mesures de sonde incomplètes ou invalides");
    const triees = [...valeurs].sort((a, b) => a - b);
    const milieu = Math.floor(triees.length / 2);
    return triees.length % 2 ? triees[milieu] : (triees[milieu - 1] + triees[milieu]) / 2;
}

/** Mesure GET de santé : ne crée ni workflow ni exécution n8n, ne suit aucune redirection. */
export async function mesurerSonde(url, { requete = fetch, maintenant = () => performance.now() } = {}) {
    const adresse = verifierUrlSonde(url);
    const debut = maintenant();
    try {
        const reponse = await requete(adresse, { method: "GET", redirect: "manual", signal: AbortSignal.timeout(DELAI_SONDE) });
        if (reponse.body) await reponse.body.cancel();
        if (!(reponse.status >= 200 && reponse.status < 300)) throw new Error("statut");
        const duree_ms = maintenant() - debut;
        if (!(duree_ms > 0 && Number.isFinite(duree_ms))) throw new Error("durée");
        return { t: new Date().toISOString(), statut: reponse.status, duree_ms };
    } catch { throw new Error("sonde n8n en échec : réponse non 2xx, réseau ou délai de 5 s"); }
}

/** Établit une référence complète ; la garde mémoire reste active pendant ces dix minutes. */
export async function constituerReference({ mesurer, attendre, verifier, noter, maintenant = () => performance.now() }) {
    const debut = maintenant();
    const durees = [];
    for (let i = 0; i < 40; i++) {
        await attendre(Math.max(0, debut + i * PERIODE_SONDE - maintenant()));
        verifier();
        const mesure = await mesurer();
        noter({ phase: "reference", ...mesure });
        durees.push(mesure.duree_ms);
    }
    await attendre(Math.max(0, debut + DUREE_REFERENCE - maintenant()));
    verifier();
    return { mediane_ms: medianeSonde(durees), echantillons: durees.length, duree_ms: maintenant() - debut };
}

/** Compare la fenêtre des quatre dernières mesures au double de la référence. */
export function comparerSonde(reference, fenetre) {
    if (!(reference?.mediane_ms > 0) || reference.echantillons !== 40 || reference.duree_ms < DUREE_REFERENCE) throw new Error("référence de sonde incomplète");
    if (fenetre.length < 4) return { echantillons: fenetre.length };
    const mediane_ms = medianeSonde(fenetre.slice(-4).map((m) => m.duree_ms));
    if (mediane_ms >= 2 * reference.mediane_ms) throw new Error("sonde n8n : médiane sur une minute au double de la référence");
    return { echantillons: 4, mediane_ms, reference_ms: reference.mediane_ms };
}
