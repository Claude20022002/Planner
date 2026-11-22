/** Tableau sémantique sur ordinateur, liste de fiches sur téléphone sans perte de champs ni actions. */
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import EtatsGestion from './EtatsGestion';
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
  if (chargement || erreur || !lignes.length)
    return (
      <EtatsGestion
        chargement={chargement}
        erreur={erreur}
        recharger={recharger}
        vide={vide}
        titreVide={titreVide}
        creer={creer}
        namespace={namespace}
      />
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
