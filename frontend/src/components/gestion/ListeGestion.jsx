/** Tableau sémantique sur ordinateur, liste de fiches sur téléphone sans perte de champs ni actions. */
import {
  Box,
  Button,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import FichesGestion from './FichesGestion';

export default function ListeGestion({
  lignes,
  colonnes,
  titre,
  actions,
  selection,
  chargement,
  erreur,
  recharger,
  vide,
  titreVide,
  creer,
  cleLigne,
  namespace = 'gestion',
  replierTelephone = false,
  complementTitre,
}) {
  const { t } = useTranslation();
  const telephone = useMediaQuery('(max-width:699px)');
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
  if (!lignes.length)
    return (
      <Box sx={{ py: 5, px: 2, textAlign: 'center', border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
        <Typography sx={{ fontWeight: 600, mb: 1 }}>
          {titreVide || t(vide ? namespace + '.vide' : namespace + '.aucunResultat')}
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          {t(vide ? namespace + '.videAide' : namespace + '.filtresAide')}
        </Typography>
        {vide && creer && <Button onClick={creer}>{t(namespace + '.ajouter')}</Button>}
      </Box>
    );
  if (telephone) {
    return (
      <FichesGestion
        lignes={lignes}
        colonnes={colonnes}
        titre={titre}
        actions={actions}
        selection={selection}
        cleLigne={cleLigne}
        namespace={namespace}
        replierTelephone={replierTelephone}
        complementTitre={complementTitre}
      />
    );
  }
  return (
    <TableContainer component={Paper} variant="outlined">
      <Table size="small">
        <TableHead>
          <TableRow>
            {selection && <TableCell padding="checkbox">{selection.entete}</TableCell>}
            {colonnes.map((col) => (
              <TableCell key={col.cle}>{col.entete || col.libelle}</TableCell>
            ))}
            <TableCell align="right">{t(namespace + '.actions')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lignes.map((ligne) => (
            <TableRow hover key={cleLigne(ligne)}>
              {selection && <TableCell padding="checkbox">{selection.ligne(ligne)}</TableCell>}
              {colonnes.map((col) => (
                <TableCell key={col.cle} sx={{ overflowWrap: 'anywhere', maxWidth: 240 }}>
                  {col.afficher(ligne)}
                </TableCell>
              ))}
              <TableCell align="right">
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', flexWrap: 'wrap', minWidth: 88 }}>{actions(ligne)}</Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
