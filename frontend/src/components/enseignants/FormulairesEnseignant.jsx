/** Fiche et compétences : champs et règles existants, accessibles dans le thème commun. */
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { STATUTS } from './fiche';
export default function FormulairesEnseignant({ modele }) {
  const { enregistrement, t, dialog, setDialog, enregistrer, champ, comptesSansFiche, campus, competences, setCompetences, enregistrerCompetences, modules } = modele;
  return <>            <Dialog open={dialog.open} onClose={() => setDialog((d) => ({ ...d, open: false }))} maxWidth="sm" fullWidth>
                <form onSubmit={enregistrer}>
                    <DialogTitle>
                        {dialog.editing ? t('ref.staff.edit') : t('ref.staff.add')}
                        {dialog.editing && (
                            <Typography variant="body2" color="text.secondary">
                                {dialog.editing.user?.prenom} {dialog.editing.user?.nom}
                            </Typography>
                        )}
                    </DialogTitle>
                    <DialogContent>
                        <Stack spacing={2} sx={{ mt: 1 }}>
                            {!dialog.editing && (
                                <TextField select label={t('ref.staff.fields.user')} helperText={t('ref.staff.fields.userHelp')} value={dialog.form.id_user} onChange={champ('id_user')} required>
                                    {comptesSansFiche.map((u) => (
                                        <MenuItem key={u.id_user} value={u.id_user}>
                                            {u.nom} {u.prenom} · {u.email}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <TextField label={t('ref.staff.fields.department')} value={dialog.form.departement} onChange={champ('departement')} required fullWidth />
                                <TextField label={t('ref.staff.fields.specialty')} value={dialog.form.specialite} onChange={champ('specialite')} required fullWidth />
                            </Stack>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <TextField select label={t('ref.staff.fields.status')} value={dialog.form.statut} onChange={champ('statut')} fullWidth>
                                    {STATUTS.map((s) => (
                                        <MenuItem key={s} value={s}>
                                            {t(`ref.staff.statuses.${s}`)}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField label={t('ref.staff.fields.grade')} value={dialog.form.grade} onChange={champ('grade')} fullWidth />
                            </Stack>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <TextField
                                    type="number"
                                    label={t('ref.staff.fields.due')}
                                    helperText={t('ref.staff.fields.dueHelp')}
                                    value={dialog.form.statut === 'vacataire' ? '' : dialog.form.service_annuel_heures}
                                    onChange={champ('service_annuel_heures')}
                                    disabled={dialog.form.statut === 'vacataire'}
                                    inputProps={{ min: 0, step: 1 }}
                                    fullWidth
                                />
                                <TextField type="number" label={t('ref.staff.fields.weekly')} value={dialog.form.max_heures_semaine} onChange={champ('max_heures_semaine')} inputProps={{ min: 1, step: 0.5 }} fullWidth />
                            </Stack>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <TextField select label={t('ref.staff.fields.campus')} value={dialog.form.id_campus_prefere} onChange={champ('id_campus_prefere')} fullWidth>
                                    <MenuItem value="">{t('ref.staff.fields.noCampus')}</MenuItem>
                                    {campus.map((c) => (
                                        <MenuItem key={c.id_campus} value={c.id_campus}>
                                            {c.nom}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField label={t('ref.staff.fields.office')} value={dialog.form.bureau} onChange={champ('bureau')} fullWidth />
                            </Stack>
                            {dialog.form.statut === 'vacataire' && (
                                <TextField label={t('ref.staff.fields.company')} helperText={t('ref.staff.fields.companyHelp')} value={dialog.form.entreprise} onChange={champ('entreprise')} />
                            )}
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDialog((d) => ({ ...d, open: false }))}>{t('common.cancel')}</Button>
                        <Button type="submit" variant="contained" disabled={enregistrement}>
                            {t('common.save')}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

            <Dialog open={Boolean(competences)} onClose={() => setCompetences(null)} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {t('ref.staff.skillsTitle', { name: `${competences?.enseignant.user?.prenom ?? ''} ${competences?.enseignant.user?.nom ?? ''}` })}
                    <Typography variant="body2" color="text.secondary">
                        {t('ref.staff.skillsCount', { count: competences?.choix.length ?? 0 })}
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {t('ref.staff.skillsHelp')}
                    </Typography>
                    <Autocomplete
                        multiple
                        disableCloseOnSelect
                        options={[...modules].sort((a, b) => (a.filiere?.code_filiere || '').localeCompare(b.filiere?.code_filiere || '') || a.code_cours.localeCompare(b.code_cours))}
                        groupBy={(m) => m.filiere?.code_filiere || '-'}
                        value={competences?.choix ?? []}
                        onChange={(_, valeur) => setCompetences((c) => ({ ...c, choix: valeur }))}
                        getOptionLabel={(m) => `${m.code_cours} · ${m.nom_cours}`}
                        isOptionEqualToValue={(a, b) => a.id_cours === b.id_cours}
                        renderInput={(params) => <TextField {...params} label={t('ref.staff.skillsPick')} />}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setCompetences(null)}>{t('common.cancel')}</Button>
                    <Button variant="contained" onClick={enregistrerCompetences}>
                        {t('common.save')}
                    </Button>
                </DialogActions>
            </Dialog>

</>;
}
