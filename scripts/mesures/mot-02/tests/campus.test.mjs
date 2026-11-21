// Régressions du banc sur la hiérarchie, les trajets et les fenêtres des vacataires.
import test from 'node:test';
import { comparer } from '../extraire-campus.mjs';
import assert from 'node:assert/strict';
import { genererCampus, tailles } from '../generer-campus.mjs';
import { verifierTemoin } from '../lib/validation.mjs';
import { empreinte, serialiser } from '../generer-superieur.mjs';

for (const taille of tailles) {
    test('Volume, diversité et témoin du jeu de ' + taille, () => {
        const { probleme, temoin, manifeste } = genererCampus(taille);
        const promotions = taille / 120;
        for (const [type, facteur] of [['CM', 3], ['TD', 6], ['TP', 12]]) {
            assert.equal(probleme.lecons.filter((l) => l.type === type).length, promotions * facteur);
        }
        assert.equal(manifeste.enseignants, 3 * promotions);
        assert.equal(manifeste.vacataires.length, promotions);
        for (const vac of manifeste.vacataires) {
            assert.equal(new Set(vac.demiJournees).size, 4);
            const service = probleme.lecons.filter((l) => l.enseignants.includes(vac.enseignantId));
            assert.equal(service.length, 4);
            assert.ok(service.every((l) => l.type === 'TP' && l.longueur === 2));
        }
        assert.equal(empreinte(serialiser(temoin)), manifeste.temoinSha256);
        assert.equal(verifierTemoin(probleme, temoin), true);
    });
}

function paire(id1, id2, secondCreneau, deuxiemeSalle) {
    const { probleme, temoin } = genererCampus(480);
    probleme.lecons = [id1, id2].map((id) => probleme.lecons.find((l) => l.id === id));
    const places = [id1, id2].map((id, i) => ({
        ...temoin.find((p) => p.id === id), creneauId: i ? secondCreneau : 1,
    }));
    if (deuxiemeSalle) places[1].salleId = deuxiemeSalle;
    return () => verifierTemoin(probleme, places);
}

test('Un CM et un TP de sa promotion entrent en collision', () => {
    assert.throws(paire('1-CM-1', '1-TP-4', 1), /Collision/);
});
test('Deux TP frères avec deux enseignants et deux salles peuvent être simultanés', () => {
    assert.equal(paire('1-TP-4', '3-TP-5', 1, 5)(), true);
});
test('Un TP immédiatement après un CM sur un autre campus manque le trajet', () => {
    assert.throws(paire('1-CM-1', '2-TP-4', 2), /Trajet/);
    assert.equal(paire('1-CM-1', '2-TP-4', 3)(), true);
});
test('Le témoin refuse un équipement manquant et une indisponibilité même au second créneau', () => {
    const { probleme, temoin } = genererCampus(480);
    const tp = probleme.lecons.find((l) => l.id === '1-TP-4');
    const place = temoin.find((p) => p.id === tp.id);
    probleme.lecons = [tp];
    assert.throws(() => verifierTemoin(probleme, [{ ...place, salleId: 9 }]), /incompatible/);
    probleme.voeux.push({ enseignantId: tp.enseignants[0], creneauId: place.creneauId + 1, type: 'INDISPONIBLE' });
    assert.throws(() => verifierTemoin(probleme, [place]), /indisponible/);
});

test('Qualité : seuil strict, référence nulle et comparaison incomplète', () => {
    const serie = (score) => Array.from({ length: 3 }, () => ({ faisable: true, souple: score }));
    assert.equal(comparer(serie(-10), serie(-11)).verdict, 'conforme');
    assert.equal(comparer(serie(-10), serie(-12)).verdict, 'alerte');
    assert.equal(comparer(serie(0), serie(-1)).verdict, 'alerte');
    assert.equal(comparer(serie(5), serie(0)).ecartPoints, -5);
    assert.equal(comparer(serie(4), serie(4).slice(1)).verdict, 'indéterminé');
});
