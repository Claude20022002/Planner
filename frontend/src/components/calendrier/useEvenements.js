/**
 * Événements de l'année affichée (UIX-06c, lot 4) : lecture, filtre « à confirmer », fiche, fériés et confirmation de date.
 * Une ancienne lecture ne remplace jamais la dernière ; après une action, la liste se relit sans repasser par le squelette.
 */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { calendrierAPI, evenementAPI } from '../../services/api';
import { creerControleLecture } from '../gestion/controleLecture';
import { EVENEMENT_VIDE } from './constantes';
import { datesAConfirmer, donneesEvenement, formulaireEvenement } from './calendrier';

const FERME = { open: false, editing: null, form: EVENEMENT_VIDE };
const SANS_CONFIRMATION = { open: false, evenement: null, date_debut: '', date_fin: '' };

export default function useEvenements({ annee, t, toast, executer }) {
  const lecture = useMemo(creerControleLecture, []);
  const [evenements, setEvenements] = useState([]);
  const [chargementEvenements, setChargementEvenements] = useState(false);
  const [erreurEvenements, setErreurEvenements] = useState('');
  const [aConfirmerSeulement, setAConfirmerSeulement] = useState(false);
  const [evenementDialog, setEvenementDialog] = useState(FERME);
  const [confirmation, setConfirmation] = useState(SANS_CONFIRMATION);

  const debut = annee?.date_debut;
  const fin = annee?.date_fin;
  const chargerEvenements = useCallback(
    async ({ discret = false } = {}) => {
      const active = lecture.commencer();
      setErreurEvenements('');
      if (!debut) {
        setEvenements([]);
        setChargementEvenements(false);
        return;
      }
      if (!discret) setChargementEvenements(true);
      try {
        const recus = await evenementAPI.getAll({ date_from: debut, date_to: fin });
        if (active()) setEvenements(recus || []);
      } catch {
        if (active()) setErreurEvenements(t('common.errorLoad'));
      } finally {
        if (active()) setChargementEvenements(false);
      }
    },
    [debut, fin, t, lecture],
  );

  useEffect(() => {
    chargerEvenements();
    return () => lecture.invalider();
  }, [chargerEvenements, lecture]);

  const relireEvenements = () => chargerEvenements({ discret: true });

  const ajouterFeries = () =>
    executer(
      () => calendrierAPI.genererFeries(annee.id_annee),
      (resultat) => toast.success(t('ref.calendar.holidaysAdded', { count: resultat.crees, toConfirm: resultat.a_confirmer })),
      relireEvenements,
    );

  const ouvrirEvenement = (item = null) => setEvenementDialog({ open: true, editing: item, form: formulaireEvenement(item, annee) });
  const enregistrerEvenement = (event) => {
    event.preventDefault();
    const { editing, form } = evenementDialog;
    return executer(
      () => (editing ? evenementAPI.update(editing.id_evenement, donneesEvenement(form)) : evenementAPI.create(donneesEvenement(form))),
      () => {
        toast.success(t('ref.calendar.eventSaved'));
        setEvenementDialog(FERME);
      },
      relireEvenements,
    );
  };

  // Une date confirmée différente de l'estimation décale l'événement : l'avertissement le dit
  const ouvrirConfirmation = (evenement) => setConfirmation({ open: true, evenement, date_debut: evenement.date_debut, date_fin: evenement.date_fin });
  const confirmer = (event) => {
    event.preventDefault();
    const { evenement, date_debut, date_fin } = confirmation;
    return executer(
      () => evenementAPI.confirmer(evenement.id_evenement, { date_debut, date_fin }),
      (resultat) => {
        if (resultat.decale) toast.warning(t('ref.calendar.shiftedMsg'));
        else toast.success(t('ref.calendar.confirmedMsg'));
        setConfirmation(SANS_CONFIRMATION);
      },
      relireEvenements,
    );
  };

  const aConfirmer = datesAConfirmer(evenements);
  return {
    evenements,
    evenementsAffiches: aConfirmerSeulement ? aConfirmer : evenements,
    nbAConfirmer: aConfirmer.length,
    aConfirmerSeulement,
    setAConfirmerSeulement,
    chargementEvenements,
    erreurEvenements,
    chargerEvenements,
    relireEvenements,
    ajouterFeries,
    evenementDialog,
    setEvenementDialog,
    ouvrirEvenement,
    enregistrerEvenement,
    confirmation,
    setConfirmation,
    ouvrirConfirmation,
    confirmer,
  };
}
