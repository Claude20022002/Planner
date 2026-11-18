/** Types, valeurs et arbre de groupes existants. */
// Type d'un sous-groupe selon son parent : promotion → TD → TP
export const ENFANT_DE = { promotion: 'td', td: 'tp' };

export const anneeScolaireCourante = () => {
    const d = new Date();
    const debut = d.getMonth() >= 7 ? d.getFullYear() : d.getFullYear() - 1;
    return `${debut}-${debut + 1}`;
};

export const GROUPE_VIDE = { nom_groupe: '', niveau: '', effectif: 0, annee_scolaire: anneeScolaireCourante(), id_filiere: '', type_groupe: 'promotion', id_groupe_parent: null, annee: '' };

export const MODELE_CSV = [
    'nom_groupe;code_filiere;niveau;annee;effectif;annee_scolaire;type_groupe;parent',
    '4A IIIA;IIIA;4ème année;4;44;2026-2027;promotion;',
    'IIIA-4A;IIIA;4ème année;4;22;2026-2027;td;4A IIIA',
].join('\n');

/** Aplatit l'arbre en lignes avec leur profondeur (affichage en retrait). */
export const aplatir = (noeuds, profondeur = 0) =>
    noeuds.flatMap((n) => [{ ...n, profondeur }, ...aplatir(n.sous_groupes || [], profondeur + 1)]);
