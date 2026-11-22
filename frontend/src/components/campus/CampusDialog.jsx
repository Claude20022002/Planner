/** Création ou modification d'un campus, puis confirmation de suppression : mêmes champs et règles qu'avant UIX-06c. */
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Stack, Switch, TextField } from '@mui/material';
import ConfirmDialog from '../common/ConfirmDialog';

export default function CampusDialog({ modele: m }) {
  const { t, form } = m;
  return (
    <>
      <Dialog open={m.dialog.open} onClose={m.fermer} maxWidth="xs" fullWidth>
        <form onSubmit={m.enregistrer}>
          <DialogTitle>{m.dialog.editing ? t('ref.campus.dialogEdit') : t('ref.campus.dialogCreate')}</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField
                label={t('ref.campus.fields.code')}
                value={form.code}
                onChange={(e) => m.changerForm({ code: e.target.value.toUpperCase() })}
                helperText={t('ref.campus.fields.codeHelp')}
                slotProps={{ htmlInput: { maxLength: 10, pattern: '[A-Za-z0-9]{1,10}' } }}
                required
                autoFocus
              />
              <TextField label={t('ref.campus.fields.name')} value={form.nom} onChange={(e) => m.changerForm({ nom: e.target.value })} required />
              <TextField
                label={t('ref.campus.fields.address')}
                value={form.adresse}
                onChange={(e) => m.changerForm({ adresse: e.target.value })}
                multiline
                minRows={2}
              />
              <FormControlLabel
                control={<Switch checked={form.actif} onChange={(e) => m.changerForm({ actif: e.target.checked })} />}
                label={t('ref.campus.active')}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={m.fermer}>{t('common.cancel')}</Button>
            <Button type="submit" variant="contained">
              {t('common.save')}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <ConfirmDialog
        open={Boolean(m.aSupprimer)}
        title={t('ref.campus.deleteTitle')}
        message={t('ref.campus.deleteBody', { name: m.aSupprimer?.nom })}
        onConfirm={m.supprimer}
        onCancel={() => m.setASupprimer(null)}
      />
    </>
  );
}
