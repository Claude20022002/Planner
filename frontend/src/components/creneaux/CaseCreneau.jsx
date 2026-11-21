/** Un créneau cliquable : heures, durée, et le chevauchement avec le créneau précédent signalé et expliqué. */
import { ButtonBase, Typography } from '@mui/material';
import StateChip from '../../design-system/components/StateChip';
import { ds } from '../../design-system/tokens';
import { formatHeure } from '../../utils/session';

export default function CaseCreneau({ creneau, modele: m }) {
  const { t } = m;
  const debut = formatHeure(creneau.heure_debut);
  const fin = formatHeure(creneau.heure_fin);
  return (
    <ButtonBase
      onClick={() => m.ouvrir(creneau)}
      aria-label={t('ref.grids.editSlot', { day: t(`ref.days.${creneau.jour_semaine}`), start: debut, end: fin })}
      sx={{
        width: '100%',
        minHeight: 44,
        justifyContent: 'flex-start',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 0.5,
        px: 1,
        py: 0.75,
        borderRadius: `${ds.radius.sm}px`,
        border: '1px solid',
        borderColor: 'divider',
        '&:hover': { bgcolor: 'action.hover' },
      }}
    >
      <Typography component="span" sx={{ fontFamily: ds.font.board, fontWeight: 600, fontSize: '1rem', letterSpacing: '0.02em' }}>
        {debut} – {fin}
      </Typography>
      <Typography component="span" variant="caption" color="text.secondary">
        {t('ref.grids.minutes', { n: creneau.duree_minutes })}
      </Typography>
      {m.chevauche(creneau) && (
        <StateChip tone="warning" title={t('ref.grids.overlapHelp')}>
          {t('ref.grids.overlap')}
        </StateChip>
      )}
    </ButtonBase>
  );
}
