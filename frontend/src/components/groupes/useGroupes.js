/** Charge les filtres et l’arbre des groupes, avec garde des réponses périmées. */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { filiereAPI, groupeAPI } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import useAnneeChoisie from '../../hooks/useAnneeChoisie';
import { TOUTES, anneeEnCours } from '../../utils/annees';
import { filieresGerables } from '../../utils/droits';
import { fetchAll } from '../../utils/fetchAll';
import { aplatir, anneeScolaireCourante } from './fiche';
import { creerControleLecture } from '../gestion/controleLecture';
import useActionsGroupes from './useActionsGroupes';

export default function useGroupes() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { annees, valeur: valeurAnnee, annee, filtre, choisir: appliquerAnnee } = useAnneeChoisie();
  const [filieres, setFilieres] = useState([]);
  const [filiere, setFiliere] = useState('');
  const [arbre, setArbre] = useState([]);
  const [sansAnnee, setSansAnnee] = useState(0);
  const [filtreVide, setFiltreVide] = useState(false);
  const [loading, setLoading] = useState(true);
  const [initialisation, setInitialisation] = useState(true);
  const [erreurChargement, setErreurChargement] = useState('');
  const controle = useMemo(creerControleLecture, []);
  const options = useMemo(creerControleLecture, []);
  const [lecture, setLecture] = useState(0);
  const relire = () => setLecture((n) => n + 1);
  const anneeScolaire = annee?.libelle ?? anneeEnCours(annees)?.libelle ?? anneeScolaireCourante();

  const chargerFilieres = useCallback(async () => {
    const active = options.commencer();
    setInitialisation(true);
    setErreurChargement('');
    try {
      const liste = filieresGerables(await fetchAll(filiereAPI.getAll), user);
      if (!active()) return;
      setFilieres(liste);
      setFiliere((id) => (liste.some((f) => f.id_filiere === id) ? id : (liste[0]?.id_filiere ?? '')));
    } catch {
      if (active()) setErreurChargement(t('common.errorLoad'));
    } finally {
      if (active()) setInitialisation(false);
    }
  }, [user, t, options]);
  useEffect(() => {
    chargerFilieres();
    return () => options.invalider();
  }, [chargerFilieres, options]);

  const chargerArbre = useCallback(async () => {
    const active = controle.commencer();
    if (!filiere || valeurAnnee === null) {
      setLoading(Boolean(filiere));
      return;
    }
    setLoading(true);
    setErreurChargement('');
    try {
      const [groupes, tous] = await Promise.all([
        groupeAPI.getArbre({ id_filiere: filiere, ...filtre }),
        valeurAnnee === TOUTES ? null : fetchAll(groupeAPI.getAll, { id_filiere: filiere }),
      ]);
      if (!active()) return;
      setArbre(groupes);
      setFiltreVide(Boolean(tous?.length) && !groupes.length);
      setSansAnnee(tous ? tous.filter((g) => g.id_annee == null).length : 0);
    } catch {
      if (active()) setErreurChargement(t('common.errorLoad'));
    } finally {
      if (active()) setLoading(false);
    }
  }, [filiere, valeurAnnee, filtre, t, controle]);

  useEffect(() => {
    chargerArbre();
    return () => controle.invalider();
  }, [chargerArbre, controle, lecture]);

  const changerFiltre = (appliquer, actuel) => (suivant) => {
    if (suivant === actuel) return;
    controle.invalider();
    setArbre([]);
    setSansAnnee(0);
    setLoading(true);
    appliquer(suivant);
  };

  const actions = useActionsGroupes({ t, filiere, filieres, filtre, anneeScolaire, relire });
  const lignes = useMemo(() => aplatir(arbre), [arbre]);
  // Effectif d'un groupe face à la somme de ses sous-groupes : signale l'écart, sans bloquer
  const ecartEffectif = (groupe) => {
    if (!groupe.sous_groupes?.length) return null;
    const somme = groupe.sous_groupes.reduce((total, g) => total + (Number(g.effectif) || 0), 0);
    return somme === Number(groupe.effectif) ? null : somme;
  };

  const filiereCourante = filieres.find((f) => f.id_filiere === filiere);

  return {
    chargerFilieres,
    t,
    user,
    annees,
    valeurAnnee,
    choisirAnnee: changerFiltre(appliquerAnnee, valeurAnnee),
    anneeScolaire,
    filtre,
    filieres,
    filiere,
    setFiliere: changerFiltre(setFiliere, filiere),
    lignes,
    filiereCourante,
    loading,
    initialisation,
    erreurChargement,
    chargerArbre,
    sansAnnee,
    filtreVide,
    ...actions,
    ecartEffectif,
  };
}
