/** Charge les séances d’un enseignant et invalide le chargement au démontage. */
import { fetchAll } from '../../utils/fetchAll.js';

export function chargerSeances(idEnseignant, apiAffectations, { surSucces, surErreur }) {
    if (!idEnseignant) return () => {};

    let actif = true;
    fetchAll((params) => actif ? apiAffectations.getByEnseignant(idEnseignant, params) : []).then(
        (seances) => {
            if (actif) surSucces(seances);
        },
        () => {
            if (actif) surErreur();
        },
    );

    return () => { actif = false; };
}
