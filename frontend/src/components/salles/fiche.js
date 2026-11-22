/** Salle : formulaire vide, passage salle ↔ formulaire ↔ envoi, contrôles locaux, filtre et étage. Fonctions sans effet. */
export const SALLE_VIDE = {
  nom_salle: '',
  type_salle: '',
  id_campus: '',
  capacite: '',
  capacite_examen: '',
  etage: '',
  equipements: [],
  reservable_par: 'admin',
  disponible: true,
};

export const MODELE_CSV = [
  'nom_salle;type_salle;capacite;campus;etage;equipements;capacite_examen;reservable_par',
  'G-S01;Salle de cours;38;G;1;Vidéoprojecteur, Tableau blanc;19;admin',
  'ST-LABO01;Labo informatique;28;ST;1;28 postes, AutoCAD;;enseignants',
].join('\n');

/** Formulaire d'une salle existante, ou d'une salle nouvelle rattachée au campus par défaut. */
export const formulaireDepuisSalle = (salle, idCampusParDefaut = '') =>
  salle
    ? {
        nom_salle: salle.nom_salle,
        type_salle: salle.type_salle,
        id_campus: salle.id_campus,
        capacite: salle.capacite,
        capacite_examen: salle.capacite_examen ?? '',
        etage: salle.etage ?? '',
        equipements: salle.equipements || [],
        reservable_par: salle.reservable_par || 'admin',
        disponible: salle.disponible,
      }
    : { ...SALLE_VIDE, id_campus: idCampusParDefaut };

/** Champ en erreur → clé de texte sous ref.rooms ; vide si le formulaire peut partir. */
export const erreursSalle = (form) => {
  const erreurs = {};
  if (!String(form.nom_salle).trim()) erreurs.nom_salle = 'required';
  if (!form.type_salle) erreurs.type_salle = 'required';
  if (!form.id_campus) erreurs.id_campus = 'required';
  if (!(Number(form.capacite) >= 1)) erreurs.capacite = 'capacityInvalid';
  // La capacité d'examen ne dépasse jamais la capacité
  if (form.capacite_examen !== '' && Number(form.capacite_examen) > Number(form.capacite)) erreurs.capacite_examen = 'examTooHigh';
  return erreurs;
};

/** Données envoyées au serveur, mêmes conversions qu'avant UIX-06c. */
export const donneesSalle = (form) => ({
  ...form,
  nom_salle: form.nom_salle.trim(),
  capacite: Number(form.capacite),
  id_campus: Number(form.id_campus),
  capacite_examen: form.capacite_examen === '' ? null : Number(form.capacite_examen),
  etage: form.etage === '' ? null : Number(form.etage),
});

/** Filtre par code de campus (« tous » pour aucun), puis recherche dans le nom, le type, le campus et les équipements. */
export const filtrerSalles = (salles, campusCode, recherche) => {
  const terme = recherche.trim().toLowerCase();
  return salles
    .filter((s) => campusCode === 'tous' || s.campus?.code === campusCode)
    .filter(
      (s) =>
        !terme ||
        [s.nom_salle, s.type_salle, s.campus?.nom, ...(s.equipements || [])]
          .filter(Boolean)
          .some((valeur) => String(valeur).toLowerCase().includes(terme)),
    );
};

/** Étage → [clé de texte sous ref.rooms, paramètres], ou null quand il n'est pas renseigné. */
export const cleEtage = (etage) => {
  if (etage === null || etage === undefined) return null;
  if (etage === 0) return ['groundFloor', {}];
  if (etage < 0) return ['basement', {}];
  return ['floorN', { n: etage }];
};
