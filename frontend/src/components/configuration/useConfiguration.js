/**
 * Charge ce que la page « Configuration » montre : les cinq réglages, la date du jour à l'école
 * (`aujourdhui`, jamais celle du navigateur) et la version courante, renvoyée comme `base` (R-4).
 */
import { useCallback, useEffect, useState } from 'react';
import { lireReglages } from './configurationApi';

export default function useConfiguration() {
    const [donnees, setDonnees] = useState(null);
    const [erreur, setErreur] = useState(false);

    /** Relit les réglages ; rend les données lues, ou null après un échec. */
    const recharger = useCallback(async () => {
        setErreur(false);
        try {
            const lues = await lireReglages();
            setDonnees(lues);
            return lues;
        } catch {
            setErreur(true);
            return null;
        }
    }, []);

    useEffect(() => {
        recharger();
    }, [recharger]);

    return { donnees, erreur, chargement: !donnees && !erreur, recharger };
}
