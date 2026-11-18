/** Champs et modèle d’import existants des enseignants. */
export const STATUTS = ['permanent', 'vacataire'];
export const FICHE_VIDE = {
    id_user: '',
    specialite: '',
    departement: '',
    grade: '',
    bureau: '',
    statut: 'permanent',
    service_annuel_heures: '',
    max_heures_semaine: '',
    id_campus_prefere: '',
    entreprise: '',
};
export const MODELE_CSV = [
    'nom;prenom;email;telephone;specialite;departement;grade;bureau;statut;service_annuel_heures;max_heures_semaine;entreprise',
    'EXEMPLE;Salma;salma.exemple@exemple.hestim.test;;Bases de données;Informatique;Professeur;G-204;permanent;192;18;',
    'MODELE;Youssef;youssef.modele@exemple.hestim.test;;Cloud;Informatique;Vacataire;;vacataire;;9;Entreprise fictive',
].join('\n');

export const nombreOuNull = (v) => (v === '' || v === null || v === undefined ? null : Number(v));
