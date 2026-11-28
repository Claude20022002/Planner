// Lit les deux teintes du logo dans la charte commune.
import jetons from '../../../../shared/charte/jetons.json' with { type: 'json' };

const { applications, couleurs } = jetons.familles;

/** Propriétés CSS locales d'une tuile ou page de module. */
export function teintesModule({ logo }) {
  const cle = 'app-' + logo;
  const base = applications[cle]?.valeur ?? couleurs.bleu.valeur;
  const fonce = applications[cle + '-fonce']?.valeur ?? couleurs['bleu-nuit'].valeur;
  return { '--module-base': base, '--module-fonce': fonce };
}
