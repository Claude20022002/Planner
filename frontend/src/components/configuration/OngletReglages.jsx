/**
 * L'onglet « Réglages » (ADM-02b) : les cinq réglages servis par GET /api/moteur/reglages, aucune liste
 * recopiée. Une ligne reprend sa valeur quand le brouillon le demande (`tour`) ou quand la valeur en vigueur change.
 */
import { useTranslation } from 'react-i18next';
import { Alert, Box, Button, Paper } from '@mui/material';
import { TableSkeleton } from '../../design-system/components/PremiumSkeleton';
import LigneReglage from './LigneReglage';

export default function OngletReglages({ configuration, brouillon, refusParCle }) {
    const { t } = useTranslation();
    if (configuration.erreur) {
        return (
            <Alert
                severity="error"
                action={
                    <Button color="inherit" size="small" onClick={configuration.recharger}>
                        {t('common.retry')}
                    </Button>
                }
            >
                {t('common.errorLoad')}
            </Alert>
        );
    }
    if (configuration.chargement) {
        return (
            <Box sx={{ p: 2 }} role="status" aria-label={t('configuration.onglets.reglages')}>
                <TableSkeleton rows={5} />
            </Box>
        );
    }
    const { reglages } = configuration.donnees;
    const { brouillon: b } = brouillon;
    return (
        <Paper sx={{ border: '1px solid', borderColor: 'divider', '& > :first-of-type': { borderTop: 0 } }}>
            {reglages.map((r) => (
                <LigneReglage
                    key={`${r.id}:${r.valeur}:${b.tour}`}
                    reglage={r}
                    entree={b.reglages[r.id]}
                    refusServeur={refusParCle.get(r.id)}
                    onPoser={brouillon.poser}
                    onRevenir={brouillon.revenir}
                    onRetirer={brouillon.retirer}
                />
            ))}
        </Paper>
    );
}
