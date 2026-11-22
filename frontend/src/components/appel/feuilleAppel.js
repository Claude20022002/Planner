/**
 * Liste d'appel imprimable d'une séance (M-1, étude EP-18, contexte C2 : rien dans la salle) : la page
 * HTML que la fenêtre d'impression affiche. Fonction pure : les textes arrivent traduits.
 * Aucun format de papier imposé (pas de `size` dans @page : A4 comme Letter), lisible en noir et
 * blanc (cases tracées, aucune couleur porteuse de sens) ; sur l'élève, le nom et le prénom seuls.
 */

const ECHAPPEMENTS = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

/** Un texte saisi par l'école (nom, salle…) placé dans le HTML sans pouvoir y devenir du code. */
export const echapper = (texte) => String(texte ?? '').replace(/[&<>"']/g, (c) => ECHAPPEMENTS[c]);

/** Les attendus dans l'ordre de la feuille : par nom, puis par prénom, dans la langue de l'écran. */
export const ordreDeLaFeuille = (etudiants, langue = 'fr') =>
  [...(etudiants ?? [])].sort((a, b) => String(a.nom ?? '').localeCompare(String(b.nom ?? ''), langue) || String(a.prenom ?? '').localeCompare(String(b.prenom ?? ''), langue));

const CASE = '<span class="case" aria-hidden="true"></span>';

/**
 * @param {object} o
 * @param {string} o.ecole nom de l'école
 * @param {object} o.seance { cours, groupe, date (AAAA-MM-JJ), heure_debut, heure_fin, salle }
 * @param {object[]} o.etudiants [{ nom, prenom }]
 * @param {string|null} o.enseignant nom de l'enseignant, ou null (une ligne à remplir à la main)
 * @param {object} o.textes textes traduits (titre, colonnes, pied…)
 * @param {string} o.locale locale des dates (fr-FR, en-GB)
 * @param {string} o.imprimeLe date d'impression, déjà mise en forme
 * @returns {string} la page HTML complète
 */
export const feuilleAppelHtml = ({ ecole, seance, etudiants, enseignant = null, textes, locale = 'fr-FR', imprimeLe = '' }) => {
  const date = seance?.date ? new Date(`${seance.date}T12:00:00Z`).toLocaleDateString(locale, { timeZone: 'UTC', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : '';
  const horaire = [seance?.heure_debut, seance?.heure_fin].filter(Boolean).join(' – ');
  const enTete = [
    [textes.matiere, seance?.cours],
    [textes.groupe, seance?.groupe],
    [textes.date, date],
    [textes.horaire, horaire],
    [textes.salle, seance?.salle],
  ]
    .filter(([, valeur]) => valeur)
    .map(([libelle, valeur]) => `<div><span class="libelle">${echapper(libelle)} :</span> ${echapper(valeur)}</div>`)
    .join('');
  const lignes = ordreDeLaFeuille(etudiants, locale.slice(0, 2))
    .map((e, i) => `<tr><td class="num">${i + 1}</td><td>${echapper(e.nom)}</td><td>${echapper(e.prenom)}</td><td class="c">${CASE}</td><td class="c">${CASE}</td><td class="c">${CASE}</td><td class="motif"></td></tr>`)
    .join('');
  const vide = `<tr><td colspan="7" class="vide">${echapper(textes.aucun)}</td></tr>`;
  return `<!doctype html>
<html lang="${echapper(locale.slice(0, 2))}">
<head>
<meta charset="utf-8">
<title>${echapper(textes.titre)} · ${echapper(seance?.cours ?? '')}</title>
<style>
  @page { margin: 12mm; }
  * { box-sizing: border-box; }
  body { font: 11pt/1.35 system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif; color: #000; background: #fff; margin: 0; }
  h1 { font-size: 15pt; margin: 0 0 2mm; }
  .ecole { font-size: 10pt; margin-bottom: 4mm; }
  .entete { display: grid; grid-template-columns: 1fr 1fr; gap: 1mm 6mm; margin-bottom: 4mm; }
  .libelle { font-weight: 600; }
  table { width: 100%; border-collapse: collapse; }
  th, td { border: 1px solid #000; padding: 1.6mm 2mm; text-align: left; vertical-align: middle; }
  th { font-size: 9.5pt; }
  td.num { width: 8mm; text-align: right; }
  td.c, th.c { width: 18mm; text-align: center; }
  td.motif { width: 30%; }
  td.vide { text-align: center; }
  .case { display: inline-block; width: 4.5mm; height: 4.5mm; border: 1.2px solid #000; }
  tr { break-inside: avoid; }
  thead { display: table-header-group; }
  .pied { margin-top: 5mm; font-size: 9.5pt; display: flex; justify-content: space-between; gap: 6mm; }
</style>
</head>
<body>
<h1>${echapper(textes.titre)}</h1>
<div class="ecole">${echapper(ecole)}</div>
<div class="entete">${enTete}<div><span class="libelle">${echapper(textes.enseignant)} :</span> ${enseignant ? echapper(enseignant) : '______________________'}</div></div>
<table>
<thead><tr><th>${echapper(textes.numero)}</th><th>${echapper(textes.nom)}</th><th>${echapper(textes.prenom)}</th><th class="c">${echapper(textes.present)}</th><th class="c">${echapper(textes.retard)}</th><th class="c">${echapper(textes.absent)}</th><th>${echapper(textes.motif)}</th></tr></thead>
<tbody>${lignes || vide}</tbody>
</table>
<div class="pied"><span>${echapper(textes.pied)}</span><span>${echapper(textes.imprimeLe)} ${echapper(imprimeLe)}</span></div>
</body>
</html>`;
};
