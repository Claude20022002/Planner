/** Import de l'inventaire des salles : modèle CSV, fichier, puis chaque ligne refusée avec son numéro (import tout ou rien). */
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import { FileDownloadOutlined, UploadFile } from '@mui/icons-material';
import { MODELE_CSV } from './fiche';

const telechargerModele = () => {
  const blob = new Blob([String.fromCharCode(0xfeff) + MODELE_CSV], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const lien = Object.assign(document.createElement('a'), { href: url, download: 'modele-inventaire-salles.csv' });
  lien.click();
  URL.revokeObjectURL(url);
};

export default function ImportSallesDialog({ modele: m }) {
  const { t, importState: etat } = m;
  return (
    <Dialog open={etat.open} onClose={m.fermerImport} maxWidth="md" fullWidth>
      <DialogTitle>{t('ref.rooms.importTitle')}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <Typography variant="body2">{t('ref.rooms.importIntro')}</Typography>
          <Typography variant="body2" color="text.secondary">
            {t('ref.rooms.importTypes', { types: m.types.join(', ') })}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('ref.rooms.importAllOrNothing')}
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
            <Button variant="outlined" startIcon={<FileDownloadOutlined />} onClick={telechargerModele}>
              {t('ref.rooms.template')}
            </Button>
            <Button variant="contained" component="label" startIcon={<UploadFile />} disabled={etat.loading}>
              {etat.loading ? t('ref.rooms.importing') : t('ref.rooms.chooseFile')}
              <input
                hidden
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={(e) => {
                  const fichier = e.target.files?.[0];
                  e.target.value = '';
                  if (fichier) m.importer(fichier);
                }}
              />
            </Button>
          </Stack>
          {etat.erreurs.length > 0 && (
            <Box role="alert" sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
              <Typography variant="subtitle2" sx={{ px: 2, py: 1, color: 'error.main' }}>
                {t('ref.rooms.importErrors', { count: etat.erreurs.length })}
              </Typography>
              {/* Une liste plutôt qu'un tableau : chaque ligne refusée reste lisible à 390 px */}
              <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
                {etat.erreurs.map((erreur) => (
                  <Box component="li" key={erreur.ligne} sx={{ px: 2, py: 1, borderTop: '1px solid', borderColor: 'divider' }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, overflowWrap: 'anywhere' }}>
                      {t('ref.rooms.line', { n: erreur.ligne })} · {erreur.nom_salle || '-'}
                    </Typography>
                    <Typography variant="body2">{erreur.erreurs.join(' · ')}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={m.fermerImport}>{t('common.close')}</Button>
      </DialogActions>
    </Dialog>
  );
}
