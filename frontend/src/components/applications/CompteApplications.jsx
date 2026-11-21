/** Compte, langues, mode et déconnexion accessibles même sur l'accueil sans rail. */
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AccountCircle } from '@mui/icons-material';
import { IconButton, Popover, Tooltip } from '@mui/material';
import PiedDuMenu from '../layouts/PiedDuMenu';
import { ds } from '../../design-system/tokens';
export default function CompteApplications({ aller, deconnecter }) {
  const { t } = useTranslation();
  const [ancre, setAncre] = useState(null);
  const naviguer = (chemin) => { setAncre(null); aller(chemin); };
  return <>
    <Tooltip title={t('applications.compte')}><IconButton aria-label={t('applications.compte')} aria-haspopup="true" aria-expanded={Boolean(ancre)} onClick={(event) => setAncre(event.currentTarget)} sx={{ color: 'inherit', minWidth: 44, minHeight: 44 }}><AccountCircle /></IconButton></Tooltip>
    <Popover open={Boolean(ancre)} anchorEl={ancre} onClose={() => setAncre(null)} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }} slotProps={{ paper: { sx: { width: 300, maxWidth: 'calc(100vw - 24px)', bgcolor: ds.nav.fond } } }}>
      <PiedDuMenu aller={naviguer} onLogout={deconnecter} />
    </Popover>
  </>;
}
