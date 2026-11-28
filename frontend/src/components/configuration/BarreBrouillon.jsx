/** La barre du brouillon, collée en bas de la page : « N changements · Voir l'aperçu · Tout effacer ». Absente sans changement. */
import { useTranslation } from 'react-i18next';
import { Button, Paper, Stack, Typography } from '@mui/material';

export default function BarreBrouillon({ nombre, onApercu, onEffacer, apercuPossible }) {
    const { t } = useTranslation();
    if (!nombre) return null;
    return (
        <Paper
            component="section"
            aria-label={t('configuration.barre.libelle')}
            elevation={6}
            sx={{ position: 'sticky', bottom: 16, mt: 3, px: 2, py: 1.5, border: '1px solid', borderColor: 'divider', zIndex: 2 }}
        >
            <Stack direction="row" spacing={1} useFlexGap sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
                <Typography variant="body2" sx={{ fontWeight: 600, flex: '1 1 auto' }} aria-live="polite">
                    {t('configuration.barre.changements', { count: nombre })}
                </Typography>
                <Button onClick={onEffacer}>{t('configuration.barre.effacer')}</Button>
                <Button variant="contained" onClick={onApercu} disabled={!apercuPossible}>
                    {t('configuration.barre.apercu')}
                </Button>
            </Stack>
        </Paper>
    );
}
