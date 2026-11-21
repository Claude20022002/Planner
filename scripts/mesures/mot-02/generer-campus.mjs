// Construit les deux semaines fictives du supérieur et leur affectation témoin séparée.
import { readFile, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { grilleHoraire, empreinte, serialiser } from './generer-superieur.mjs';
import { verifierEntree, verifierTemoin } from './lib/validation.mjs';

export const tailles = [480, 960];
const heures = [480, 540, 600, 660, 780, 840, 900, 960];
const familles = ['amphi', 'td', 'td', 'labo', 'labo'];

/** Génère une semaine par blocs de quatre promotions partageant deux campus. */
export function genererCampus(etudiants) {
    if (!tailles.includes(etudiants)) throw new Error('Taille de campus inconnue');
    const promotions = etudiants / 120;
    const creneaux = grilleHoraire(5, heures);
    const salles = [], lecons = [], ressources = [], voeux = [], temoin = [], vacataires = [];
    const salleId = (bloc, site, indice) => 1 + bloc * 10 + site * 5 + indice;
    for (let bloc = 0; bloc < promotions / 4; bloc++) {
        for (let site = 0; site < 2; site++) {
            familles.forEach((type, indice) => {
                const id = salleId(bloc, site, indice);
                salles.push({ id, nom: 'Salle ' + id, campusId: site + 1, type,
                    capacite: [120, 60, 60, 30, 30][indice],
                    equipements: type === 'labo' ? ['atelier-' + site] : [] });
            });
        }
    }
    for (let p = 0; p < promotions; p++) {
        const bloc = Math.floor(p / 4), rang = p % 4, site = rang % 2;
        const racine = p * 7 + 1;
        const td = [racine + 1, racine + 2];
        const tp = [3, 4, 5, 6].map((n) => racine + n);
        const profs = [1, 2, 3].map((n) => 3 * p + n);
        const invite = 3 * (4 * bloc + (rang + 1) % 4) + 1;
        const disponibles = [0, 1, 2 + rang, 6 + rang];
        vacataires.push({ enseignantId: profs[2], demiJournees: disponibles });
        for (const c of creneaux) {
            const demiJournee = (c.jour - 1) * 2 + Math.floor((c.rang - 1) / 4);
            if (!disponibles.includes(demiJournee)) {
                voeux.push({ enseignantId: profs[2], creneauId: c.id, type: 'INDISPONIBLE' });
            }
        }
        voeux.push({ enseignantId: profs[0], creneauId: 25, type: 'PREFERE' },
            { enseignantId: profs[1], creneauId: 33, type: 'EVITER' });
        ressources.push(...tp.map((id) => ({ nature: 'GROUPE', id })),
            ...profs.map((id) => ({ nature: 'ENSEIGNANT', id })));
        for (let m = 0; m < 3; m++) {
            const coursId = p * 3 + m + 1;
            function ajouter(type, groupe, feuilles, descendants, enseignant, longueur, creneauId, salle, equipementsRequis = []) {
                const id = [coursId, type, groupe].join('-');
                lecons.push({ id, enseignementId: lecons.length + 1, coursId, type, regime: 'initiale',
                    longueur, enseignants: [enseignant], groupesDirects: [groupe], groupes: descendants,
                    feuilles, effectif: 30 * feuilles.length, typeSalleRequis: salles[salle - 1].type,
                    equipementsRequis, distanciel: false, epinglee: false });
                temoin.push({ id, creneauId, salleId: salle });
            }
            ajouter('CM', racine, tp, [racine, ...td, ...tp], invite, 1,
                25 + 4 * Math.floor(rang / 2) + m, salleId(bloc, site, 0));
            for (let t = 0; t < 2; t++) {
                const feuilles = tp.slice(2 * t, 2 * t + 2);
                ajouter('TD', td[t], feuilles, [td[t], ...feuilles], profs[1], 1,
                    33 + 2 * m + t, salleId(bloc, site, 1 + Math.floor(rang / 2)));
            }
            const siteLabo = (site + m) % 2;
            for (let t = 0; t < 4; t++) {
                ajouter('TP', tp[t], [tp[t]], [tp[t]], [profs[2], profs[0], profs[1]][m], 2,
                    1 + 8 * m + 2 * t, salleId(bloc, siteLabo, 3 + Math.floor(rang / 2)), ['atelier-' + siteLabo]);
            }
        }
    }
    const probleme = { dureeSecondes: 600, creneaux, salles, voeux, ressources, lecons,
        parametres: { maxMinutesJourGroupe: 480, maxMinutesJourEnseignant: 480, trajetDefautMinutes: 30,
            trajets: { '1-2': 30 }, samediApresMidi: false } };
    verifierEntree(probleme);
    verifierTemoin(probleme, temoin);
    const manifeste = { etudiants, promotions, groupesTD: promotions * 2, groupesTP: promotions * 4,
        enseignants: new Set(lecons.flatMap((l) => l.enseignants)).size, vacataires,
        cmParEnseignantAutrePromotion: lecons.filter((l) => l.type === 'CM').length,
        salles: salles.length, creneaux: creneaux.length, seances: lecons.length,
        problemeSha256: empreinte(serialiser(probleme)), temoinSha256: empreinte(serialiser(temoin)) };
    return { probleme, temoin, manifeste };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    for (const taille of tailles) {
        for (const [nom, donnees] of Object.entries(genererCampus(taille))) {
            const chemin = new URL('./jeux/campus-' + taille + '-' + nom + '.json', import.meta.url);
            const contenu = serialiser(donnees);
            if (process.argv.includes('--verifier')) {
                if (await readFile(chemin, 'utf8') !== contenu) throw new Error('Fichier différent : ' + chemin);
            } else await writeFile(chemin, contenu);
        }
    }
}
