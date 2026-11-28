/** Catalogue d'interface construit exclusivement depuis les rubriques déjà autorisées. */
const GROUPES = [
  ['planning', 'calendar', ['nav.planning']],
  ['pedagogie', 'school', ['nav.programs', 'nav.groups', 'nav.courses', 'nav.teaching', 'nav.myClasses', 'nav.myCourses']],
  ['personnes', 'people', ['nav.users', 'nav.securityLog', 'nav.teachers', 'nav.students', 'nav.dossiers']],
  ['etablissement', 'settings', ['nav.calendar', 'nav.campus', 'nav.rooms', 'nav.slots', 'nav.planningSettings', 'nav.identity']],
  ['annonces', 'campaign', ['nav.announcements']],
  ['activites', 'quiz', ['nav.myQuizzes', 'nav.takeQuiz', 'nav.games']],
  ['bibliotheque', 'library', ['nav.library']],
];

/** Classe une rubrique existante, avec repli planning pour toute rubrique non spécialisée. */
export const groupeDeRubrique = (cle) => GROUPES.find((g) => g[2].includes(cle))?.[0] ?? 'planning';

/** Chaque rubrique reste présente une seule fois ; aucun rôle ou droit n'est ajouté ici. */
export const construireApplications = (sections) => GROUPES.map(([id, icone]) => {
  const vues = new Set();
  const rubriques = sections.flatMap((s) => s.items).filter((item) => {
    if (groupeDeRubrique(item.key) !== id || vues.has(item.path)) return false;
    vues.add(item.path);
    return true;
  });
  return { id, icone, rubriques, chemin: rubriques[0]?.path };
}).filter((app) => app.rubriques.length);

const normaliser = (texte) => String(texte ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase().trim();

/** Retrouve l'application d'une adresse, de ses alias ou de ses sous-pages. */
export const trouverApplication = (applications, chemin) => {
  const adresse = chemin.split(/[?#]/)[0].replace(/\/$/, '');
  return applications.find((app) => app.rubriques.some((r) => [r.path, ...(r.aussi ?? [])].some((base) => adresse === base || adresse.startsWith(`${base}/`))));
};

/** Recherche traduite, sans distinction d'accents ni de casse ; ne modifie jamais le catalogue. */
export const filtrerApplications = (applications, recherche, traduire) => {
  const mots = normaliser(recherche).split(/\s+/).filter(Boolean);
  return applications.map((app) => {
    const titre = traduire(`applications.${app.id}.titre`);
    const resume = traduire(`applications.${app.id}.resume`);
    const rubriques = app.rubriques.filter((r) => mots.every((mot) => normaliser(`${titre} ${resume} ${traduire(r.key)}`).includes(mot)));
    return { ...app, rubriques };
  }).filter((app) => app.rubriques.length);
};
