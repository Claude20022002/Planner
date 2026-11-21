/** Présente l’identité de l’école et salue la personne connectée. */
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import MarquePlanner from '../common/MarquePlanner';

export default function EnteteApplications({ prenom }) {
  const { t } = useTranslation();
  const nom = prenom?.trim();
  return (
    <Box component="header" sx={{ marginBlockEnd: { xs: 3, md: 4 } }}>
      <MarquePlanner hauteur={30} />
      <Typography
        component="h2"
        sx={{
          fontFamily: 'inherit',
          fontWeight: 650,
          fontSize: { xs: '1.75rem', md: '2.25rem' },
          letterSpacing: '-0.035em',
          lineHeight: 1.15,
          marginBlockStart: { xs: 2, md: 3 },
          overflowWrap: 'anywhere',
        }}
      >
        {nom ? t('applications.salutation', { prenom: nom }) : t('applications.salutationGenerique')}
      </Typography>
    </Box>
  );
}
