// VIT-19 · EP-19 : la mesure refuse une page trop lourde et accepte une petite page.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  SEUIL_OCTETS,
  controlerRacine,
  mesurerPage,
} from '../scripts/verifier-poids-ep19.mjs';

const SCRIPT = fs.readFileSync(
  path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'scripts', 'verifier-poids-ep19.mjs'),
  'utf8',
);

test('le script exporte la mesure et le seuil EP-19', () => {
  assert.equal(SEUIL_OCTETS, 200 * 1024);
  assert.match(SCRIPT, /export function mesurerPage/);
  assert.match(SCRIPT, /level:\s*GZIP_LEVEL|level:\s*1/);
});

test('une petite page passe ; une page gonflée est refusée', async () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'vit-19-ep19-'));
  try {
    const legere = path.join(tmp, 'legere');
    fs.mkdirSync(legere);
    fs.writeFileSync(path.join(legere, 'index.html'), '<!doctype html><title>ok</title><p>petite</p>');
    const ok = mesurerPage(legere, path.join(legere, 'index.html'));
    assert.equal(ok.ok, true);
    assert.ok(ok.total < SEUIL_OCTETS);

    const lourde = path.join(tmp, 'lourde');
    fs.mkdirSync(lourde);
    // Octets aléatoires : gzip niveau 1 ne les réduit presque pas.
    const { randomBytes } = await import('node:crypto');
    fs.writeFileSync(path.join(lourde, 'gros.css'), randomBytes(SEUIL_OCTETS + 4096));
    fs.writeFileSync(
      path.join(lourde, 'index.html'),
      '<!doctype html><link rel="stylesheet" href="/gros.css"><title>lourd</title>',
    );
    const ko = mesurerPage(lourde, path.join(lourde, 'index.html'));
    assert.equal(ko.ok, false);
    assert.ok(ko.total > SEUIL_OCTETS);
    assert.ok(ko.details.some((d) => d.fichier === 'gros.css'));

    const controle = controlerRacine(lourde);
    assert.equal(controle.ok, false);
    assert.equal(controle.plusLourde.page, 'index.html');
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});

test('les .mp4 sous videos/ sont exclus ; une image sous videos/ compte', () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'vit-19-videos-'));
  try {
    fs.mkdirSync(path.join(tmp, 'videos'), { recursive: true });
    fs.writeFileSync(path.join(tmp, 'videos', 'demo.mp4'), Buffer.alloc(300_000));
    fs.writeFileSync(path.join(tmp, 'videos', 'fixe.webp'), Buffer.alloc(12_000));
    fs.writeFileSync(
      path.join(tmp, 'index.html'),
      '<!doctype html><img src="/videos/demo.mp4" alt=""><img src="/videos/fixe.webp" alt=""><title>v</title>',
    );
    const r = mesurerPage(tmp, path.join(tmp, 'index.html'));
    assert.equal(r.ok, true);
    assert.ok(!r.details.some((d) => d.fichier === 'videos/demo.mp4'));
    assert.ok(r.details.some((d) => d.fichier === 'videos/fixe.webp'));
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});
