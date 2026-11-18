/** Suivi d'un jeu dans un module : progression et défis réussis avec la solution, pour l'enseignant. */
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Personnage } from '../SceneJoueur';
import { ds } from '../../../design-system/tokens';
import { libelle } from '../../../../../shared/jeux/catalogue.js';

/** Titres des défis terminés avec la solution ; les points ne sont jamais comptés comme gagnés. */
function defisAssistes(etudiant, langue) {
  return (etudiant.defis ?? []).filter((d) => d.avec_solution).map((d) => libelle(d.titre, langue));
}

export default function SuiviModuleDialog({ suivi, onClose }) {
  const { t, i18n } = useTranslation();
  const etudiants = suivi?.etudiants ?? [];
  return (
    <Dialog open={Boolean(suivi)} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{t('jeux.modules.suiviTitre', { module: suivi?.module ? `${suivi.module.code} · ${suivi.module.nom}` : '' })}</DialogTitle>
      <DialogContent dividers>
        {suivi?.chargement && <Skeleton variant="rectangular" height={120} />}
        {!suivi?.chargement && suivi?.etudiants && etudiants.length === 0 && <Typography color="text.secondary">{t('jeux.modules.aucunEtudiant')}</Typography>}
        {etudiants.length > 0 && (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>{t('jeux.modules.etudiant')}</TableCell>
                <TableCell align="right">{t('jeux.modules.defis')}</TableCell>
                <TableCell align="right">{t('jeux.modules.points')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {etudiants.map((e) => {
                const assistes = defisAssistes(e, i18n.language);
                return (
                  <TableRow key={e.id_user}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Personnage avatar={e.avatar} idUser={e.id_user} taille={32} />
                        {e.prenom} {e.nom}
                        {(e.avec_solution ?? 0) > 0 && (
                          <Box component="span" sx={{ fontSize: '0.75rem', color: ds.board.letterDim }}>
                            {t('jeux.modules.aides', { count: e.avec_solution })}
                          </Box>
                        )}
                      </Box>
                      {assistes.length > 0 && (
                        <Box sx={{ fontSize: '0.75rem', color: ds.board.letterDim, mt: 0.5 }}>
                          {t('jeux.modules.avecSolution')} · {assistes.join(', ')}
                        </Box>
                      )}
                    </TableCell>
                    <TableCell align="right">{e.reussis}/{e.total}</TableCell>
                    <TableCell align="right">{e.points}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('common.close')}</Button>
      </DialogActions>
    </Dialog>
  );
}
