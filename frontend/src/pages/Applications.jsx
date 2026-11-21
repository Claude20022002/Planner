/** Assemble l’accueil des applications et sa recherche locale. */
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';
import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material';
import DashboardLayout from '../components/layouts/DashboardLayout';
import { navigationFor } from '../components/layouts/navigation';
import { useAuth } from '../contexts/AuthContext';
import { construireApplications, filtrerApplications } from '../components/applications/catalogue';
import EnteteApplications from '../components/applications/EnteteApplications';
import GrilleApplications from '../components/applications/GrilleApplications';

export default function Applications() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [recherche, setRecherche] = useState('');
  const catalogue = construireApplications(navigationFor(user));
  const applications = filtrerApplications(catalogue, recherche, t);

  return (
    <DashboardLayout>
      <Box sx={{ maxInlineSize: 1040, marginInline: 'auto', paddingBlock: { xs: 2, md: 5 }, fontFamily: 'Inter, system-ui, sans-serif' }}>
        <EnteteApplications prenom={user?.prenom} />
        <TextField
          type="search"
          fullWidth
          value={recherche}
          onChange={(event) => setRecherche(event.target.value)}
          label={t('applications.rechercher')}
          slotProps={{
            input: { startAdornment: <InputAdornment position="start"><Search aria-hidden size={18} /></InputAdornment> },
          }}
          sx={{ maxInlineSize: 540, '& .MuiInputBase-root': { borderRadius: 2, minBlockSize: 52 } }}
        />
        <Typography
          role="status"
          aria-live="polite"
          variant="body2"
          color="text.secondary"
          sx={{ marginBlockStart: 1, marginBlockEnd: { xs: 3, md: 4 } }}
        >
          {t('applications.resultats', { count: applications.length })}
        </Typography>
        {applications.length ? (
          <GrilleApplications applications={applications} enRecherche={Boolean(recherche.trim())} />
        ) : (
          <Box sx={{ paddingBlock: 3, borderBlockStart: '1px solid', borderColor: 'divider' }}>
            <Typography sx={{ marginBlockEnd: 1 }}>{t('applications.vide')}</Typography>
            <Button onClick={() => setRecherche('')}>{t('applications.effacer')}</Button>
          </Box>
        )}
      </Box>
    </DashboardLayout>
  );
}
