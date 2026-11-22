/**
 * Chargement et actions du calendrier (UIX-06c, lot 4) : années, semestres et cibles des événements ; les événements
 * de l'année affichée viennent de useEvenements. Une ancienne lecture ne remplace jamais la dernière ; un échec se
 * distingue d'une absence de données.
 */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { calendrierAPI, campusAPI, evenementAPI, filiereAPI, groupeAPI } from '../../services/api';
import { useToast } from '../../contexts/ToastContext';
import { localeEcran } from '../../utils/dates';
import { creerControleLecture } from '../gestion/controleLecture';
import { ANNEE_VIDE, PERIODE_VIDE } from './constantes';
import { anneeChoisie, donneesPeriode, formulaireAnnee, formulairePeriode } from './calendrier';
import useEvenements from './useEvenements';

const FERME = (form) => ({ open: false, editing: null, form });
const liste = (reponse) => reponse?.data || reponse || [];

export default function useCalendrier() {
  const { t, i18n } = useTranslation();
  const toast = useToast();
  const lecture = useMemo(creerControleLecture, []);
  const [annees, setAnnees] = useState([]);
  const [idAnnee, setIdAnnee] = useState(null);
  const [cibles, setCibles] = useState({ campus: [], filieres: [], groupes: [] });
  const [loading, setLoading] = useState(true);
  const [erreurChargement, setErreurChargement] = useState('');
  const [anneeDialog, setAnneeDialog] = useState(FERME(ANNEE_VIDE));
  const [periodeDialog, setPeriodeDialog] = useState(FERME(PERIODE_VIDE));
  const [aSupprimer, setASupprimer] = useState(null);

  const annee = useMemo(() => annees.find((a) => a.id_annee === idAnnee) || null, [annees, idAnnee]);
  const recevoirAnnees = (recues) => {
    setAnnees(recues);
    setIdAnnee((courante) => anneeChoisie(recues, courante));
  };

  const charger = useCallback(async () => {
    const active = lecture.commencer();
    setLoading(true);
    setErreurChargement('');
    try {
      const [recues, campus, filieres, groupes] = await Promise.all([calendrierAPI.getAnnees(), campusAPI.getAll(), filiereAPI.getTous(), groupeAPI.getTous()]);
      if (!active()) return;
      setAnnees(recues || []);
      setIdAnnee((courante) => anneeChoisie(recues || [], courante));
      setCibles({ campus: liste(campus), filieres: liste(filieres), groupes: liste(groupes) });
    } catch {
      if (active()) setErreurChargement(t('common.errorLoad'));
    } finally {
      if (active()) setLoading(false);
    }
  }, [t, lecture]);

  useEffect(() => {
    charger();
    return () => lecture.invalider();
  }, [charger, lecture]);

  const formatDate = useCallback(
    (date) => new Intl.DateTimeFormat(localeEcran(i18n.language), { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(`${date}T12:00:00`)),
    [i18n.language],
  );
  const plage = (de, a) => (de === a ? formatDate(de) : `${formatDate(de)} → ${formatDate(a)}`);

  /** Envoie, annonce le succès, puis relit ; une erreur du serveur s'affiche telle quelle. */
  const executer = async (envoi, succes, relire) => {
    try {
      succes(await envoi());
      await relire();
    } catch (error) {
      toast.error(error.response?.data?.error || error.response?.data?.errors?.[0]?.message || error.message);
    }
  };
  const evenements = useEvenements({ annee, t, toast, executer });
  const relireAnnees = async () => recevoirAnnees(await calendrierAPI.getAnnees());

  const ouvrirAnnee = (item = null) => setAnneeDialog({ open: true, editing: item, form: formulaireAnnee(item) });
  const enregistrerAnnee = (event) => {
    event.preventDefault();
    const { editing, form } = anneeDialog;
    return executer(
      async () => {
        if (editing) return calendrierAPI.updateAnnee(editing.id_annee, form);
        const { annee: creee } = await calendrierAPI.createAnnee(form);
        setIdAnnee(creee.id_annee);
      },
      () => {
        toast.success(t('ref.calendar.yearSaved'));
        setAnneeDialog(FERME(ANNEE_VIDE));
      },
      relireAnnees,
    );
  };

  const ouvrirPeriode = (item = null) => setPeriodeDialog({ open: true, editing: item, form: formulairePeriode(item, annee) });
  const enregistrerPeriode = (event) => {
    event.preventDefault();
    const { editing, form } = periodeDialog;
    return executer(
      () =>
        editing ? calendrierAPI.updatePeriode(editing.id_periode, donneesPeriode(form)) : calendrierAPI.createPeriode(annee.id_annee, donneesPeriode(form)),
      () => {
        toast.success(t('ref.calendar.semesterSaved'));
        setPeriodeDialog(FERME(PERIODE_VIDE));
      },
      relireAnnees,
    );
  };

  // Une seule confirmation de suppression pour l'année, le semestre et l'événement
  const supprimer = () => {
    const { type, item } = aSupprimer;
    setASupprimer(null);
    const envoi = {
      annee: () => calendrierAPI.deleteAnnee(item.id_annee),
      periode: () => calendrierAPI.deletePeriode(item.id_periode),
      evenement: () => evenementAPI.delete(item.id_evenement),
    }[type];
    const relireTout = async () => {
      await relireAnnees();
      evenements.relireEvenements();
    };
    return executer(envoi, () => toast.success(t('ref.calendar.deleted')), relireTout);
  };

  return {
    ...evenements,
    t,
    annees,
    annee,
    idAnnee,
    setIdAnnee,
    cibles,
    loading,
    erreurChargement,
    charger,
    plage,
    anneeDialog,
    setAnneeDialog,
    ouvrirAnnee,
    enregistrerAnnee,
    periodeDialog,
    setPeriodeDialog,
    ouvrirPeriode,
    enregistrerPeriode,
    aSupprimer,
    setASupprimer,
    supprimer,
  };
}
