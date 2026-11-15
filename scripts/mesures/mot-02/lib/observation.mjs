// Mesure une demande du solveur avec une garde externe et des sondes sans recouvrement.
import { performance } from 'node:perf_hooks';
import { verifierReponse } from './validation.mjs';
const attendre = (ms) => new Promise((fin) => setTimeout(fin, ms));
/** Appelle l'API locale dédiée sans suivre de redirection ni afficher son jeton. */
export async function appeler(base, jeton, chemin, { methode = 'GET', corps, delaiMs = 5000 } = {}) {
    const reponse = await fetch(`${base}${chemin}`, { method: methode, redirect: 'error',
        signal: AbortSignal.timeout(delaiMs), headers: { 'Content-Type': 'application/json', 'X-Solver-Token': jeton },
        body: corps === undefined ? undefined : JSON.stringify(corps) });
    const donnees = await reponse.json().catch(() => ({}));
    if (!reponse.ok) throw new Error(`HTTP ${reponse.status} : ${donnees.erreur ?? 'réponse refusée'}`);
    return donnees;
}
/** Attend uniquement la santé de l'instance nouvellement créée. */
export async function attendreSante(base, jeton, dureeMs = 90000) {
    const debut = performance.now();
    while (performance.now() - debut < dureeMs) {
        try { if ((await appeler(base, jeton, '/health', { delaiMs: 2000 })).status === 'UP') return performance.now() - debut; }
        catch { /* Le démarrage Java peut encore être en cours. */ }
        await attendre(500);
    }
    throw new Error('Démarrage du conteneur trop long');
}
/** Conserve chaque réponse, les latences et les compteurs ; ne transforme pas un échec en succès. */
export async function observer(probleme, api, sonde, { intervalleMs = 1000, gardeMs = 660000,
    maintenant = () => performance.now(), pause = attendre } = {}) {
    const resultat = { observations: [], premiereFaisableObserveeMs: null,
        dureeMs: null, erreur: null, controle: null };
    const debut = maintenant();
    let id;
    try {
        const lancement = await api('/timetables', { methode: 'POST', corps: probleme });
        if (typeof lancement.id !== 'string' || !lancement.id) throw new Error('Identifiant de calcul absent');
        id = lancement.id;
        for (;;) {
            const instant = maintenant() - debut;
            if (instant >= gardeMs) throw new Error('Garde externe dépassée');
            const [reponse, compteurs] = await Promise.all([api(`/timetables/${encodeURIComponent(id)}`), sonde()]);
            const recu = maintenant() - debut;
            const finale = reponse.statut === 'NOT_SOLVING';
            const controle = verifierReponse(probleme, reponse, { finale });
            resultat.observations.push({ instantMs: instant, recuMs: recu,
                latenceMs: recu - instant, ...compteurs, reponse });
            if (controle.faisable && resultat.premiereFaisableObserveeMs === null) resultat.premiereFaisableObserveeMs = recu;
            if (reponse.statut === 'ECHEC' || reponse.erreur) throw new Error('Échec moteur');
            if (finale) {
                resultat.dureeMs = recu;
                resultat.controle = controle;
                resultat.tempsServeurSecondes = reponse.secondes ?? null;
                if (!controle.valide) throw new Error(controle.erreurs.join(', '));
                if (recu >= gardeMs) throw new Error('Garde externe dépassée');
                break;
            }
            await pause(Math.max(0, intervalleMs - (maintenant() - debut - instant)));
        }
    } catch (erreur) {
        resultat.erreur = erreur.message;
        resultat.dureeMs ??= maintenant() - debut;
        if (id) await api(`/timetables/${encodeURIComponent(id)}`, { methode: 'DELETE' }).catch(() => {});
    }
    resultat.dureeMs ??= maintenant() - debut;
    resultat.dureeTotaleAvecArretMs = maintenant() - debut;
    const memoires = resultat.observations.map((p) => p.memoireOctets).filter(Number.isFinite);
    const pics = resultat.observations.map((p) => p.picCgroupOctets).filter(Number.isFinite);
    resultat.memoireMaxEchantillonneeOctets = memoires.length ? Math.max(...memoires) : null;
    resultat.picCgroupOctets = pics.length ? Math.max(...pics) : null;
    resultat.sondesMemoireManquantes = resultat.observations.filter((p) => p.memoireOctets === null).length;
    return resultat;
}

/** Maintient une tâche surveillée en vie même si ses attentes ne référencent pas la boucle Node. */
export async function garderProcessus(tache) {
    const garde = setInterval(() => {}, 1000);
    try { return await tache(); }
    finally { clearInterval(garde); }
}
