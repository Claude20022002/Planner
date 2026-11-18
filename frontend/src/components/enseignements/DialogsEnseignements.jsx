/** Édition, équipe et suppression d’un enseignement : dialogues existants. */
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography } from '@mui/material';
import EquipeDialog from '../planning/EquipeDialog';
import ConfirmDialog from '../common/ConfirmDialog';
export default function DialogsEnseignements({ modele }) {
  const {
    t,
    edition,
    setEdition,
    enregistrerEdition,
    enseignements,
    idEquipe,
    setIdEquipe,
    charger,
    aSupprimer,
    setASupprimer,
    supprimer,
  } = modele;
  return (
    <>
      {' '}
      <Dialog open={Boolean(edition)} onClose={() => setEdition(null)} maxWidth="xs" fullWidth>
        <form onSubmit={enregistrerEdition}>
          <DialogTitle>
            {t('ref.teaching.edit')}
            <Typography variant="body2" color="text.secondary">
              {edition?.nom}
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField
                type="number"
                label={t('ref.teaching.fields.hours')}
                value={edition?.heures_prevues ?? ''}
                onChange={(e) => setEdition((x) => ({ ...x, heures_prevues: e.target.value }))}
                inputProps={{ min: 0.5, step: 0.5 }}
                required
                autoFocus
              />
              <TextField
                label={t('ref.teaching.fields.label')}
                value={edition?.libelle ?? ''}
                onChange={(e) => setEdition((x) => ({ ...x, libelle: e.target.value }))}
                helperText={t('ref.teaching.fields.labelHelp')}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEdition(null)}>{t('common.cancel')}</Button>
            <Button type="submit" variant="contained">
              {t('common.save')}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <EquipeDialog
        enseignement={enseignements.find((e) => e.id_enseignement === idEquipe) ?? null}
        onClose={() => setIdEquipe(null)}
        onChange={charger}
      />
      <ConfirmDialog
        open={Boolean(aSupprimer)}
        title={t('ref.teaching.deleteTitle')}
        message={t('ref.teaching.deleteBody', {
          name: aSupprimer?.composante?.cours?.nom_cours,
          type: aSupprimer?.composante?.type,
        })}
        onConfirm={supprimer}
        onCancel={() => setASupprimer(null)}
      />
    </>
  );
}
