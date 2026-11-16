/** Création, invitation, suppression et MFA de la page Comptes, sans changement d’autorisation. */
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Typography } from '@mui/material';
import ConfirmDialog from '../common/ConfirmDialog';
import DialoguesComptes from './DialoguesComptes';
import FormulaireCompteDialog from './FormulaireCompteDialog';
export default function FormulairesComptes({ modele }) {
  const { t, actions, confirmDialog, setConfirmDialog, handleDeleteConfirm, mfaAReinitialiser, setMfaAReinitialiser, reinitialiserMfa, open, editing, setOpen, compteEnregistre, setError, invitation, setInvitation } = modele;
  return <>                <DialoguesComptes actions={actions} />

                <ConfirmDialog
                    open={confirmDialog.open}
                    title={t('utilisateurs.titreSuppression')}
                    message={t('utilisateurs.messageSuppression')}
                    confirmLabel={t('common.delete')}
                    onConfirm={handleDeleteConfirm}
                    onCancel={() => setConfirmDialog({ open: false, id: null })}
                />

                <ConfirmDialog
                    open={Boolean(mfaAReinitialiser)}
                    title={t('utilisateurs.mfaTitre')}
                    message={t('utilisateurs.mfaMessage', { nom: `${mfaAReinitialiser?.prenom ?? ''} ${mfaAReinitialiser?.nom ?? ''}` })}
                    confirmLabel={t('utilisateurs.reinitialiser')}
                    onConfirm={reinitialiserMfa}
                    onCancel={() => setMfaAReinitialiser(null)}
                />

                <FormulaireCompteDialog open={open} editing={editing} onClose={() => setOpen(false)} onSaved={compteEnregistre} onError={setError} />

                {/* Lien d'invitation : à transmettre si l'email n'a pas pu partir */}
                <Dialog open={Boolean(invitation)} onClose={() => setInvitation(null)} maxWidth="sm" fullWidth>
                    <DialogTitle>{t('utilisateurs.invitationDe', { email: invitation?.email })}</DialogTitle>
                    <DialogContent>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {t(invitation?.envoyee ? 'utilisateurs.invitationEnvoyee' : 'utilisateurs.invitationNonEnvoyee')}
                        </Typography>
                        <TextField fullWidth value={invitation?.lien ?? ''} InputProps={{ readOnly: true }} onFocus={(e) => e.target.select()} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => navigator.clipboard?.writeText(invitation?.lien ?? '')}>{t('utilisateurs.copierLien')}</Button>
                        <Button variant="contained" onClick={() => setInvitation(null)}>{t('common.close')}</Button>
                    </DialogActions>
                </Dialog></>;
}
