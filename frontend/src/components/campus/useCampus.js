/** Chargement et actions des campus et des temps de trajet ; une ancienne lecture ne remplace pas la dernière. */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { campusAPI } from '../../services/api';
import { useToast } from '../../contexts/ToastContext';
import { creerControleLecture } from '../gestion/controleLecture';
import { CAMPUS_VIDE, donneesCampus, dureeValide, formulaireDepuisCampus, minutesEnregistrees, minutesSaisies, pairesDe } from './fiche';

export default function useCampus() {
  const { t } = useTranslation();
  const toast = useToast();
  const controle = useMemo(creerControleLecture, []);
  const [campus, setCampus] = useState([]);
  const [trajets, setTrajets] = useState({ defaut_minutes: 30, trajets: [] });
  const [minutes, setMinutes] = useState({});
  const [loading, setLoading] = useState(true);
  const [erreurChargement, setErreurChargement] = useState('');
  const [dialog, setDialog] = useState({ open: false, editing: null });
  const [form, setForm] = useState(CAMPUS_VIDE);
  const [aSupprimer, setASupprimer] = useState(null);

  const charger = useCallback(async () => {
    const active = controle.commencer();
    setLoading(true);
    setErreurChargement('');
    try {
      const [listeCampus, listeTrajets] = await Promise.all([campusAPI.getAll(), campusAPI.getTrajets()]);
      if (!active()) return;
      setCampus(listeCampus || []);
      setTrajets(listeTrajets);
      setMinutes(minutesSaisies(listeTrajets.trajets));
    } catch {
      if (active()) setErreurChargement(t('common.errorLoad'));
    } finally {
      if (active()) setLoading(false);
    }
  }, [t, controle]);

  useEffect(() => {
    charger();
    return () => controle.invalider();
  }, [charger, controle]);

  const paires = useMemo(() => pairesDe(campus), [campus]);
  const enregistres = useMemo(() => minutesEnregistrees(trajets.trajets), [trajets]);
  const messageErreur = (error) => toast.error(error.response?.data?.error || error.message);

  const ouvrir = (item = null) => {
    setForm(formulaireDepuisCampus(item));
    setDialog({ open: true, editing: item });
  };
  const fermer = () => setDialog({ open: false, editing: null });
  const changerForm = (champs) => setForm((f) => ({ ...f, ...champs }));

  const enregistrer = async (event) => {
    event.preventDefault();
    try {
      if (dialog.editing) await campusAPI.update(dialog.editing.id_campus, donneesCampus(form));
      else await campusAPI.create(donneesCampus(form));
      toast.success(t(dialog.editing ? 'ref.campus.updated' : 'ref.campus.created'));
      fermer();
      charger();
    } catch (error) {
      messageErreur(error);
    }
  };

  // Le serveur refuse de supprimer un campus qui a encore des salles : son message s'affiche
  const supprimer = async () => {
    const item = aSupprimer;
    setASupprimer(null);
    try {
      await campusAPI.delete(item.id_campus);
      toast.success(t('ref.campus.deleted'));
      charger();
    } catch (error) {
      messageErreur(error);
    }
  };

  const enregistrerTrajet = async ({ a, b, cle }) => {
    const valeur = Number(minutes[cle]);
    if (!dureeValide(valeur)) {
      toast.error(t('ref.campus.minutesInvalid'));
      return;
    }
    try {
      await campusAPI.saveTrajet({ id_campus_a: a.id_campus, id_campus_b: b.id_campus, minutes: valeur });
      toast.success(t('ref.campus.travelSaved'));
      charger();
    } catch (error) {
      messageErreur(error);
    }
  };

  return {
    t,
    campus,
    loading,
    erreurChargement,
    charger,
    paires,
    minutes,
    enregistres,
    defautMinutes: trajets.defaut_minutes,
    changerMinutes: (cle, valeur) => setMinutes((m) => ({ ...m, [cle]: valeur })),
    enregistrerTrajet,
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
