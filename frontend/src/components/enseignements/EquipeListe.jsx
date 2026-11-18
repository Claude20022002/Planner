/** Équipe et états de services existants, accessibles aussi sur téléphone. */
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { TON_SERVICE, nomCourt, principalActif } from '../../utils/services';
import StateChip from '../../design-system/components/StateChip';
export default function EquipeListe({ services = [], onOuvrir }) {
    const { t } = useTranslation();
    const visibles = services.filter((s) => s.statut_service !== 'refuse');
    return (
        <Box
            component="button"
            type="button"
            aria-label={t('gestion.enseignements.equipe')}
            onClick={onOuvrir}
            sx={{ all: 'unset', cursor: 'pointer', display: 'flex', flexWrap: 'wrap', gap: 0.75, alignItems: 'center', minHeight: 44, '&:focus-visible': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: 2 } }}
        >
            {!principalActif(services) && <StateChip tone="warning">{t('ref.teaching.team.none')}</StateChip>}
            {visibles.map((s) => (
                <Box key={s.id_user} component="span" sx={{ display: 'inline-flex', gap: 0.5, alignItems: 'center' }}>
                    <Typography component="span" variant="body2" sx={{ overflowWrap: 'anywhere' }}>
                        {nomCourt(s.enseignant)}
                        {s.role === 'co_enseignant' && (
                            <Typography component="span" variant="caption" color="text.secondary">
                                {' '}
                                ({t('ref.teaching.roles.co_enseignant').toLowerCase()})
                            </Typography>
                        )}
                    </Typography>
                    {TON_SERVICE[s.statut_service] && <StateChip tone={TON_SERVICE[s.statut_service]}>{t(`ref.teaching.serviceStatus.${s.statut_service}`)}</StateChip>}
                </Box>
            ))}
        </Box>
    );
}
