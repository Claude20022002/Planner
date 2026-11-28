/**
 * L'onglet « Historique » (ADM-02b, R-3) : la liste se charge à la première ouverture de l'onglet, le
 * détail à la demande ; annuler et abandonner passent par une confirmation, puis rechargent la liste
 * et les réglages (nouvelle base, brouillon gardé).
 */
import { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from '../../contexts/ToastContext';
import { abandonnerVersion, annulerVersion, lireVersion, lireVersions } from './configurationApi';
import { refusDeLErreur, texteDuRefus } from './refus';

export default function useHistorique({ apresAction }) {
    const { t } = useTranslation();
    const toast = useToast();
    const [versions, setVersions] = useState(null);
    const [erreur, setErreur] = useState(false);
    const [details, setDetails] = useState({});
    const [confirmation, setConfirmation] = useState(null);
    const charge = useRef(false);

    const charger = useCallback(async () => {
        charge.current = true;
        setErreur(false);
        try {
            setVersions(await lireVersions());
        } catch {
            setErreur(true);
        }
    }, []);

    /** À l'ouverture de l'onglet : une seule fois. */
    const chargerUneFois = useCallback(() => {
        if (!charge.current) charger();
    }, [charger]);

    /** Après une application : seulement si l'onglet a déjà été ouvert. */
    const rechargerSiCharge = useCallback(() => (charge.current ? charger() : undefined), [charger]);

    const basculerDetail = async (id) => {
        if (details[id]) return setDetails(({ [id]: _ferme, ...reste }) => reste);
        setDetails((d) => ({ ...d, [id]: 'chargement' }));
        try {
            const detail = await lireVersion(id);
            setDetails((d) => ({ ...d, [id]: detail }));
        } catch (e) {
            setDetails(({ [id]: _echec, ...reste }) => reste);
            toast.error(texteDuRefus(refusDeLErreur(e), t));
        }
    };

    const executer = async () => {
        const { action, version } = confirmation;
        setConfirmation(null);
        try {
            await (action === 'annuler' ? annulerVersion : abandonnerVersion)(version.id_version);
            toast.success(t(action === 'annuler' ? 'configuration.historique.annulee' : 'configuration.historique.abandonne', { n: version.id_version }));
            await Promise.all([charger(), apresAction()]);
        } catch (e) {
            toast.error(texteDuRefus(refusDeLErreur(e), t));
        }
    };

    return {
        versions,
        erreur,
        chargement: !versions && !erreur,
        charger,
        chargerUneFois,
        rechargerSiCharge,
        details,
        basculerDetail,
        confirmation,
        demanderConfirmation: (action, version) => setConfirmation({ action, version }),
        annulerConfirmation: () => setConfirmation(null),
        executer,
    };
}
