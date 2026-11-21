import { useTranslation } from 'react-i18next';
import { Alert, Box, Button, Skeleton, Typography } from '@mui/material';
import { ds } from '../../design-system/tokens';

/**
 * Cadre commun d'un bloc du tableau de bord (UIX-11) : titre, période, contenu, et son erreur à lui
 * seul avec « Réessayer ». Couleurs du thème d'UIX-10b uniquement (palette MUI et jetons `ds`).
 *
 * @param {string} id - identifiant du bloc, pour le titre (aria-labelledby)
 * @param {string} titre - titre du bloc
 * @param {string} [periode] - période affichée sous le titre (« cette semaine, du 16 au 22 nov. »)
 * @param {boolean} chargement, erreur - état du bloc (useBloc)
 * @param {() => void} onReessayer - relance le chargement du bloc seul
 * @param {React.ReactNode} [action] - un lien à droite du titre (« Tout voir »)
 * @param {number} [lignesSquelette] - nombre de lignes du squelette de chargement
 */
export default function Bloc({ id, titre, periode, chargement, erreur, onReessayer, action, lignesSquelette = 2, children }) {
  const { t } = useTranslation();
  const titreId = `bloc-${id}-titre`;

  return (
    <Box
      component="section"
      aria-labelledby={titreId}
      aria-busy={chargement || undefined}
      data-bloc={id}
      sx={{ minWidth: 0, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', borderRadius: `${ds.radius.lg}px` }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, px: 2, py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ minWidth: 0, flexGrow: 1 }}>
          <Typography id={titreId} component="h2" sx={{ fontWeight: 700, fontSize: '1rem', lineHeight: 1.4 }}>
            {titre}
          </Typography>
          {periode && <Typography sx={{ mt: 0.25, color: 'text.secondary', fontSize: '0.875rem', '&::first-letter': { textTransform: 'uppercase' } }}>{periode}</Typography>}
        </Box>
        {action}
      </Box>

      {erreur ? (
        <Alert
          severity="error"
          sx={{ m: 2 }}
          action={
            <Button color="inherit" size="small" onClick={onReessayer}>
              {t('common.retry')}
            </Button>
          }
        >
          {t('tableauDeBord.erreurBloc')}
        </Alert>
      ) : chargement ? (
        <Box sx={{ p: 2, display: 'grid', gap: 1.5 }}>
          {Array.from({ length: lignesSquelette }, (_, i) => (
            <Skeleton key={i} variant="rectangular" height={44} sx={{ borderRadius: `${ds.radius.sm}px` }} />
          ))}
        </Box>
      ) : (
        children
      )}
    </Box>
  );
}
