/** Chargement et actions des salles (liste, fiche, suppression, import, export) ; une ancienne lecture ne remplace pas la dernière. */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { campusAPI, parametrePlanningAPI, salleAPI } from '../../services/api';
import { useToast } from '../../contexts/ToastContext';
import { parseFile } from '../../utils/fileImport';
import { exportToExcelLazy } from '../../utils/lazyExports';
import { COLS_SALLES } from '../../utils/exportColumns';
import { creerControleLecture } from '../gestion/controleLecture';
import { donneesSalle, erreursSalle, filtrerSalles, formulaireDepuisSalle, SALLE_VIDE } from './fiche';

const IMPORT_FERME = { open: false, loading: false, erreurs: [] };

export default function useSalles() {
  const { t } = useTranslation();
  const toast = useToast();
  const controle = useMemo(creerControleLecture, []);
  const [salles, setSalles] = useState([]);
  const [campus, setCampus] = useState([]);
  const [types, setTypes] = useState([]);
  const [ratioExamen, setRatioExamen] = useState(0.5);
  const [loading, setLoading] = useState(true);
  const [erreurChargement, setErreurChargement] = useState('');
  const [campusFiltre, setCampusFiltre] = useState('tous');
  const [search, setSearch] = useState('');
  const [dialog, setDialog] = useState({ open: false, editing: null });
  const [form, setForm] = useState(SALLE_VIDE);
  const [formErrors, setFormErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [aSupprimer, setASupprimer] = useState(null);
  const [importState, setImportState] = useState(IMPORT_FERME);

  const charger = useCallback(async () => {
    const active = controle.commencer();
    setLoading(true);
    setErreurChargement('');
    try {
      const [listeSalles, listeCampus, referentiel, parametres] = await Promise.all([
        salleAPI.getTous(),
        campusAPI.getAll(),
        salleAPI.getReferentiel(),
        parametrePlanningAPI.getAll().catch(() => null),
      ]);
      if (!active()) return;
      setSalles(listeSalles);
      setCampus(listeCampus || []);
      setTypes(referentiel.types_salle || []);
      if (parametres?.ratio_capacite_examen) setRatioExamen(parametres.ratio_capacite_examen.valeur);
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

  const affichees = useMemo(() => filtrerSalles(salles, campusFiltre, search), [salles, campusFiltre, search]);
  const messageErreur = (error) => toast.error(error.response?.data?.error || error.message);

  const ouvrir = (salle = null) => {
    setFormErrors({});
    setForm(formulaireDepuisSalle(salle, campus[0]?.id_campus ?? ''));
    setDialog({ open: true, editing: salle });
  };
  const fermer = () => setDialog({ open: false, editing: null });
  const changerForm = (champs) => setForm((f) => ({ ...f, ...champs }));
  const champ = (nom) => (event) => changerForm({ [nom]: event.target.value });

  const enregistrer = async (event) => {
    event.preventDefault();
    const erreurs = Object.fromEntries(Object.entries(erreursSalle(form)).map(([nom, cle]) => [nom, t('ref.rooms.' + cle)]));
    setFormErrors(erreurs);
    if (Object.keys(erreurs).length) return;
    setSaving(true);
    try {
      if (dialog.editing) await salleAPI.update(dialog.editing.id_salle, donneesSalle(form));
      else await salleAPI.create(donneesSalle(form));
      toast.success(t(dialog.editing ? 'ref.rooms.updated' : 'ref.rooms.created'));
      fermer();
      charger();
    } catch (error) {
      messageErreur(error);
    } finally {
      setSaving(false);
    }
  };

  const supprimer = async () => {
    const salle = aSupprimer;
    setASupprimer(null);
    try {
      await salleAPI.delete(salle.id_salle);
      toast.success(t('ref.rooms.deleted'));
      charger();
    } catch (error) {
      messageErreur(error);
    }
  };

  // Import tout ou rien : le serveur renvoie chaque ligne refusée, rien n'est enregistré
  const importer = async (fichier) => {
    setImportState((s) => ({ ...s, loading: true, erreurs: [] }));
    try {
      const resultat = await salleAPI.importBulk(await parseFile(fichier));
      toast.success(t('ref.rooms.importDone', { crees: resultat.crees, maj: resultat.mises_a_jour }));
      setImportState(IMPORT_FERME);
      charger();
    } catch (error) {
      const erreurs = error.response?.data?.erreurs;
      setImportState((s) => ({ ...s, loading: false, erreurs: erreurs || [] }));
      if (!erreurs) messageErreur(error);
    }
  };

  return {
    t,
    salles,
    campus,
    types,
    ratioExamen,
    loading,
    erreurChargement,
    charger,
    campusFiltre,
    setCampusFiltre,
    search,
    setSearch,
    affichees,
    dialog,
    form,
    formErrors,
    saving,
    ouvrir,
    fermer,
    champ,
    changerForm,
    enregistrer,
    aSupprimer,
    setASupprimer,
    supprimer,
    importState,
    ouvrirImport: () => setImportState({ ...IMPORT_FERME, open: true }),
    fermerImport: () => setImportState(IMPORT_FERME),
    importer,
    exporter: () => exportToExcelLazy(affichees, COLS_SALLES, 'Salles', 'Salles'),
  };
}
