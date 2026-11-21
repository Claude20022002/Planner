/** Charge et modifie la maquette existante, sans modifier les contrats d’API. */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { coursAPI, enseignantAPI, filiereAPI, salleAPI } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { filieresGerables } from '../../utils/droits';
import { fetchAll } from '../../utils/fetchAll';
import { periodeDe } from './constantes';
import useActionsModules from './useActionsModules';
import { creerControleLecture } from '../gestion/controleLecture';
export default function useModules() {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const [modules, setModules] = useState([]);
  const [filieres, setFilieres] = useState([]);
  const [enseignants, setEnseignants] = useState([]);
  const [typesSalle, setTypesSalle] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erreurChargement, setErreurChargement] = useState('');
  const controle = useMemo(creerControleLecture, []);
  const [filiere, setFiliere] = useState('toutes');
  const [periode, setPeriode] = useState('toutes');
  const [search, setSearch] = useState('');
  const [ouverts, setOuverts] = useState(() => new Set());
  const nombre = useMemo(
    () => new Intl.NumberFormat(i18n.language === 'en' ? 'en-GB' : 'fr-FR', { maximumFractionDigits: 1 }),
    [i18n.language],
  );

  const charger = useCallback(async () => {
    const active = controle.commencer();
    setLoading(true);
    setErreurChargement('');
    try {
      const [liste, listeFilieres, listeEnseignants, referentiel] = await Promise.all([
        fetchAll(coursAPI.getAll),
        fetchAll(filiereAPI.getAll),
        fetchAll(enseignantAPI.getAll),
        salleAPI.getReferentiel(),
      ]);
      if (!active()) return;
      setModules(liste);
      setFilieres(filieresGerables(listeFilieres, user));
      setEnseignants(listeEnseignants);
      setTypesSalle(referentiel.types_salle || []);
    } catch {
      if (active()) setErreurChargement(t('common.errorLoad'));
    } finally {
      if (active()) setLoading(false);
    }
  }, [t, user, controle]);

  useEffect(() => {
    charger();
    return () => controle.invalider();
  }, [charger, controle]);

  const idsGerables = useMemo(() => new Set(filieres.map((f) => f.id_filiere)), [filieres]);

  const modulesGerables = useMemo(() => modules.filter((m) => idsGerables.has(m.id_filiere)), [modules, idsGerables]);
  const modulesAffiches = useMemo(() => {
    const terme = search.trim().toLowerCase();
    return modulesGerables
      .filter((m) => filiere === 'toutes' || m.id_filiere === filiere)
      .filter((m) => periode === 'toutes' || periodeDe(m.semestre) === periode)
      .filter((m) => !terme || [m.code_cours, m.nom_cours].some((v) => v?.toLowerCase().includes(terme)))
      .sort(
        (a, b) =>
          (a.filiere?.code_filiere || '').localeCompare(b.filiere?.code_filiere || '') ||
          a.semestre.localeCompare(b.semestre, 'fr', { numeric: true }) ||
          a.code_cours.localeCompare(b.code_cours),
      );
  }, [modulesGerables, filiere, periode, search]);

  const basculer = (id) =>
    setOuverts((s) => {
      const suivant = new Set(s);
      if (suivant.has(id)) suivant.delete(id);
      else suivant.add(id);
      return suivant;
    });

  const actions = useActionsModules({ t, filiere, filieres, charger, setOuverts });

  const nomEnseignant = (id) => {
    const e = enseignants.find((x) => x.id_user === id);
    return e ? `${e.user?.prenom || ''} ${e.user?.nom || ''}`.trim() : '-';
  };

  return {
    t,
    modulesGerables,
    filieres,
    enseignants,
    typesSalle,
    loading,
    erreurChargement,
    charger,
    filiere,
    setFiliere,
    periode,
    setPeriode,
    search,
    setSearch,
    ouverts,
    nombre,
    modulesAffiches,
    basculer,
    nomEnseignant,
    ...actions,
  };
}
