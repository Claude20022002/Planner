/**
 * Règles pures de protection PLA-06 : limites hôte, mémoire disponible et photos des services
 * existants. Une entrée illisible ou incomplète interdit la mesure ; aucune valeur réelle en Git.
 */
export const PROJET = "planner-mesure-pla06";
export const MIO = 1024 ** 2;

/** Lit les compteurs Linux et refuse un champ absent plutôt que de conclure zéro. */
export function champsLinux(texte, separateur = /\s+/) {
    return Object.fromEntries(texte.trim().split("\n").map((ligne) => {
        const [cle, valeur] = ligne.trim().split(separateur);
        return [cle.replace(/:$/, ""), Number(valeur)];
    }));
}

/** Contrôle les limites du groupe hôte, imposées par le lanceur systemd. */
export function verifierGroupe({ memoire, echange, cpu }) {
    const [quota, periode] = cpu.trim().split(/\s+/).map(Number);
    if (!(Number(memoire) > 0 && Number(memoire) <= 512 * MIO)) throw new Error("groupe hôte : limite mémoire absente ou supérieure à 512 Mio");
    if (String(echange).trim() !== "0") throw new Error("groupe hôte : échange non interdit");
    if (!(quota > 0 && periode > 0 && quota / periode <= 0.5)) throw new Error("groupe hôte : limite CPU absente ou supérieure à 0,5 processeur");
}

/** Une mémoire disponible sous 1 Gio ou des pages échangées interdisent la poursuite. */
export function verifierMemoire(meminfo, vmstat, pagesInitiales) {
    const m = champsLinux(meminfo);
    const v = champsLinux(vmstat);
    if (!Number.isFinite(m.MemAvailable) || !Number.isFinite(v.pswpin) || !Number.isFinite(v.pswpout)) throw new Error("relevé mémoire incomplet");
    if (m.MemAvailable < 1024 * 1024) throw new Error("mémoire disponible sous 1 Gio");
    const pages = v.pswpin + v.pswpout;
    if (pagesInitiales !== undefined && pages > pagesInitiales) throw new Error("mémoire d'échange active");
    return { disponible_mio: m.MemAvailable / 1024, pages };
}

/** Compare exactement les services protégés : identité, démarrage, état, santé et OOM. */
export function verifierPhotos(avant, apres) {
    if (!Array.isArray(avant) || !avant.length || !Array.isArray(apres)) throw new Error("photo des services protégés absente");
    const champs = ["id", "debut", "etat", "redemarrages", "oom", "sante"];
    if (avant.length !== apres.length || new Set(avant.map((c) => c.id)).size !== avant.length) throw new Error("liste des services protégés différente");
    for (const a of avant) {
        const b = apres.find((c) => c.id === a.id);
        if (champs.some((cle) => a[cle] === undefined || b?.[cle] !== a[cle])) throw new Error("un service protégé a changé");
        if (a.etat !== "running" || a.oom || !["healthy", "absente"].includes(a.sante)) throw new Error("un service protégé n'est pas prêt");
    }
}

/** Un bilan incomplet, arrêté ou privé de contrôle manuel ne vaut jamais résultat valide. */
export function raisonsInvalidite(bilan, charge, releves) {
    const raisons = [...(bilan.raisons ?? [])];
    if (bilan.essai) raisons.push("essai technique réduit : aucune conclusion sur 200 écoles");
    const sonde = bilan.sonde;
    if (!sonde?.reference_ok || sonde.reference?.echantillons !== 40 || !(sonde.reference?.duree_ms >= 600000) || !(sonde.reference?.mediane_ms > 0) || !sonde.surveillance_terminee || sonde.echec || !(sonde.mesures >= 2)) raisons.push("sonde n8n absente, incomplète ou en échec");
    if (!bilan.terminee) raisons.push("exécution incomplète");
    if (!bilan.photos_ok) raisons.push("photos avant/après non confirmées");
    if (!bilan.temoin_apres) raisons.push("contrôle manuel n8n après la série attendu");
    if (bilan.code_charge !== 0 || !charge?.valide) raisons.push("charge absente ou invalide");
    if (!releves?.valide || !(releves.releves > 0) || releves.erreurs !== 0) raisons.push("relevés absents, incomplets ou invalides");
    return raisons;
}

/** Vérifie le Compose résolu avant toute création, sans accepter les variables hôte dangereuses. */
export function verifierCompose(c) {
    const s = c?.services;
    if (c?.name !== PROJET || !s || Object.keys(s).sort().join() !== "banc,installer,mysql") throw new Error("projet Compose inattendu");
    for (const [nom, v] of Object.entries(s)) {
        const max = nom === "mysql" ? 2 * 1024 ** 3 : 1024 ** 3;
        if (!(Number(v.mem_limit) > 0 && Number(v.mem_limit) <= max && Number(v.memswap_limit) === Number(v.mem_limit) && Number(v.cpus) > 0 && Number(v.cpus) <= 1)) throw new Error("limites Compose invalides : " + nom);
        if (v.labels?.["traefik.enable"] !== "false" || v.network_mode || Object.keys(v.networks ?? {}).join() !== "default") throw new Error("isolation Compose invalide : " + nom);
        if (nom === "banc") {
            if (v.ports?.length !== 1 || v.ports[0].host_ip !== "127.0.0.1" || String(v.ports[0].published) !== "5099" || v.ports[0].target !== 5099) throw new Error("port banc non local");
        } else if (v.ports?.length) throw new Error("port publié hors banc");
    }
    if (c.networks?.default?.external || Object.keys(c.networks ?? {}).join() !== "default" || !c.networks.default.name.startsWith(PROJET + "_")) throw new Error("réseau extérieur interdit");
    if (Object.values(c.volumes ?? {}).some((v) => v.external || !v.name?.startsWith(PROJET + "_"))) throw new Error("volume extérieur interdit");
}
