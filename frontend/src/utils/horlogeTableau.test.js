/**
 * Tableau de bord de l'administration à l'heure de l'école (M-10, réponse 7 du coordinateur) : les
 * périodes calculées sans date donnée partent de « maintenant » à l'école (maintenantEcole), pas de
 * l'heure du navigateur. L'horloge du test est figée à 23 h 30 UTC, un dimanche.
 */
import { afterEach, beforeEach, mock, test } from 'node:test';
import assert from 'node:assert/strict';
import { configurerHorloge } from '../../../shared/dates.js';
import { joursSuivants, moisEnCours, prochainsJours, semaineEnCours } from '../components/dashboard/periodes.js';

const UTC = { fuseau: 'UTC', decalages: [{ depuis: '1970-01-01T00:00:00.000Z', minutes: 0 }] };
const UTC_PLUS_1 = { fuseau: 'Africa/Kinshasa', decalages: [{ depuis: '2025-10-18T00:00:00.000Z', minutes: 60 }] };

beforeEach(() => mock.timers.enable({ apis: ['Date'], now: new Date('2026-11-29T23:30:00Z') }));
afterEach(() => {
  mock.timers.reset();
  configurerHorloge(UTC);
});

test("école à UTC+1, dimanche 29 nov. à 23 h 30 UTC : la semaine et les jours partent du lundi 30", () => {
  configurerHorloge(UTC_PLUS_1);
  assert.deepEqual(semaineEnCours(), { debut: '2026-11-30', fin: '2026-12-06' });
  assert.deepEqual(joursSuivants(2), { debut: '2026-11-30', fin: '2026-12-02' });
  assert.deepEqual(prochainsJours(7), { debut: '2026-11-30', fin: '2026-12-06' });
  assert.equal(moisEnCours(), '2026-11');
});

test("école à UTC+0, au même instant : on est encore dimanche 29, dans la semaine du 23", () => {
  configurerHorloge(UTC);
  assert.deepEqual(semaineEnCours(), { debut: '2026-11-23', fin: '2026-11-29' });
  assert.deepEqual(joursSuivants(2), { debut: '2026-11-29', fin: '2026-12-01' });
});
