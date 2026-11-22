/** Création ou modification d'une salle : mêmes champs et contrôles qu'avant UIX-06c. */
import { Autocomplete, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { FormControlLabel, MenuItem, Stack, Switch, TextField } from '@mui/material';

export default function SalleDialog({ modele: m }) {
  const { t, form, formErrors: erreurs, champ } = m;
  const ligne = { direction: { xs: 'column', sm: 'row' }, spacing: 2 };
  const erreur = (nom) => ({ error: Boolean(erreurs[nom]), helperText: erreurs[nom] });
  return (
    <Dialog open={m.dialog.open} onClose={m.fermer} maxWidth="sm" fullWidth>
      <form onSubmit={m.enregistrer} noValidate>
        <DialogTitle>{m.dialog.editing ? t('ref.rooms.dialogEdit') : t('ref.rooms.dialogCreate')}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label={t('ref.rooms.fields.name')} value={form.nom_salle} onChange={champ('nom_salle')} {...erreur('nom_salle')} required autoFocus />
            <Stack {...ligne}>
              <TextField select fullWidth label={t('ref.rooms.fields.type')} value={form.type_salle} onChange={champ('type_salle')}
                {...erreur('type_salle')} required>
                {m.types.map((type) => (
                  <MenuItem key={type} value={type}>
                    {t('ref.roomTypes.' + type, { defaultValue: type })}
                  </MenuItem>
                ))}
              </TextField>
              <TextField select fullWidth label={t('ref.rooms.fields.campus')} value={form.id_campus} onChange={champ('id_campus')}
                {...erreur('id_campus')} required>
                {m.campus.map((c) => (
                  <MenuItem key={c.id_campus} value={c.id_campus}>
                    {c.nom}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
            <Stack {...ligne}>
              <TextField fullWidth type="number" label={t('ref.rooms.fields.capacity')} value={form.capacite} onChange={champ('capacite')}
                {...erreur('capacite')} slotProps={{ htmlInput: { min: 1 } }} required />
              <TextField fullWidth type="number" label={t('ref.rooms.fields.exam')} value={form.capacite_examen} onChange={champ('capacite_examen')}
                error={Boolean(erreurs.capacite_examen)}
                helperText={erreurs.capacite_examen || t('ref.rooms.fields.examHelp', { ratio: Math.round(m.ratioExamen * 100) })}
                slotProps={{ htmlInput: { min: 0 } }} />
              <TextField fullWidth type="number" label={t('ref.rooms.fields.floor')} value={form.etage} onChange={champ('etage')}
                helperText={t('ref.rooms.fields.floorHelp')} />
            </Stack>
            <Autocomplete
              multiple
              freeSolo
              options={[]}
              value={form.equipements}
              onChange={(_, valeur) => m.changerForm({ equipements: valeur.map((v) => v.trim()).filter(Boolean) })}
              renderValue={(valeur, getItemProps) =>
                valeur.map((option, index) => <Chip size="small" label={option} {...getItemProps({ index })} key={option} />)
              }
              renderInput={(params) => (
                <TextField {...params} label={t('ref.rooms.fields.equipment')} helperText={t('ref.rooms.fields.equipmentHelp')} />
              )}
            />
            <TextField select label={t('ref.rooms.fields.booking')} value={form.reservable_par} onChange={champ('reservable_par')}>
              <MenuItem value="admin">{t('ref.rooms.bookingAdmin')}</MenuItem>
              <MenuItem value="enseignants">{t('ref.rooms.bookingTeachers')}</MenuItem>
            </TextField>
            <FormControlLabel
              control={<Switch checked={form.disponible} onChange={(e) => m.changerForm({ disponible: e.target.checked })} />}
              label={t('ref.rooms.fields.available')}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={m.fermer}>{t('common.cancel')}</Button>
          <Button type="submit" variant="contained" disabled={m.saving}>
            {t('common.save')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
