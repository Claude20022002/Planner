/** Connexion et récupération : identité de l’école, langue et formulaire dans une même composition. */
import { Box, IconButton, ToggleButton, ToggleButtonGroup, Tooltip, Typography } from '@mui/material';
import { DarkModeOutlined, LightModeOutlined } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '../../i18n';
import { useTheme } from '../../contexts/ThemeContext';
import ThemeGestion from '../common/ThemeGestion';
import MarquePlanner from '../common/MarquePlanner';
import useTitreOnglet from '../../hooks/useTitreOnglet';

export default function EcranPublic({ children }) {
  const { t, i18n } = useTranslation();
  const { mode, toggleTheme } = useTheme();
  const lignes = t('login.boardLines', { returnObjects: true });
  return <ThemeGestion>
    <Box sx={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      <Box component="header" sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 2, px: { xs: 2, sm: 4, lg: 6 }, py: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <MarquePlanner hauteur={28} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ToggleButtonGroup size="small" exclusive value={i18n.language}
            onChange={(_, valeur) => valeur && i18n.changeLanguage(valeur)} aria-label={t('common.language')}>
            {LANGUAGES.map((lang) => <ToggleButton key={lang.code} value={lang.code} aria-label={lang.label} sx={{ minHeight: 44, minWidth: 44 }}>{lang.short}</ToggleButton>)}
          </ToggleButtonGroup>
          <Tooltip title={t(mode === 'dark' ? 'common.themeLight' : 'common.themeDark')}>
            <IconButton onClick={toggleTheme} aria-label={t(mode === 'dark' ? 'common.themeLight' : 'common.themeDark')}>
              {mode === 'dark' ? <LightModeOutlined /> : <DarkModeOutlined />}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, width: '100%', maxWidth: 1120, mx: 'auto', display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 0, md: 8 }, alignItems: 'center', px: { xs: 2, sm: 4 }, py: { xs: 5, md: 8 } }}>
        <Box sx={{ display: { xs: 'none', md: 'block' }, alignSelf: 'stretch', borderInlineEnd: '1px solid', borderColor: 'divider', pe: 6, py: 5 }}>
          <Typography component="h2" variant="h1" sx={{ maxWidth: '18ch', mb: 5 }}>{t('login.boardTitle')}</Typography>
          <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
            {Array.isArray(lignes) && lignes.map((ligne) => <Box component="li" key={ligne} sx={{ py: 2, borderTop: '1px solid', borderColor: 'divider' }}>
              <Typography color="text.secondary">{ligne}</Typography>
            </Box>)}
          </Box>
        </Box>
        <Box sx={{ width: '100%', maxWidth: 420, mx: 'auto', minWidth: 0 }}>{children}</Box>
      </Box>
    </Box>
  </ThemeGestion>;
}

/** Titre public traduit, partagé avec le titre de l’onglet. */
export function TitreEcran({ titre, sousTitre }) {
  useTitreOnglet(titre);
  return <>
    <Typography component="h1" variant="h1">{titre}</Typography>
    {sousTitre && <Typography sx={{ mt: 1.5, mb: 4, color: 'text.secondary' }}>{sousTitre}</Typography>}
  </>;
}
