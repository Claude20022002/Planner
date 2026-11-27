import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';
import { lireDirect, rejoindreDirect, repondreDirect } from '../api/donnees';
import { RELECTURE_MS, ordreDeDepart, secondesRestantes } from './direct';

/**
 * Partie de quiz en direct vue par le joueur (lot SC-1c) : la rejoindre, relire son état chaque
 * seconde tant que l'application est au premier plan, compter le temps d'après l'heure du serveur
 * et envoyer la réponse. Les messages génériques viennent de l'écran traduit.
 */
export default function useDirect(id, messageErreur, messageReseau) {
  const [vue, setVue] = useState(null);
  const [erreur, setErreur] = useState(null);
  const [termine, setTermine] = useState(false);
  const [valeur, setValeur] = useState(null);
  const [envoi, setEnvoi] = useState(false);
  const [verification, setVerification] = useState(false);
  const [lectureEnEchec, setLectureEnEchec] = useState(false);
  const [maintenant, setMaintenant] = useState(() => Date.now());
  const version = useRef(undefined);
  const index = useRef(null);
  // Écart entre l'heure du serveur et celle du téléphone ; mis à jour seulement s'il bouge vraiment
  const [decalage, setDecalage] = useState(0);
  const enCours = useRef(false);
  const envoiEnCours = useRef(false);
  const relireComplet = useRef(false);
  const refus = useRef(false);
  const numeroEnvoi = useRef(0);
  const actif = useRef(true);

  const recevoir = (v) => {
    if (v.maintenant_ms) {
      const ecart = v.maintenant_ms - Date.now();
      setDecalage((d) => (Math.abs(d - ecart) > 250 ? ecart : d));
    }
    if (v.inchange) return;
    version.current = v.version;
    // Nouvelle question : la réponse repart de zéro (une remise en ordre, d'un ordre mélangé)
    if (index.current !== v.index) setValeur(v.question?.type === 'ordre' ? ordreDeDepart(v.question.elements) : null);
    index.current = v.index;
    setVue(v);
  };

  const lire = useCallback(async () => {
    // Une lecture lente ne s'empile pas sur la suivante
    if (enCours.current || envoiEnCours.current || refus.current) return;
    enCours.current = true;
    const numero = numeroEnvoi.current;
    try {
      const depuis = relireComplet.current ? undefined : version.current;
      const v = version.current === undefined ? await rejoindreDirect(id) : await lireDirect(id, depuis);
      if (!actif.current || numero !== numeroEnvoi.current) return;
      recevoir(v);
      if (!v.inchange) {
        relireComplet.current = false;
        setVerification(false);
      }
      setLectureEnEchec(false);
      setErreur(null);
    } catch (e) {
      if (!actif.current || numero !== numeroEnvoi.current) return;
      const code = e?.code;
      setLectureEnEchec(true);
      if (code === 'PAS_REJOINT') version.current = undefined;
      else if (code === 'DIRECT_TERMINE') setTermine(true);
      else {
        refus.current = e?.statut === 403 || e?.statut === 404;
        setErreur(code === 'RESEAU' ? messageReseau : e?.message || messageErreur);
      }
    } finally {
      enCours.current = false;
    }
  }, [id, messageErreur, messageReseau]);

  const fini = termine || vue?.etape === 'termine';
  useEffect(() => {
    actif.current = true;
    if (fini) return undefined;
    if (AppState.currentState !== 'background' && AppState.currentState !== 'inactive') lire();
    const reprendre = (etat) => { if (etat === 'active') lire(); };
    const abonnement = AppState.addEventListener('change', reprendre);
    const minuterie = setInterval(() => reprendre(AppState.currentState), RELECTURE_MS);
    return () => {
      actif.current = false;
      abonnement.remove();
      clearInterval(minuterie);
    };
  }, [lire, fini]);

  // Le chrono avance entre deux relectures
  const enQuestion = vue?.etape === 'question';
  useEffect(() => {
    if (!enQuestion) return undefined;
    const minuterie = setInterval(() => setMaintenant(Date.now()), 250);
    return () => clearInterval(minuterie);
  }, [enQuestion]);

  const restant = secondesRestantes(vue, decalage, maintenant);
  const envoyer = async (reponse) => {
    if (!enQuestion || vue.repondu || restant === 0 || envoiEnCours.current || relireComplet.current || lectureEnEchec) return;
    envoiEnCours.current = true;
    numeroEnvoi.current += 1;
    setEnvoi(true);
    try {
      const accuse = await repondreDirect(id, vue.index, reponse);
      if (!actif.current) return;
      if (!accuse?.envoyee) throw new Error(messageErreur);
      setVue((v) => ({ ...v, repondu: true }));
    } catch (e) {
      if (!actif.current) return;
      // La version du serveur peut rester identique après l'enregistrement de la réponse.
      relireComplet.current = true;
      setVerification(true);
      setErreur(e?.code === 'RESEAU' ? messageReseau : e?.message || messageErreur);
    } finally {
      envoiEnCours.current = false;
      if (actif.current) {
        setEnvoi(false);
        if (relireComplet.current && AppState.currentState === 'active') lire();
      }
    }
  };

  return { vue, restant, valeur, changer: setValeur, envoyer, envoi, verification, lectureEnEchec, erreur, termine };
}
