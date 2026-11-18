/** Recherche nommée et filtres existants, alignés sur ordinateur et empilés au téléphone. */
import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

export default function RecherchePersonnes({ valeur, changer, libelle, nombre, pageCourante = false, children }) {
  const { t } = useTranslation();
  return <Box sx={{ border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', borderRadius: 1, p: 2, mb: 2 }}>
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { sm: 'center' }, gap: 2 }}>
      <TextField type="search" label={libelle} value={valeur} onChange={(e) => changer(e.target.value)} fullWidth
        slotProps={{ input: { startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment> } }}
        sx={{ flex: 1, minWidth: 0 }} />
      {children}
    </Box>
    <Typography role="status" aria-live="polite" variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
      {t('personnes.resultats', { count: nombre })}{pageCourante && ' · ' + t('personnes.pageCourante')}
    </Typography>
  </Box>;
}
