import { useCallback, useEffect, useRef, useState } from 'react';
import useLiveRefresh from '../../hooks/useLiveRefresh';

/**
 * Chargement d'un bloc du tableau de bord (UIX-11) : chaque bloc se charge et échoue seul, avec son
 * propre « Réessayer ». Une route en panne ne vide plus la page.
 *
 * `charger` est une fonction stable (useCallback) qui rend une promesse des données du bloc. Le bloc
 * se recharge en silence comme le reste de la page (useLiveRefresh) : un échec silencieux garde les
 * données déjà affichées, et ne montre l'erreur que si le bloc n'a encore rien.
 *
 * @returns {{ donnees: any, chargement: boolean, erreur: boolean, recharger: () => void }}
 */
export default function useBloc(charger) {
  const [donnees, setDonnees] = useState(null);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(false);
  // Seule la dernière demande compte : une réponse lente d'avant ne remplace pas une plus récente
  const demande = useRef(0);
  const aDesDonnees = useRef(false);

  const lancer = useCallback(
    async ({ silencieux = false } = {}) => {
      const numero = ++demande.current;
      if (!silencieux) {
        setChargement(true);
        setErreur(false);
      }
      try {
        const resultat = await charger();
        if (numero !== demande.current) return;
        aDesDonnees.current = true;
        setDonnees(resultat);
        setErreur(false);
      } catch {
        if (numero !== demande.current) return;
        if (!silencieux || !aDesDonnees.current) setErreur(true);
      } finally {
        if (numero === demande.current) setChargement(false);
      }
    },
    [charger]
  );

  useEffect(() => {
    lancer();
    // Une demande encore en route à la fermeture de la page n'écrit plus rien
    return () => {
      demande.current += 1;
    };
  }, [lancer]);

  useLiveRefresh(() => lancer({ silencieux: true }));

  const recharger = useCallback(() => lancer(), [lancer]);
  return { donnees, chargement, erreur, recharger };
}
