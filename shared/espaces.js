/**
 * Les espaces de la plateforme HESTIM, dans le même ordre et sous les mêmes noms partout
 * (Planner web, application mobile, StudyLib, ClassQuiz) : depuis n'importe quel écran, le
 * sélecteur d'espaces mène à chacun en deux gestes (ouvrir le sélecteur, choisir l'espace).
 *
 * Chemins relatifs à l'origine de la plateforme (Planner et StudyLib partagent la même).
 * L'entrée Quiz reste dans Planner (QJE-01) : elle ne construit plus d'adresse vers ClassQuiz.
 */
export const ESPACES = [
  {
    code: 'planner',
    icone: 'calendar',
    titre: { fr: 'Planner', en: 'Planner' },
    resume: { fr: 'Emploi du temps, séances, salles', en: 'Timetable, sessions, rooms' },
    // Tableau du rôle connecté (redirection de Planner) : les autres espaces ne connaissent pas le rôle
    chemin: '/tableau',
  },
  {
    code: 'bibliotheque',
    icone: 'library',
    titre: { fr: 'Bibliothèque', en: 'Library' },
    resume: { fr: 'Supports de cours, stages, projets', en: 'Course materials, internships, projects' },
    // La Bibliothèque s'ouvre sur ses documents (décision du 15 octobre, lot E-9) ; l'enseignant
    // n'a plus de tableau de bord dans StudyLib
    chemin: '/biblio/documents',
  },
  // Pas d'espace Activités : on y entre par le scan du QR que projette l'enseignant, comme sur
  // Wooclap (remarques-par-profil.md, § 10) ; le menu du site garde sa page.
  {
    code: 'quiz',
    icone: 'quiz',
    titre: { fr: 'Quiz', en: 'Quiz' },
    resume: { fr: 'Quiz en direct pendant la séance', en: 'Live quizzes during class' },
    // L'adresse dépend du rôle (adresseEspace) : l'enseignant sur Activités, l'étudiant sur /quiz.
    chemin: null,
  },
];

/**
 * Adresse d'un espace pour un rôle donné. Quiz (QJE-01) : l'enseignant ouvre Activités (/jeux),
 * l'étudiant ouvre la saisie du code (/quiz). Les deux restent dans Planner. L'administration
 * et les autres rôles n'ont pas cette entrée. urlQuiz n'est plus lu.
 * @param {string} code
 * @param {{ role?: string, urlQuiz?: string|null }} contexte
 * @returns {string|null} null si l'espace n'est pas disponible
 */
export const adresseEspace = (code, { role } = {}) => {
  if (code === 'quiz') {
    if (role === 'enseignant') return '/jeux';
    if (role === 'etudiant') return '/quiz';
    return null;
  }
  return ESPACES.find((e) => e.code === code)?.chemin ?? null;
};
