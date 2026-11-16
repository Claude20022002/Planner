/** Modèle et validation existants de la fiche étudiant. */
import * as yup from 'yup';
export const MODELE_CSV = [
    'nom;prenom;email;telephone;numero_etudiant;niveau;groupe',
    'EXEMPLE;Amine;amine.exemple@exemple.hestim.test;;E2026001;3A;IIIA-3A-TD1',
].join('\n');

export const validationSchema = yup.object({
    // Messages : des clés de traduction, traduites à l'affichage
    id_user: yup.number().required('etudiants.erreurs.utilisateur'),
    numero_etudiant: yup.string().required('etudiants.erreurs.numero'),
    niveau: yup.string().required('etudiants.erreurs.niveau'),
    id_groupe: yup.number().required('etudiants.erreurs.groupe'),
});
