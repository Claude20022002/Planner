/**
 * Page « Configuration » de l'école (ADM-02b, réponse 9 : ce fichier, réécrit sur place) : onglets
 * « Réglages » et « Historique » (l'onglet est dans l'adresse, `?onglet=`), barre du brouillon, aperçu.
 * ADM-02c ajoutera « Règles de génération » en premier (réponse 1 du plan court).
 * Limite connue (réponse 3) : quitter par le menu perd le brouillon sans question ; seuls le
 * rechargement et la fermeture de l'onglet du navigateur demandent confirmation.
 */
import '../../components/configuration/textes.js';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { Box, Tab, Tabs } from '@mui/material';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import EnteteGestion from '../../components/gestion/EnteteGestion';
import BarreBrouillon from '../../components/configuration/BarreBrouillon';
import FenetreApercu from '../../components/configuration/FenetreApercu';
import OngletHistorique from '../../components/configuration/OngletHistorique';
import OngletReglages from '../../components/configuration/OngletReglages';
import useApercu from '../../components/configuration/useApercu';
import useBrouillon from '../../components/configuration/useBrouillon';
import useConfiguration from '../../components/configuration/useConfiguration';
import useHistorique from '../../components/configuration/useHistorique';

const ONGLETS = ['reglages', 'historique'];

export default function ParametresPlanning() {
    const { t } = useTranslation();
    const [parametres, setParametres] = useSearchParams();
    const onglet = ONGLETS.includes(parametres.get('onglet')) ? parametres.get('onglet') : ONGLETS[0];
    const configuration = useConfiguration();
    const brouillon = useBrouillon();
    const historique = useHistorique({ apresAction: configuration.recharger });
    const apercu = useApercu({
        brouillon: brouillon.brouillon,
        configuration,
        apresApplication: async () => {
            brouillon.vider();
            await Promise.all([configuration.recharger(), historique.rechargerSiCharge()]);
        },
    });
    const { chargerUneFois } = historique;

    useEffect(() => {
        if (onglet === 'historique') chargerUneFois();
    }, [onglet, chargerUneFois]);

    // Recharger ou fermer l'onglet du navigateur avec un brouillon : le navigateur demande confirmation
    const avecBrouillon = brouillon.nombre > 0;
    useEffect(() => {
        if (!avecBrouillon) return undefined;
        const avant = (e) => {
            e.preventDefault();
            e.returnValue = '';
        };
        window.addEventListener('beforeunload', avant);
        return () => window.removeEventListener('beforeunload', avant);
    }, [avecBrouillon]);

    return (
        <DashboardLayout>
            <EnteteGestion contexte={t('configuration.intro')} />
            <Tabs
                value={onglet}
                onChange={(_, valeur) => setParametres({ onglet: valeur }, { replace: true })}
                variant="scrollable"
                allowScrollButtonsMobile
                aria-label={t('configuration.onglets.libelle')}
                sx={{ mb: 2, borderBottom: 1, borderColor: 'divider' }}
            >
                {ONGLETS.map((o) => (
                    <Tab key={o} value={o} id={`onglet-${o}`} aria-controls={`panneau-${o}`} label={t(`configuration.onglets.${o}`)} sx={{ textTransform: 'none', fontSize: '0.9375rem' }} />
                ))}
            </Tabs>
            <Box role="tabpanel" id={`panneau-${onglet}`} aria-labelledby={`onglet-${onglet}`}>
                {onglet === 'reglages' ? (
                    <OngletReglages configuration={configuration} brouillon={brouillon} refusParCle={apercu.refusParCle} />
                ) : (
                    <OngletHistorique modele={historique} aujourdhui={configuration.donnees?.aujourdhui} reglages={configuration.donnees?.reglages} />
                )}
            </Box>
            <BarreBrouillon nombre={brouillon.nombre} onApercu={apercu.ouvrir} onEffacer={brouillon.vider} apercuPossible={Boolean(configuration.donnees)} />
            <FenetreApercu modele={apercu} reglages={configuration.donnees?.reglages} />
        </DashboardLayout>
    );
}
