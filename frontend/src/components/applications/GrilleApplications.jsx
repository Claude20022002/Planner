/** Dispose les applications disponibles et les raccourcis correspondant à la recherche. */
import { Link as RouterLink } from 'react-router-dom';
import { Box, Link, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import TuileApplication from './TuileApplication';

export default function GrilleApplications({ applications, enRecherche }) {
  const { t } = useTranslation();
  const mouvementReduit = useMediaQuery('(prefers-reduced-motion: reduce)');
  const entreeAnimee = !mouvementReduit && !enRecherche;

  return (
    <Box component="nav" aria-label={t('applications.navigation')}>
      <Box
        component="ul"
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(auto-fill, minmax(min(100%, 96px), 1fr))',
            md: 'repeat(auto-fill, minmax(120px, 1fr))',
          },
          alignItems: 'start',
          gap: { xs: '24px 12px', md: '28px 24px' },
          padding: 0,
          margin: 0,
          listStyle: 'none',
        }}
      >
        {applications.map((app, index) => (
          <Box
            key={app.id}
            component={motion.li}
            initial={entreeAnimee ? { opacity: 0, y: 6 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={entreeAnimee ? { duration: 0.2, delay: index * 0.028, ease: [0.22, 1, 0.36, 1] } : { duration: 0 }}
            sx={{ minInlineSize: 0, textAlign: 'center' }}
          >
            <TuileApplication
              application={app}
              chemin={enRecherche ? app.rubriques[0].path : app.chemin}
              mouvementReduit={mouvementReduit}
            />
            {enRecherche && <Raccourcis application={app} />}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

function Raccourcis({ application }) {
  const { t } = useTranslation();
  const externe = application.id === 'bibliotheque';
  return (
    <Box component="ul" sx={{ listStyle: 'none', margin: 0, padding: 0 }}>
      {application.rubriques.map((rubrique) => (
        <Box component="li" key={rubrique.path}>
          <Link
            {...(externe ? { href: rubrique.path } : { component: RouterLink, to: rubrique.path })}
            underline="hover"
            color="text.secondary"
            sx={{
              display: 'grid',
              placeItems: 'center',
              minBlockSize: 44,
              overflowWrap: 'anywhere',
              fontSize: '0.8125rem',
              '&:focus-visible': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: 2 },
            }}
          >
            {t(rubrique.key)}
          </Link>
        </Box>
      ))}
    </Box>
  );
}
