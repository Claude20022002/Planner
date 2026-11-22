/**
 * Pour les tests `node --test` du frontend seulement : Node 22 exige `with { type: 'json' }` pour
 * importer un JSON, alors que Vite, Metro et Jest acceptent l'import simple de shared/charte/index.js
 * et de shared/tokens.js (choix d'UIX-10a). Ce crochet ajoute l'attribut aux fichiers .json.
 * Lancement : node --import ./scripts/import-json-tests.mjs --test (npm run test:unit).
 */
import { register } from 'node:module';

const crochet = `export async function resolve(specifier, context, nextResolve) {
  const resultat = await nextResolve(specifier, context);
  if (!resultat.url.endsWith('.json')) return resultat;
  return { ...resultat, importAttributes: { ...context.importAttributes, type: 'json' } };
}`;

register(`data:text/javascript,${encodeURIComponent(crochet)}`);
