/** Formulaire étudiant existant : compte, numéro, niveau et groupe de l’année. */
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
export default function FormulaireEtudiant({ modele }) {
  const { t, open, setOpen, editing, formik, users, groupesProposes, libelleGroupe } = modele;
  return (                <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
                    <form onSubmit={formik.handleSubmit}>
                        <DialogTitle>{t(editing ? 'etudiants.titreModifier' : 'etudiants.titreNouveau')}</DialogTitle>
                        <DialogContent>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="etudiant-utilisateur">{t('etudiants.champs.utilisateur')}</InputLabel>
                                    <Select
                                        labelId="etudiant-utilisateur"
                                        name="id_user"
                                        value={formik.values.id_user}
                                        onChange={formik.handleChange}
                                        label={t('etudiants.champs.utilisateur')}
                                        error={formik.touched.id_user && Boolean(formik.errors.id_user)}
                                    >
                                        {users.map((user) => (
                                            <MenuItem key={user.id_user} value={user.id_user}>
                                                {user.prenom} {user.nom} ({user.identifiant || user.email})
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <TextField
                                    fullWidth
                                    label={t('etudiants.champs.numero')}
                                    name="numero_etudiant"
                                    value={formik.values.numero_etudiant}
                                    onChange={formik.handleChange}
                                    error={formik.touched.numero_etudiant && Boolean(formik.errors.numero_etudiant)}
                                    helperText={formik.touched.numero_etudiant && formik.errors.numero_etudiant && t(formik.errors.numero_etudiant)}
                                />
                                <TextField
                                    fullWidth
                                    label={t('etudiants.colonnes.niveau')}
                                    name="niveau"
                                    value={formik.values.niveau}
                                    onChange={formik.handleChange}
                                    error={formik.touched.niveau && Boolean(formik.errors.niveau)}
                                    helperText={formik.touched.niveau && formik.errors.niveau && t(formik.errors.niveau)}
                                />
                                <FormControl fullWidth>
                                    <InputLabel id="etudiant-groupe">{t('etudiants.colonnes.groupe')}</InputLabel>
                                    <Select
                                        labelId="etudiant-groupe"
                                        name="id_groupe"
                                        value={formik.values.id_groupe}
                                        onChange={formik.handleChange}
                                        label={t('etudiants.colonnes.groupe')}
                                        error={formik.touched.id_groupe && Boolean(formik.errors.id_groupe)}
                                    >
                                        {groupesProposes.map((groupe) => (
                                            <MenuItem key={groupe.id_groupe} value={groupe.id_groupe}>
                                                {libelleGroupe(groupe)}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpen(false)}>{t('common.cancel')}</Button>
                            <Button type="submit" variant="contained" disabled={formik.isSubmitting}>
                                {t(editing ? 'etudiants.modifier' : 'etudiants.creer')}
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>);
}
