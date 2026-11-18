/** Accueil des applications disponibles pour le rôle connecté, avec recherche locale. */
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowForward, NorthEast, Search } from '@mui/icons-material';
import { Box, Button, InputAdornment, Link, TextField, Typography } from '@mui/material';
import DashboardLayout from '../components/layouts/DashboardLayout';
import MarquePlanner from '../components/common/MarquePlanner';
import { navigationFor } from '../components/layouts/navigation';
import { useAuth } from '../contexts/AuthContext';
import { construireApplications, filtrerApplications } from '../components/applications/catalogue';
import IconeApplication from '../components/applications/IconeApplication';

export default function Applications() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [recherche, setRecherche] = useState('');
  const catalogue = construireApplications(navigationFor(user));
  const applications = filtrerApplications(catalogue, recherche, t);
  return (
    <DashboardLayout>
      <Box sx={{ maxWidth: 1120, mx: 'auto', py: { xs: 2, md: 6 }, fontFamily: 'Inter, system-ui, sans-serif' }}>
        <Box sx={{ mb: 3 }}><MarquePlanner hauteur={32} /></Box>
        <Typography component="h2" sx={{ fontFamily: 'inherit', fontSize: { xs: 28, md: 36 }, fontWeight: 650, lineHeight: 1.2, letterSpacing: '-0.035em', mb: 1.5 }}>
          {t('applications.intro')}
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: '65ch', mb: 4 }}>{t('applications.description')}</Typography>
        <TextField
          type="search" fullWidth value={recherche} onChange={(event) => setRecherche(event.target.value)}
          label={t('applications.rechercher')}
          slotProps={{ input: { startAdornment: <InputAdornment position="start"><Search /></InputAdornment> } }}
          sx={{ maxWidth: 600, mb: 2, '& .MuiInputBase-root': { borderRadius: 2, minHeight: 52, fontFamily: 'inherit' } }}
        />
        <Typography role="status" aria-live="polite" variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          {t('applications.resultats', { count: applications.length })}
        </Typography>
        {applications.length ? (
          <Box component="nav" aria-label={t('applications.navigation')} sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(3, minmax(0, 1fr))' }, gap: { xs: 2, md: 3 }, alignItems: 'start' }}>
            {applications.map((app) => {
              const externe = app.id === 'bibliotheque';
              const chemin = recherche.trim() ? app.rubriques[0].path : app.chemin;
              return (
                <Box key={app.id} sx={{ bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', borderRadius: 2, p: 3, minWidth: 0, display: 'flex', flexDirection: 'column', '&:focus-within': { borderColor: 'primary.main' } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}>
                    <Box sx={{ bgcolor: 'action.hover', borderRadius: 2.5, p: 1.5, color: 'primary.main', display: 'flex' }}><IconeApplication nom={app.icone} sx={{ fontSize: 30 }} /></Box>
                    {externe ? <NorthEast aria-hidden sx={{ color: 'text.secondary', fontSize: 20 }} /> : <ArrowForward aria-hidden sx={{ color: 'text.secondary', fontSize: 20 }} />}
                  </Box>
                  <Typography component="h3" sx={{ fontFamily: 'inherit', fontSize: 20, fontWeight: 650, mb: 0.75 }}>
                    <Link {...(externe ? { href: chemin } : { component: RouterLink, to: chemin })} underline="hover" color="text.primary" sx={{ display: 'inline-flex', alignItems: 'center', minHeight: 44, '&:focus-visible': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: 4 } }}>
                      {t(`applications.${app.id}.titre`)}
                    </Link>
                  </Typography>
                  <Typography color="text.secondary" variant="body2" sx={{ mb: 2, flexGrow: 1 }}>{t(`applications.${app.id}.resume`)}</Typography>
                  <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, borderTop: '1px solid', borderColor: 'divider', pt: 1 }}>
                    {(recherche.trim() ? app.rubriques : app.rubriques.slice(0, 3)).map((rubrique) => (
                      <Box component="li" key={rubrique.path}>
                        <Link {...(externe ? { href: rubrique.path } : { component: RouterLink, to: rubrique.path })} underline="hover" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', minHeight: 44, fontSize: 14, lineHeight: 1.4, overflowWrap: 'anywhere', '&:focus-visible': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: 2 } }}>{t(rubrique.key)}</Link>
                      </Box>
                    ))}
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>{t('applications.nombreRubriques', { count: app.rubriques.length })}</Typography>
                </Box>
              );
            })}
          </Box>
        ) : (
          <Box sx={{ py: 5, borderTop: '1px solid', borderColor: 'divider' }}>
            <Typography sx={{ mb: 2 }}>{t('applications.vide')}</Typography>
            <Button onClick={() => setRecherche('')}>{t('applications.effacer')}</Button>
          </Box>
        )}
      </Box>
    </DashboardLayout>
  );
}
