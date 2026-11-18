/** Tableau sémantique sur ordinateur, liste de fiches sur téléphone sans perte de champs ni actions. */
import { Fragment } from 'react';
import { Box, Button, Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function ListePersonnes({ lignes, colonnes, titre, actions, selection, chargement, erreur, recharger, vide, creer }) {
  const { t } = useTranslation();
  const telephone = useMediaQuery('(max-width:699px)');
  if (chargement) return <Box role="status" aria-label={t('personnes.chargement')} sx={{ p: 2 }}>
    {Array.from({ length: 5 }, (_, i) => <Skeleton key={i} height={56} />)}
  </Box>;
  if (erreur) return <Box role="alert" sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
    <Typography sx={{ mb: 2 }}>{erreur}</Typography>
    <Button variant="outlined" onClick={recharger}>{t('personnes.reessayer')}</Button>
  </Box>;
  if (!lignes.length) return <Box sx={{ py: 5, px: 2, textAlign: 'center', border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
    <Typography sx={{ fontWeight: 600, mb: 1 }}>{t(vide ? 'personnes.vide' : 'personnes.aucunResultat')}</Typography>
    <Typography color="text.secondary" sx={{ mb: 2 }}>{t(vide ? 'personnes.videAide' : 'personnes.filtresAide')}</Typography>
    {vide && creer && <Button onClick={creer}>{t('personnes.ajouter')}</Button>}
  </Box>;
  if (telephone) return <Box>
    {colonnes.some((col) => col.entete) && <Box role="group" aria-label={t('personnes.trier')} sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, p: 1, mb: 1 }}>
      {colonnes.filter((col) => col.entete).map((col) => <Box key={col.cle}>{col.entete}</Box>)}
    </Box>}
    {selection && <Box sx={{ mb: 1 }}>{selection.entete}</Box>}
    <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, border: '1px solid', borderColor: 'divider', borderRadius: 1, bgcolor: 'background.paper' }}>
      {lignes.map((ligne) => <Box component="li" key={ligne.id_user} sx={{ p: 2, '& + li': { borderTop: '1px solid', borderColor: 'divider' } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
          {selection?.ligne(ligne)}
          <Typography component="h2" variant="body1" sx={{ fontWeight: 600, overflowWrap: 'anywhere' }}>{titre(ligne)}</Typography>
        </Box>
        <Box component="dl" sx={{ m: 0, mt: 1, display: 'grid', gridTemplateColumns: 'minmax(80px, 0.8fr) minmax(0, 1.2fr)', gap: '6px 12px' }}>
          {colonnes.map((col) => <Fragment key={col.cle}>
            <Typography component="dt" variant="body2" color="text.secondary">{col.libelle}</Typography>
            <Box component="dd" sx={{ m: 0, minWidth: 0, overflowWrap: 'anywhere', fontSize: 14 }}>{col.afficher(ligne)}</Box>
          </Fragment>)}
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: 0.5, mt: 1 }}>{actions(ligne)}</Box>
      </Box>)}
    </Box>
  </Box>;
  return <TableContainer component={Paper} variant="outlined">
    <Table size="small">
      <TableHead><TableRow>
        {selection && <TableCell padding="checkbox">{selection.entete}</TableCell>}
        {colonnes.map((col) => <TableCell key={col.cle}>{col.entete || col.libelle}</TableCell>)}
        <TableCell align="right">{t('personnes.actions')}</TableCell>
      </TableRow></TableHead>
      <TableBody>{lignes.map((ligne) => <TableRow hover key={ligne.id_user}>
        {selection && <TableCell padding="checkbox">{selection.ligne(ligne)}</TableCell>}
        {colonnes.map((col) => <TableCell key={col.cle} sx={{ overflowWrap: 'anywhere', maxWidth: 240 }}>{col.afficher(ligne)}</TableCell>)}
        <TableCell align="right"><Box sx={{ display: 'flex', justifyContent: 'flex-end', flexWrap: 'wrap', minWidth: 88 }}>{actions(ligne)}</Box></TableCell>
      </TableRow>)}</TableBody>
    </Table>
  </TableContainer>;
}
