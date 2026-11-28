/**
 * L'aperçu du brouillon et son application (ADM-02b, réponses 3, 7, 8 et 13) : l'aperçu est demandé à
 * l'ouverture et à chaque date d'effet valide ; « Appliquer » envoie le brouillon avec la base lue.
 * Un 409 garde le brouillon : « Recharger » relit la base et redemande l'aperçu.
 * Les refus de l'aperçu valent pour le brouillon qui l'a produit : un changement les fait tomber.
 */
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from '../../contexts/ToastContext';
import { appliquerBrouillon, demanderApercu } from './configurationApi';
import { corpsDe } from './brouillon';
import { dateLisible } from './historique';
import { refusDeLErreur } from './refus';

const JOUR = /^\d{4}-\d{2}-\d{2}$/;

export default function useApercu({ brouillon, configuration, apresApplication }) {
    const { t, i18n } = useTranslation();
    const toast = useToast();
    const [ouvert, setOuvert] = useState(false);
    const [dateEffet, setDateEffet] = useState('');
    const [libelle, setLibelle] = useState('');
    // resultat : la réponse de l'aperçu, et le brouillon qui l'a produite
    const [resultat, setResultat] = useState(null);
    const [refus, setRefus] = useState(null);
    const [etat, setEtat] = useState('repos');
    const donnees = configuration.donnees;

    const demander = useCallback(
        async (date, base) => {
            setEtat('calcul');
            setRefus(null);
            try {
                setResultat({ pour: brouillon, ...(await demanderApercu(corpsDe(brouillon, { date_effet: date, base }))) });
            } catch (erreur) {
                setResultat(null);
                setRefus(refusDeLErreur(erreur));
            } finally {
                setEtat('repos');
            }
        },
        [brouillon]
    );

    const ouvrir = () => {
        setDateEffet(donnees.aujourdhui);
        setLibelle('');
        setOuvert(true);
        demander(donnees.aujourdhui, donnees.version_courante);
    };

    const changerDate = (date) => {
        setDateEffet(date);
        if (JOUR.test(date)) demander(date, donnees.version_courante);
    };

    const appliquer = async () => {
        setEtat('envoi');
        try {
            await appliquerBrouillon(corpsDe(brouillon, { date_effet: dateEffet, base: donnees.version_courante, libelle }));
            setOuvert(false);
            setResultat(null);
            toast.success(dateEffet > donnees.aujourdhui ? t('configuration.apercu.prevu', { date: dateLisible(dateEffet, i18n.language) }) : t('configuration.apercu.applique'));
            await apresApplication();
        } catch (erreur) {
            const r = refusDeLErreur(erreur);
            // Conflits et refus se montrent comme ceux de l'aperçu : sous leur ligne, « Appliquer » inactif
            if (r.code === 'VERSION_DEPASSEE') setResultat((p) => ({ ...(p ?? { pour: brouillon, changements: [] }), conflits: r.violations, peut_appliquer: false }));
            else if (r.code === 'REGLAGES_REFUSES') setResultat((p) => ({ ...(p ?? { pour: brouillon, changements: [] }), violations: r.violations, peut_appliquer: false }));
            else setRefus(r);
        } finally {
            setEtat('repos');
        }
    };

    const recharger = async () => {
        const lues = await configuration.recharger();
        if (lues) demander(dateEffet, lues.version_courante);
    };

    const actuel = resultat?.pour === brouillon ? resultat : null;
    // Refus du serveur par réglage, pour les montrer aussi sous le champ de l'onglet
    const refusParCle = useMemo(() => new Map((actuel?.violations ?? []).filter((v) => v.cle).map((v) => [v.cle, v])), [actuel]);

    return {
        ouvert,
        fermer: () => setOuvert(false),
        ouvrir,
        dateEffet,
        changerDate,
        libelle,
        setLibelle,
        resultat: actuel,
        refus,
        etat,
        aujourdhui: donnees?.aujourdhui,
        peutAppliquer: Boolean(actuel?.peut_appliquer) && etat === 'repos' && !refus,
        appliquer,
        recharger,
        refusParCle,
    };
}
