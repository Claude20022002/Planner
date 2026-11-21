/** Téléphone : chaque jour en titre, ses créneaux dessous par rang ; rien n'est caché derrière un choix de jour. */
import { Box, Typography } from '@mui/material';
import CaseCreneau from './CaseCreneau';

export default function JoursCreneaux({ modele: m }) {
  const { t } = m;
  return (
    <Box sx={{ display: 'grid', gap: 2 }}>
      {m.jours.map((jour) => {
        const duJour = m.rangs.map((rang) => [rang, m.cellule(jour, rang)]).filter(([, creneau]) => creneau);
        return (
          <Box component="section" key={jour} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, bgcolor: 'background.paper', p: 2 }}>
            <Typography component="h2" variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
              {t(`ref.days.${jour}`)}
            </Typography>
            {duJour.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                {t('gestion.creneaux.aucunCeJour')}
              </Typography>
            ) : (
              <Box component="ol" sx={{ listStyle: 'none', m: 0, p: 0, display: 'grid', gap: 1 }}>
                {duJour.map(([rang, creneau]) => (
                  <Box component="li" key={rang} sx={{ display: 'grid', gridTemplateColumns: '64px 1fr', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      {t('gestion.creneaux.rangN', { n: rang })}
                    </Typography>
                    <CaseCreneau creneau={creneau} modele={m} />
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );
}
