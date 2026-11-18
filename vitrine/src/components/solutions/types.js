// Types d'établissement de la page « Solutions » (plan validé le 18 nov.) : l'ordre des sections,
// l'ancre de chacune, et la page de fonction vers laquelle renvoie chaque point « Aujourd'hui ».
// Les textes sont dans src/i18n/<langue>/solutions.json, sous types.<cle>, dans le même ordre.

/** Types présentés, dans l'ordre de la page : clé des textes, ancre, ton de la section, pages liées */
export const TYPES = [
  { cle: 'collegeLycee', ancre: 'college-lycee', ton: 'clair', pages: ['enClasse', 'enClasse', 'etablissement', 'emploiDuTemps'] },
  { cle: 'superieur', ancre: 'superieur', ton: 'gris', pages: ['emploiDuTemps', 'etablissement', 'etablissement', 'enClasse'] },
  { cle: 'formation', ancre: 'formation', ton: 'clair', pages: ['emploiDuTemps', 'emploiDuTemps', 'etablissement'] },
];
