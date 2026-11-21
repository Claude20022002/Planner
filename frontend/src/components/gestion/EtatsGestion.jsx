/** États d'un écran de gestion sans données à montrer : chargement, échec avec nouvelle tentative, absence réelle ou absence de résultat. */
import { Box, Button, Skeleton, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function EtatsGestion({ chargement, erreur, recharger, vide, titreVide, aideVide, creer, namespace = 'gestion' }) {
  const { t } = useTranslation();
  if (chargement)
    return (
      <Box role="status" aria-label={t(namespace + '.chargement')} sx={{ p: 2 }}>
        {Array.from({ length: 5 }, (_, i) => (
          <Skeleton key={i} height={56} />
        ))}
      </Box>
    );
  if (erreur)
    return (
      <Box role="alert" sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
        <Typography sx={{ mb: 2 }}>{erreur}</Typography>
        <Button variant="outlined" onClick={recharger}>
          {t(namespace + '.reessayer')}
        </Button>
      </Box>
    );
  return (
    <Box sx={{ py: 5, px: 2, textAlign: 'center', border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
      <Typography sx={{ fontWeight: 600, mb: 1 }}>{titreVide || t(vide ? namespace + '.vide' : namespace + '.aucunResultat')}</Typography>
      <Typography color="text.secondary" sx={{ mb: 2 }}>
        {(vide && aideVide) || t(vide ? namespace + '.videAide' : namespace + '.filtresAide')}
      </Typography>
      {vide && creer && <Button onClick={creer}>{t(namespace + '.ajouter')}</Button>}
    </Box>
  );
}
