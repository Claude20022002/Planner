/** Chargement et actions filières existants ; une ancienne lecture ne remplace pas la dernière. */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { filiereAPI } from '../../services/api';
import { useToast } from '../../contexts/ToastContext';
import { fetchAll } from '../../utils/fetchAll';
import { creerControleLecture } from '../gestion/controleLecture';
import { FILIERE_VIDE, entierOuNull } from './fiche';
export default function useFilieres() {
  const { t } = useTranslation();
  const toast = useToast();
  const [filieres, setFilieres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erreurChargement, setErreurChargement] = useState('');
  const controle = useMemo(creerControleLecture, []);
  const [search, setSearch] = useState('');
  const [dialog, setDialog] = useState({ open: false, editing: null, form: FILIERE_VIDE });
  const [aSupprimer, setASupprimer] = useState(null);
  const [importOuvert, setImportOuvert] = useState(false);
  const [idResponsables, setIdResponsables] = useState(null);

  const charger = useCallback(async () => {
    const active = controle.commencer();
    setLoading(true);
    setErreurChargement('');
    try {
      const liste = await fetchAll(filiereAPI.getAll);
      if (active()) setFilieres(liste);
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

  const affichees = useMemo(() => {
    const terme = search.trim().toLowerCase();
    return filieres.filter(
      (f) => !terme || [f.code_filiere, f.nom_filiere, f.partenaire].some((v) => v?.toLowerCase().includes(terme)),
    );
  }, [filieres, search]);

  const erreur = (error) =>
    toast.error(error.response?.data?.error || error.response?.data?.errors?.[0]?.message || error.message);

  const ouvrir = (filiere = null) =>
    setDialog({
      open: true,
      editing: filiere,
      form: filiere ? Object.fromEntries(Object.keys(FILIERE_VIDE).map((cle) => [cle, filiere[cle] ?? ''])) : FILIERE_VIDE,
    });

  const champ = (nom) => (e) => setDialog((d) => ({ ...d, form: { ...d.form, [nom]: e.target.value } }));

  const enregistrer = async (event) => {
    event.preventDefault();
    const f = dialog.form;
    const data = {
      code_filiere: f.code_filiere.trim(),
      nom_filiere: f.nom_filiere.trim(),
      description: f.description?.trim() || null,
      ecole: f.ecole,
      cycle: f.cycle || null,
      intitule_cycle: f.intitule_cycle?.trim() || null,
      premiere_annee_cycle: entierOuNull(f.premiere_annee_cycle),
      regime: f.regime,
      partenaire: f.partenaire?.trim() || null,
      annees_a_hestim: entierOuNull(f.annees_a_hestim),
    };
    try {
      if (dialog.editing) await filiereAPI.update(dialog.editing.id_filiere, data);
      else await filiereAPI.create(data);
      toast.success(t('ref.programs.saved'));
      setDialog({ open: false, editing: null, form: FILIERE_VIDE });
      charger();
    } catch (error) {
      erreur(error);
    }
  };

  const supprimer = async () => {
    const filiere = aSupprimer;
    setASupprimer(null);
    try {
      await filiereAPI.delete(filiere.id_filiere);
      toast.success(t('ref.programs.deleted'));
      charger();
    } catch (error) {
      erreur(error);
    }
  };

  const importer = async (lignes) => {
    const erreurs = [];
    let reussies = 0;
    for (const [index, ligne] of lignes.entries()) {
      try {
        await filiereAPI.create({
          code_filiere: String(ligne.code_filiere || '').trim(),
          nom_filiere: String(ligne.nom_filiere || '').trim(),
          description: ligne.description || null,
          ecole: ligne.ecole || 'engineering',
          cycle: ligne.cycle || null,
          intitule_cycle: ligne.intitule_cycle || null,
          premiere_annee_cycle: entierOuNull(ligne.premiere_annee_cycle),
          regime: ligne.regime || 'initiale',
          partenaire: ligne.partenaire || null,
        });
        reussies += 1;
      } catch (error) {
        erreurs.push({
          ligne: index + 2,
          libelle: ligne.code_filiere,
          message: error.response?.data?.error || error.response?.data?.errors?.[0]?.message || error.message,
        });
      }
    }
    if (reussies) charger();
    return { reussies, erreurs };
  };

  return {
    t,
    filieres,
    loading,
    erreurChargement,
    charger,
    search,
    setSearch,
    affichees,
    dialog,
    setDialog,
    aSupprimer,
    setASupprimer,
    importOuvert,
    setImportOuvert,
    idResponsables,
    setIdResponsables,
    ouvrir,
    champ,
    enregistrer,
    supprimer,
    importer,
  };
}
