/** Chargement et actions d'une grille horaire (régime, variante) ; la réponse d'une ancienne grille n'écrase jamais la grille choisie. */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { creneauAPI } from '../../services/api';
import { useToast } from '../../contexts/ToastContext';
import { formatHeure } from '../../utils/session';
import { creerControleLecture } from '../gestion/controleLecture';
import { chevauchePrecedent, finApresDebut, indexer, joursAffiches, rangs } from './grille';

const FORM_VIDE = { jour_semaine: 'lundi', heure_debut: '', heure_fin: '' };

export default function useCreneaux() {
  const { t } = useTranslation();
  const toast = useToast();
  const controle = useMemo(creerControleLecture, []);
  const [regime, setRegime] = useState('initiale');
  const [variante, setVariante] = useState('normale');
  const [creneaux, setCreneaux] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erreurChargement, setErreurChargement] = useState('');
  const [dialog, setDialog] = useState({ open: false, editing: null });
  const [form, setForm] = useState(FORM_VIDE);
  const [aSupprimer, setASupprimer] = useState(null);

  const charger = useCallback(async () => {
    const active = controle.commencer();
    setLoading(true);
    setErreurChargement('');
    try {
      const reponse = await creneauAPI.getAll({ regime, variante, limit: 100 });
      if (active()) setCreneaux(reponse.data || []);
    } catch {
      if (active()) setErreurChargement(t('common.errorLoad'));
    } finally {
      if (active()) setLoading(false);
    }
  }, [regime, variante, t, controle]);

  useEffect(() => {
    charger();
    return () => controle.invalider();
  }, [charger, controle]);

  const jours = useMemo(() => joursAffiches(creneaux), [creneaux]);
  const listeRangs = useMemo(() => rangs(creneaux), [creneaux]);
  const cellule = useMemo(() => indexer(creneaux), [creneaux]);
  const chevauche = (creneau) => chevauchePrecedent(creneau, cellule);
  const messageErreur = (error) => toast.error(error.response?.data?.error || error.message);

  const ouvrir = (creneau = null, jour = 'lundi') => {
    setForm(
      creneau
        ? { jour_semaine: creneau.jour_semaine, heure_debut: formatHeure(creneau.heure_debut), heure_fin: formatHeure(creneau.heure_fin) }
        : { ...FORM_VIDE, jour_semaine: jour },
    );
    setDialog({ open: true, editing: creneau });
  };
  const fermer = () => setDialog({ open: false, editing: null });
  const changerForm = (champs) => setForm((f) => ({ ...f, ...champs }));

  // Le serveur refuse un chevauchement et l'explique : son message s'affiche tel quel
  const enregistrer = async (event) => {
    event.preventDefault();
    if (!finApresDebut(form)) {
      toast.error(t('ref.grids.endAfterStart'));
      return;
    }
    try {
      if (dialog.editing) await creneauAPI.update(dialog.editing.id_creneau, form);
      else await creneauAPI.create({ ...form, regime, variante });
      toast.success(t(dialog.editing ? 'ref.grids.updated' : 'ref.grids.created'));
      fermer();
      charger();
    } catch (error) {
      messageErreur(error);
    }
  };

  // Un créneau déjà utilisé par des séances est protégé (409)
  const supprimer = async () => {
    const creneau = aSupprimer;
    setASupprimer(null);
    fermer();
    try {
      await creneauAPI.delete(creneau.id_creneau);
      toast.success(t('ref.grids.deleted'));
      charger();
    } catch (error) {
      if (error.status === 409) toast.error(t('ref.grids.inUse'));
      else messageErreur(error);
    }
  };

  return {
    t,
    regime,
    setRegime,
    variante,
    setVariante,
    creneaux,
    loading,
    erreurChargement,
    charger,
    jours,
    rangs: listeRangs,
    cellule,
    chevauche,
    dialog,
    form,
    ouvrir,
    fermer,
    changerForm,
    enregistrer,
    aSupprimer,
    setASupprimer,
    supprimer,
  };
}
