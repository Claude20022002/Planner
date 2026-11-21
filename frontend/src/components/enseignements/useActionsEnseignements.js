/** Gère les écritures et les formulaires du référentiel des enseignements. */
import { useState } from 'react';
import { enseignementAPI } from '../../services/api';
import { useToast } from '../../contexts/ToastContext';

export default function useActionsEnseignements({ t, idPeriode, filiere, selection, relire }) {
  const toast = useToast();
  const [rapport, setRapport] = useState(null);
  const [edition, setEdition] = useState(null);
  const [aSupprimer, setASupprimer] = useState(null);

  const erreur = (error) =>
    toast.error(error.response?.data?.error || error.response?.data?.errors?.[0]?.message || error.message);

  const generer = async () => {
    try {
      const resultat = await enseignementAPI.generer({
        id_periode: idPeriode,
        ...(filiere !== 'toutes' && { id_filiere: filiere }),
      });
      setRapport(resultat);
      relire();
    } catch (error) {
      erreur(error);
    }
  };

  const mutualiser = async () => {
    try {
      await enseignementAPI.fusionner([...selection]);
      toast.success(t('ref.teaching.merged'));
      relire();
    } catch (error) {
      erreur(error);
    }
  };

  const scinder = async (enseignement) => {
    try {
      await enseignementAPI.scinder(enseignement.id_enseignement);
      toast.success(t('ref.teaching.split'));
      relire();
    } catch (error) {
      erreur(error);
    }
  };

  const enregistrerEdition = async (event) => {
    event.preventDefault();
    try {
      await enseignementAPI.update(edition.id_enseignement, {
        heures_prevues: Number(edition.heures_prevues),
        libelle: edition.libelle || null,
      });
      toast.success(t('ref.teaching.saved'));
      setEdition(null);
      relire();
    } catch (error) {
      erreur(error);
    }
  };

  const supprimer = async () => {
    const enseignement = aSupprimer;
    setASupprimer(null);
    try {
      await enseignementAPI.delete(enseignement.id_enseignement);
      toast.success(t('ref.teaching.deleted'));
      relire();
    } catch (error) {
      erreur(error);
    }
  };

  return {
    rapport,
    setRapport,
    edition,
    setEdition,
    aSupprimer,
    setASupprimer,
    generer,
    mutualiser,
    scinder,
    enregistrerEdition,
    supprimer,
  };
}
