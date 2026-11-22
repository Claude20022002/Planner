// Types d'établissement de la page « Solutions » (plan validé le 18 nov.) : l'ordre des sections,
// l'ancre de chacune, et la page de fonction vers laquelle renvoie chaque point « Aujourd'hui ».
// Les textes sont dans src/i18n/<langue>/solutions.json, sous types.<cle>, dans le même ordre.
// Ordre (décision D4 du chef, VIT-18) : d'abord les types dont l'emploi du temps est calculé
// aujourd'hui (supérieur, formation), puis le collège et le lycée. Le ton alterne selon la place.

/** Types présentés, dans l'ordre de la page : clé des textes, ancre, ton de la section, pages liées */
export const TYPES = [
  { cle: 'superieur', ancre: 'superieur', ton: 'clair', pages: ['emploiDuTemps', 'etablissement', 'etablissement', 'enClasse'] },
  { cle: 'formation', ancre: 'formation', ton: 'gris', pages: ['emploiDuTemps', 'emploiDuTemps', 'etablissement'] },
  { cle: 'collegeLycee', ancre: 'college-lycee', ton: 'clair', pages: ['enClasse', 'enClasse', 'etablissement', 'emploiDuTemps'] },
];
