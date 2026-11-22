/** Ajout ou modification d'un créneau, suppression confirmée : mêmes champs et contrôles qu'avant UIX-06c. */
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Stack, TextField, Typography } from '@mui/material';
import ConfirmDialog from '../common/ConfirmDialog';
import { JOURS } from './grille';

export default function CreneauDialog({ modele: m }) {
  const { t, form, dialog } = m;
  const heure = (cle, libelle) => (
    <TextField
      fullWidth
      type="time"
      label={t(libelle)}
      value={form[cle]}
      onChange={(e) => m.changerForm({ [cle]: e.target.value })}
      slotProps={{ inputLabel: { shrink: true } }}
      required
    />
  );
  return (
    <>
      <Dialog open={dialog.open} onClose={m.fermer} maxWidth="xs" fullWidth>
        <form onSubmit={m.enregistrer}>
          <DialogTitle>{dialog.editing ? t('ref.grids.dialogEdit') : t('ref.grids.dialogCreate')}</DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {t(`ref.regimes.${m.regime}`)} · {t(`ref.grids.variants.${m.variante}`)}
            </Typography>
            <Stack spacing={2}>
              <TextField select label={t('ref.grids.fields.day')} value={form.jour_semaine} onChange={(e) => m.changerForm({ jour_semaine: e.target.value })}>
                {JOURS.map((jour) => (
                  <MenuItem key={jour} value={jour}>
                    {t(`ref.days.${jour}`)}
                  </MenuItem>
                ))}
              </TextField>
              <Stack direction="row" spacing={2}>
                {heure('heure_debut', 'ref.grids.fields.start')}
                {heure('heure_fin', 'ref.grids.fields.end')}
              </Stack>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ justifyContent: dialog.editing ? 'space-between' : 'flex-end' }}>
            {dialog.editing && (
              <Button color="error" onClick={() => m.setASupprimer(dialog.editing)}>
                {t('ref.common.delete')}
              </Button>
            )}
            <Box>
              <Button onClick={m.fermer}>{t('common.cancel')}</Button>
              <Button type="submit" variant="contained" sx={{ ml: 1 }}>
                {t('common.save')}
              </Button>
            </Box>
          </DialogActions>
        </form>
      </Dialog>
      <ConfirmDialog
        open={Boolean(m.aSupprimer)}
        title={t('ref.grids.deleteTitle')}
        message={t('ref.grids.deleteBody')}
        onConfirm={m.supprimer}
        onCancel={() => m.setASupprimer(null)}
      />
    </>
  );
}
