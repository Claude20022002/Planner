// Vérifie les réponses et le témoin synthétique sans prétendre remplacer l'évaluateur MOT-04.
import { verifierOccupation } from './occupation-campus.mjs';

/** Vérifie les bornes actuelles de l'API et l'absence d'affectations fournies au solveur. */
export function verifierEntree(probleme) {
    for (const [nom, maximum] of [['lecons', 5000], ['creneaux', 500], ['salles', 2000], ['voeux', 200000]]) {
        if (!Array.isArray(probleme[nom]) || probleme[nom].length > maximum) throw new Error(`Taille invalide : ${nom}`);
    }
    if (!probleme.lecons.length || Buffer.byteLength(JSON.stringify(probleme)) > 5242880) throw new Error('Entrée vide ou trop volumineuse');
    for (const nom of ['lecons', 'creneaux', 'salles']) {
        if (new Set(probleme[nom].map((x) => x.id)).size !== probleme[nom].length) throw new Error(`Identifiants dupliqués : ${nom}`);
    }
    if (probleme.lecons.some((l) => l.epinglee || l.creneau || l.salle || ![1, 2].includes(l.longueur))) {
        throw new Error('Entrée affectée, épinglée ou longueur invalide');
    }
}

/** Exige une réponse complète, des affectations connues et un score initialisé cohérent. */
export function verifierReponse(probleme, reponse, { finale = false } = {}) {
    const erreurs = [];
    if (reponse.statut === 'ECHEC' || reponse.erreur) erreurs.push('échec moteur');
    if (finale && reponse.statut !== 'NOT_SOLVING') erreurs.push('calcul non terminé');
    const score = /^(?:0init\/)?(-?\d+)hard\/(?:(-?\d+)medium\/)?(-?\d+)soft$/.exec(reponse.score ?? '');
    if (!score || !Number.isInteger(reponse.dur) || Number(score[1]) !== reponse.dur
        || Number(score[3]) !== reponse.souple
        || (score[2] !== undefined && Number(score[2]) !== reponse.moyen)) erreurs.push('score absent, non initialisé ou incohérent');
    const attendues = new Map(probleme.lecons.map((l) => [l.id, l]));
    const creneaux = new Set(probleme.creneaux.map((c) => c.id));
    const salles = new Set(probleme.salles.map((s) => s.id));
    const vus = new Set();
    const affectations = new Map((reponse.lecons ?? []).map((r) => [r.id, r]));
    for (const l of reponse.lecons ?? []) {
        if (!attendues.has(l.id) || vus.has(l.id)) erreurs.push('identifiant inconnu ou dupliqué');
        vus.add(l.id);
        if (!creneaux.has(l.creneauId) || (!attendues.get(l.id)?.distanciel && !salles.has(l.salleId))
            || (l.salleId != null && !salles.has(l.salleId))) erreurs.push('affectation manquante ou inconnue');
    }
    if (vus.size !== attendues.size || [...attendues.keys()].some((id) => !vus.has(id))) erreurs.push('leçon absente');
    if (finale && !Array.isArray(reponse.violations)) erreurs.push('analyse finale absente');
    const faisable = erreurs.length === 0 && reponse.dur === 0
        && (reponse.moyen === undefined || reponse.moyen === 0);
    return { valide: erreurs.length === 0, faisable, erreurs: [...new Set(erreurs)],
        nonAffectees: probleme.lecons.filter((l) => {
            const r = affectations.get(l.id);
            return !r || !creneaux.has(r.creneauId) || (!l.distanciel && !salles.has(r.salleId));
        }).length };
}

/** Contrôle le témoin du jeu : collisions, capacités, grilles, salles et charges quotidiennes. */
export function verifierTemoin(probleme, temoin) {
    const resultat = verifierReponse(probleme, { statut: 'NOT_SOLVING', score: '0hard/0soft',
        dur: 0, souple: 0, lecons: temoin, violations: [] }, { finale: true });
    if (!resultat.valide) throw new Error(resultat.erreurs.join(', '));
    verifierOccupation(probleme, temoin);
    return true;
}

/** Résume sans supprimer les échecs ni mélanger les profils, versions ou entrées. */
export function resumer(passages) {
    const groupes = new Map();
    for (const p of passages.filter((p) => !p.chauffe)) {
        const cle = JSON.stringify([p.revision, p.profil, p.problemeSha256]);
        if (!groupes.has(cle)) groupes.set(cle, []);
        groupes.get(cle).push(p);
    }
    return [...groupes.values()].map((liste) => {
        const temps = liste.map((p) => p.dureeMs).filter(Number.isFinite).sort((a, b) => a - b);
        return { revision: liste[0].revision, profil: liste[0].profil, problemeSha256: liste[0].problemeSha256,
            passages: liste.length, echecs: liste.filter((p) => !p.controle?.faisable || p.erreur).length,
            dureeMinMs: temps[0] ?? null, dureeMedianeMs: temps.length ? temps[Math.floor(temps.length / 2)] : null,
            dureeMaxMs: temps.at(-1) ?? null,
            conformeSolveur: liste.length === 3 && liste.every((p) => !p.erreur && p.controle?.faisable && p.dureeMs < 600000) };
    });
}
