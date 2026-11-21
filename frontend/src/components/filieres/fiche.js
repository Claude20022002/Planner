/** Champs et modèle d’import filière existants. */
export const FILIERE_VIDE = {
    code_filiere: '',
    nom_filiere: '',
    description: '',
    // Plus affichée (R-3) mais obligatoire en base : une filière modifiée garde la sienne
    ecole: 'engineering',
    cycle: '',
    intitule_cycle: '',
    premiere_annee_cycle: '',
    regime: 'initiale',
    partenaire: '',
    annees_a_hestim: '',
};

export const MODELE_CSV = [
    'code_filiere;nom_filiere;cycle;intitule_cycle;premiere_annee_cycle;regime;partenaire',
    "IIIA;Informatique & IA;ingenieur;cycle Ingénieur d'Etat;3;initiale;",
].join('\n');

export const entierOuNull = (valeur) => (valeur === '' || valeur === null || valeur === undefined ? null : Number(valeur));
