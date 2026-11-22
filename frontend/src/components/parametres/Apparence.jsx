import { Paper, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { DarkModeOutlined, LightModeOutlined } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';

/** Apparence du site : clair ou sombre, retenu sur ce navigateur (un seul thème depuis UIX-10b). */
export default function Apparence() {
    const { t } = useTranslation();
    const { mode, choisirMode } = useTheme();

    return (
        <Paper sx={{ p: 3, mt: 2 }}>
            <Typography variant="h6">{t('common.apparence.titre')}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {t('common.apparence.intro')}
            </Typography>
            <ToggleButtonGroup exclusive size="small" value={mode} onChange={(_, v) => v && choisirMode(v)} aria-label={t('common.apparence.mode')}>
                <ToggleButton value="light">
                    <LightModeOutlined fontSize="small" sx={{ mr: 0.75 }} />
                    {t('common.apparence.clair')}
                </ToggleButton>
                <ToggleButton value="dark">
                    <DarkModeOutlined fontSize="small" sx={{ mr: 0.75 }} />
                    {t('common.apparence.sombre')}
                </ToggleButton>
            </ToggleButtonGroup>
        </Paper>
    );
}
