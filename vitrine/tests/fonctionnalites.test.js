// Contrat du registre public, preuves locales et cohérence entre le menu et ses destinations.
import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import entrees from '../src/donnees/fonctionnalites.json' with { type: 'json' };
import { fonctionnalites, regrouper, CLES_REGISTRE } from '../src/components/catalogue/registre.js';
import { modulesDisponibles } from '../src/donnees/modules.js';
import { LANGUES } from '../src/i18n/langues.js';
import applications from '../../frontend/src/i18n/applications.fr.js';

const racine = fileURLToPath(new URL('../../', import.meta.url));
const revision = 'a8349801f351e884cc9e2877a649b51825f7ff50';
const lire = (chemin) => readFileSync(resolve(racine, chemin), 'utf8');
const textes = (langue) => JSON.parse(lire(`vitrine/src/i18n/${langue}/fonctionnalites.json`));

test('chaque fonctionnalité possède une clé unique, ses traductions, son module et ses preuves', () => {
  assert.equal(new Set(entrees.map((f) => f.id)).size, entrees.length);
  for (const f of entrees) {
    assert.match(f.id, /^[a-z][a-z0-9-]*$/);
    assert.ok(applications[f.application]?.titre, f.application);
    assert.ok(['existe', 'bientot'].includes(f.etat), f.id);
    assert.ok(CLES_REGISTRE.includes(f.module), `${f.id} : module ${f.module}`);
    assert.equal(f.page, undefined, f.id);
    for (const langue of ['fr', 'en']) {
      for (const champ of [f.titre, f.description, ...(f.alternative ? [f.alternative] : [])]) {
        assert.ok(champ[langue]?.trim(), f.id + ' ' + langue);
      }
      assert.ok(textes(langue).groupes[f.categorie], f.categorie);
      assert.ok(textes(langue).applications[f.application], f.application);
    }
    assert.ok(Object.values(f.sources).flat().length > 0, f.id);
    for (const depot of Object.keys(f.sources)) assert.ok(['planner', 'studylib'].includes(depot), depot);
    for (const chemin of f.sources.planner ?? []) assert.ok(existsSync(resolve(racine, chemin)), chemin);
    if (f.etat === 'bientot') assert.ok(f.sources.planner.some((s) => s.startsWith('docs/plan/')), f.id);
  }
});

test('les preuves StudyLib existent dans la révision épinglée', { skip: !process.env.STUDYLIB_DEPOT && 'clone externe facultatif en CI' }, () => {
  for (const chemin of new Set(entrees.flatMap((f) => f.sources.studylib ?? []))) {
    execFileSync('git', ['-C', process.env.STUDYLIB_DEPOT, 'cat-file', '-e', revision + ':' + chemin]);
  }
});

test('chaque module disponible a des entrées, chaque entrée est rangée une fois, et le repli arabe', () => {
  for (const module of modulesDisponibles()) assert.ok(entrees.some((f) => f.module === module.cle), module.cle);
  for (const langue of LANGUES) {
    const liste = fonctionnalites(langue);
    const groupes = regrouper(liste, 'categorie');
    assert.deepEqual([...groupes.values()].flat().map((f) => f.id).sort(), liste.map((f) => f.id).sort());
    for (const [categorie, groupe] of groupes) assert.ok(groupe.every((f) => f.categorie === categorie));
  }
  assert.deepEqual(fonctionnalites('ar'), fonctionnalites('fr'));
});

test('le catalogue et la FAQ reprennent la condition validée pour l’IA du Studio quiz', () => {
  const quiz = entrees.find((f) => f.id === 'quiz-ia');
  for (const [langue, condition] of Object.entries({
    fr: 'Quand l’IA est activée pour votre école',
    en: 'When AI is turned on for your school',
  })) {
    assert.ok(quiz.description[langue].startsWith(condition), langue);
    const faq = JSON.parse(lire(`vitrine/src/i18n/${langue}/faq.json`));
    assert.ok(faq.questions.some((q) => q.reponse.startsWith(condition)), langue);
  }
});

test('les six réponses françaises de la FAQ correspondent aux visas du chef', () => {
  const plan = lire('docs/conception/vitrine/vit-11-catalogue-faq.md');
  const faq = JSON.parse(lire('vitrine/src/i18n/fr/faq.json'));
  const reponses = [...plan.matchAll(/^\| (?:[4-9]|10) \|[^\n]*?« ([^»]+) »/gm)].map((m) => m[1].trim());
  reponses[3] = "L'application des étudiants montre leur semaine et scanne le QR code de l'appel. Sans téléphone, l'emploi du temps et les ressources s'ouvrent dans un navigateur, et l'enseignant fait l'appel à la main.";
  reponses.splice(5, 1);
  assert.equal(reponses.length, 6);
  assert.deepEqual(faq.questions.map((q) => q.reponse), reponses);
});
