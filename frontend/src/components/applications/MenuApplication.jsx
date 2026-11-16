/** Menu des rubriques de l'application courante ; liens et droits viennent de la navigation existante. */
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Apps, ArrowBack } from '@mui/icons-material';
import { Box, Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import MarquePlanner from '../common/MarquePlanner';
import PiedDuMenu from '../layouts/PiedDuMenu';
import IconeApplication from './IconeApplication';

export default function MenuApplication({ application, sections, chemin, aller, deconnecter }) {
  const { t } = useTranslation();
  const groupes = application ? [{ items: application.rubriques }] : sections;
  return (
    <Box component="nav" aria-label={t('nav.menu')} sx={(theme) => ({ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.paper', color: 'text.primary', fontFamily: 'Inter, system-ui, sans-serif', borderInlineEnd: '1px solid', borderColor: 'divider', '--nav-letter': theme.palette.text.primary, '--nav-letterDim': theme.palette.text.secondary, '--nav-letterSoft': theme.palette.text.secondary, '--nav-filet': theme.palette.divider, '--nav-bordBouton': theme.palette.divider, '--nav-boutonActif': theme.palette.action.selected })}>
      <Box sx={{ px: 2.5, py: 3 }}><MarquePlanner hauteur={26} /></Box>
      <Button component={RouterLink} to="/applications" onClick={() => aller('/applications')} startIcon={<Apps />} sx={{ mx: 2, mb: 3, minHeight: 44, justifyContent: 'flex-start', fontFamily: 'inherit', textTransform: 'none' }}>{t('applications.retour')}</Button>
      {application && <Box sx={{ px: 2.5, mb: 2, display: 'flex', alignItems: 'center', gap: 1.25 }}>
        <IconeApplication nom={application.icone} />
        <Typography component="h2" sx={{ fontFamily: 'inherit', fontSize: 18, fontWeight: 650 }}>{t(`applications.${application.id}.titre`)}</Typography>
      </Box>}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', px: 1.5 }}>
        {groupes.map((groupe, index) => <Box key={groupe.section ?? index}>
          {!application && groupe.section && <Typography sx={{ px: 1, pt: 2, pb: 1, fontSize: 13, color: 'text.secondary' }}>{t(groupe.section)}</Typography>}
          <List disablePadding>{groupe.items.map((item) => {
            const actif = [item.path, ...(item.aussi ?? [])].some((base) => chemin === base || chemin.startsWith(`${base}/`));
            return <ListItem key={item.path} disablePadding><ListItemButton selected={actif} aria-current={actif ? 'page' : undefined} onClick={() => aller(item.path)} sx={{ borderRadius: 1.5, my: 0.25, minHeight: 44, '&.Mui-selected': { bgcolor: 'action.selected' } }}>
              <ListItemIcon sx={{ minWidth: 34, color: actif ? 'primary.main' : 'text.secondary' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={t(item.key)} slotProps={{ primary: { fontSize: 14, fontWeight: actif ? 600 : 400, fontFamily: 'inherit' } }} />
            </ListItemButton></ListItem>;
          })}</List>
        </Box>)}
      </Box>
      <Button startIcon={<ArrowBack />} onClick={() => aller('/applications')} sx={{ mx: 2, my: 2, minHeight: 44, fontFamily: 'inherit', textTransform: 'none' }}>{t('applications.titre')}</Button>
      <PiedDuMenu aller={aller} onLogout={deconnecter} />
    </Box>
  );
}
