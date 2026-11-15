// Produit le jeu supérieur simplifié et son témoin, sans affecter les entrées mesurées.
import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

/** Sérialise les données de manière stable, avec une fin de ligne unique. */
export const serialiser = (objet) => `${JSON.stringify(objet, null, 2)}\n`;
/** Identifie exactement les octets d'une entrée. */
export const empreinte = (texte) => createHash('sha256').update(texte).digest('hex');

/** Construit des groupes indépendants avec deux enseignants propres à chaque groupe. */
export function generer(configuration) {
    const { groupes, etudiantsParGroupe, seancesParGroupe, enseignantsParGroupe,
        jours, debutsMinutes, maxMinutesJour, dureeSecondes } = configuration;
    if (enseignantsParGroupe !== 2 || jours !== 5 || debutsMinutes.length !== 8
        || seancesParGroupe !== 12 || !Number.isInteger(groupes) || groupes < 1) {
        throw new Error('Configuration de construction non prise en charge');
    }
    const creneaux = [];
    for (let jour = 1; jour <= jours; jour++) {
        for (let rang = 1; rang <= 8; rang++) {
            const debut = debutsMinutes[rang - 1];
            const suivant = rang < 8 && debutsMinutes[rang] === debut + 60;
            creneaux.push({ id: (jour - 1) * 8 + rang, jour, debut, fin: debut + 60,
                rang, regime: 'initiale', suivantId: suivant ? (jour - 1) * 8 + rang + 1 : null,
                finAvecSuivant: suivant ? debut + 120 : null });
        }
    }
    const salles = Array.from({ length: groupes }, (_, n) => ({ id: n + 1,
        nom: `Salle ${n + 1}`, capacite: etudiantsParGroupe, type: 'cours',
        equipements: [], campusId: 1 }));
    const lecons = [], ressources = [], temoin = [];
    for (let g = 0; g < groupes; g++) {
        const groupe = g + 1;
        ressources.push({ nature: 'GROUPE', id: groupe },
            { nature: 'ENSEIGNANT', id: 2 * g + 1 }, { nature: 'ENSEIGNANT', id: 2 * g + 2 });
        for (let s = 0; s < seancesParGroupe; s++) {
            const id = `g${groupe}-s${s + 1}`;
            lecons.push({ id, enseignementId: g * 6 + Math.floor(s / 2) + 1,
                coursId: Math.floor(s / 2) + 1, type: 'CM', regime: 'initiale', longueur: 2,
                enseignants: [2 * g + (s % 2) + 1], groupes: [groupe],
                groupesDirects: [groupe], feuilles: [groupe], effectif: etudiantsParGroupe,
                typeSalleRequis: 'cours', equipementsRequis: [], distanciel: false, epinglee: false });
            const bloc = (g + s) % 20;
            const jour = Math.floor(bloc / 4);
            temoin.push({ id, creneauId: jour * 8 + (bloc % 4) * 2 + 1, salleId: groupe });
        }
    }
    const probleme = { dureeSecondes, creneaux, salles, voeux: [], ressources,
        parametres: { maxMinutesJourGroupe: maxMinutesJour,
            maxMinutesJourEnseignant: maxMinutesJour, samediApresMidi: false,
            trajetDefautMinutes: 30, trajets: {} }, lecons };
    const manifeste = { version: 1, designation: configuration.designation,
        etudiants: groupes * etudiantsParGroupe, groupes, enseignants: groupes * 2,
        lecons: lecons.length, heuresParGroupe: seancesParGroupe * 2,
        creneaux: creneaux.length, salles: salles.length,
        limites: ['Groupes indépendants', 'Deux enseignants propres à chaque groupe',
            'Disponibilité complète', 'Un seul site', 'Aucun groupe transversal'],
        problemeSha256: empreinte(serialiser(probleme)),
        configurationSha256: empreinte(serialiser(configuration)) };
    return { probleme, temoin, manifeste };
}

/** Écrit les artefacts de référence ou vérifie qu'ils correspondent au générateur. */
async function executer() {
    const base = new URL('./', import.meta.url);
    const configuration = JSON.parse(await readFile(new URL('configurations/superieur.json', base), 'utf8'));
    const donnees = generer(configuration);
    for (const [nom, objet] of Object.entries(donnees)) {
        const chemin = new URL(`jeux/superieur-${nom}.json`, base);
        const texte = serialiser(objet);
        if (process.argv.includes('--verifier')) {
            if (await readFile(chemin, 'utf8') !== texte) throw new Error(`Jeu périmé : ${nom}`);
        } else await writeFile(chemin, texte);
    }
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    executer().catch((erreur) => { console.error(erreur.message); process.exitCode = 1; });
}
