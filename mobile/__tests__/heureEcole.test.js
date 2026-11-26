/**
 * Heure de l'école dans l'application (M-10, T-5) : « maintenant » suit l'horloge rendue par le
 * serveur, pas le fuseau du téléphone ; l'horloge vient de la copie de l'identité au lancement,
 * puis de la réponse du serveur.
 */
jest.mock('@react-native-async-storage/async-storage', () => require('@react-native-async-storage/async-storage/jest/async-storage-mock'));

import AsyncStorage from '@react-native-async-storage/async-storage';
import { configurerHorloge, decalageA, maintenantEcole } from '../../shared/dates.js';
import { toBoardSession, toLocalISODate } from '../../shared/session.js';
import { chargerIdentite } from '../src/ecole';

const UTC = { fuseau: 'UTC', decalages: [{ depuis: '1970-01-01T00:00:00.000Z', minutes: 0 }] };
const UTC_PLUS_1 = { fuseau: 'Africa/Kinshasa', decalages: [{ depuis: '2025-10-18T00:00:00.000Z', minutes: 60 }] };
const UTC_PLUS_2 = { fuseau: 'Africa/Lubumbashi', decalages: [{ depuis: '2025-10-18T00:00:00.000Z', minutes: 120 }] };
const A_23_H_30_UTC = new Date('2026-11-22T23:30:00Z');

afterEach(async () => {
  configurerHorloge(UTC);
  await AsyncStorage.clear();
});

test("à 23 h 30 UTC, une école à UTC+1 est au lendemain, quel que soit le fuseau du téléphone", () => {
  configurerHorloge(UTC_PLUS_1);
  const maintenant = maintenantEcole(A_23_H_30_UTC);
  expect(toLocalISODate(maintenant)).toBe('2026-11-23');
  expect(maintenant.getHours()).toBe(0);
  expect(maintenant.getMinutes()).toBe(30);
});

test("une séance finie à 23 h 55 la veille est passée pour l'école, alors que l'heure UTC la dirait en cours", () => {
  configurerHorloge(UTC_PLUS_1);
  const seance = toBoardSession({ id_affectation: 1, date_seance: '2026-11-22', creneau: { heure_debut: '22:00:00', heure_fin: '23:55:00' } });
  // Dans le modèle des séances, « maintenant » de l'école est le 23 à 0 h 30 : la séance est finie
  expect(seance.end < maintenantEcole(A_23_H_30_UTC)).toBe(true);
  // L'ancien calcul (le 22 à 23 h 30, soit l'heure UTC lue comme heure de l'école) la disait en cours
  expect(seance.end < new Date(2026, 10, 22, 23, 30)).toBe(false);
});

test("au lancement : l'horloge de la copie tout de suite, puis celle du serveur", async () => {
  await AsyncStorage.setItem('planner.ecole', JSON.stringify({ nom: 'École', nom_court: 'École', horloge: UTC_PLUS_1 }));
  let repondre;
  const reponse = new Promise((r) => {
    repondre = r;
  });
  const lire = () => reponse.then(() => ({ ok: true, json: async () => ({ nom: 'École', nom_court: 'École', horloge: UTC_PLUS_2 }) }));

  await chargerIdentite(lire);
  expect(decalageA(A_23_H_30_UTC)).toBe(60);

  repondre();
  await reponse;
  await new Promise((r) => setTimeout(r, 0));
  expect(decalageA(A_23_H_30_UTC)).toBe(120);
});
