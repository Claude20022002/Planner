/** Charge prévue et dépassement : règle existante conservée. */
import { useTranslation } from 'react-i18next';
import { Stack, Typography } from '@mui/material';
import StateChip from '../../design-system/components/StateChip';
export default function Charge({ charge, nombre }) {
    const { t } = useTranslation();
    if (!charge) return '-';
    const { heures_prevues: prevues, heures_proposees: proposees, service_du: du } = charge;
    const pastille = du && prevues > du ? <StateChip tone="warning" title={t('ref.staff.overTitle')}>{t('ref.staff.over', { hours: nombre.format(prevues - du) })}</StateChip> : null;
    return (
        <Stack alignItems="flex-end" spacing={0.25}>
            <Stack direction="row" spacing={0.75} alignItems="center">
                {pastille}
                <Typography component="span" sx={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
                    {nombre.format(prevues)} h
                </Typography>
            </Stack>
            {proposees > 0 && (
                <Typography variant="caption" color="text.secondary">
                    {t('ref.staff.pending', { hours: nombre.format(proposees) })}
                </Typography>
            )}
        </Stack>
    );
}
