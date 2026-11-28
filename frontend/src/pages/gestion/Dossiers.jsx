/**
 * Dossiers élèves et familles (VSC-02) : recherche, état civil, responsables légaux, inscriptions.
 * L'écran n'applique aucune règle d'état lui-même : il propose les étapes que shared/vieScolaire.js
 * autorise et laisse le serveur refuser le reste.
 */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { Add, Close, Delete, FamilyRestroom, PersonAdd, Search } from '@mui/icons-material';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import EnteteGestion from '../../components/gestion/EnteteGestion';
import { vieScolaireAPI } from '../../services/api';
import { useToast } from '../../contexts/ToastContext';
import { LIENS_FAMILLE, SEXES, etatsSuivants } from '../../../../shared/vieScolaire.js';

// L'étape qui fait avancer un dossier ; « radiee » se propose à part, et « passante » ferme l'année
const PROGRESSION = { demandee: 'engagee', engagee: 'confirmee', confirmee: 'inscrite', inscrite: 'passante' };

const PERSONNE_VIDE = { nom: '', prenom: '', date_naissance: '', sexe: '', cne: '', telephone: '', email_contact: '' };
const ENFANT_VIDE = { nom: '', prenom: '', date_naissance: '', sexe: '', cne: '', lien: 'pere', titulaire: false, niveau: '' };

const messageDe = (error, repli) => error?.response?.data?.message || error?.response?.data?.error || repli;

export default function Dossiers() {
  const { t } = useTranslation();
  const toast = useToast();

  const [recherche, setRecherche] = useState('');
  const [liste, setListe] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [annees, setAnnees] = useState([]);
  const [dossier, setDossier] = useState(null);
  const [personne, setPersonne] = useState(null); // dialogue d'identité : { id, form }
  const [famille, setFamille] = useState(null);
  const [reinscription, setReinscription] = useState(null); // { id_inscription, id_annee, niveau }
  const [aSupprimer, setASupprimer] = useState(null);
  const [envoi, setEnvoi] = useState(false);
  const [lien, setLien] = useState({ id_responsable: '', lien: 'pere', titulaire: false });
  const [responsablesDispo, setResponsablesDispo] = useState([]);

  const libelleAnnee = useMemo(
    () => Object.fromEntries(annees.map((a) => [a.id_annee, a.libelle])),
    [annees]
  );

  const charger = useCallback(async () => {
    setChargement(true);
    try {
      const [personnes, listeAnnees] = await Promise.all([vieScolaireAPI.personnes(recherche), vieScolaireAPI.annees()]);
      setListe(personnes.data ?? []);
      setAnnees(listeAnnees.data ?? []);
    } catch (error) {
      toast.error(messageDe(error, t('dossiers.messages.erreur')));
    } finally {
      setChargement(false);
    }
  }, [recherche, t, toast]);

  useEffect(() => {
    const minuteur = setTimeout(charger, 250);
    return () => clearTimeout(minuteur);
  }, [charger]);

  const ouvrirDossier = async (id) => {
    try {
      setDossier(await vieScolaireAPI.dossier(id));
      setLien({ id_responsable: '', lien: 'pere', titulaire: false });
    } catch (error) {
      toast.error(messageDe(error, t('dossiers.messages.erreur')));
    }
  };

  const rechargerDossier = async () => {
    if (dossier) await ouvrirDossier(dossier.id_personne);
    await charger();
  };

  const envoyer = async (action, succes) => {
    setEnvoi(true);
    try {
      await action();
      toast.success(t(succes));
      return true;
    } catch (error) {
      toast.error(messageDe(error, t('dossiers.messages.erreur')));
      return false;
    } finally {
      setEnvoi(false);
    }
  };

  const enregistrerPersonne = async () => {
    const { id, form } = personne;
    const donnees = Object.fromEntries(Object.entries(form).map(([cle, valeur]) => [cle, valeur === '' ? null : valeur]));
    const ok = await envoyer(
      () => (id ? vieScolaireAPI.modifierPersonne(id, donnees) : vieScolaireAPI.creerPersonne(donnees)),
      id ? 'dossiers.messages.modifie' : 'dossiers.messages.cree'
    );
    if (!ok) return;
    setPersonne(null);
    await rechargerDossier();
  };

  const enregistrerFamille = async () => {
    const { form } = famille;
    const donnees = {
      id_annee: Number(form.id_annee),
      responsable: form.responsable,
      enfants: form.enfants.map((enfant) => ({
        personne: {
          nom: enfant.nom,
          prenom: enfant.prenom,
          date_naissance: enfant.date_naissance || null,
          sexe: enfant.sexe || null,
          cne: enfant.cne || null,
        },
        lien: enfant.lien,
        titulaire: enfant.titulaire,
        niveau: enfant.niveau,
      })),
    };
    const ok = await envoyer(() => vieScolaireAPI.inscrireFamille(donnees), 'dossiers.messages.inscrit');
    if (ok) {
      setFamille(null);
      await charger();
    }
  };

  const changerEtat = async (inscription, etat) => {
    const ok = await envoyer(() => vieScolaireAPI.changerEtat(inscription.id_inscription, etat), 'dossiers.messages.etat');
    if (ok) await rechargerDossier();
  };

  const confirmerReinscription = async () => {
    const { id_inscription, id_annee, niveau } = reinscription;
    const ok = await envoyer(
      () => vieScolaireAPI.reinscrire(id_inscription, { id_annee: Number(id_annee), niveau }),
      'dossiers.messages.reinscrit'
    );
    if (ok) {
      setReinscription(null);
      await rechargerDossier();
    }
  };

  const lierResponsable = async () => {
    const ok = await envoyer(
      () => vieScolaireAPI.lierResponsable(dossier.id_personne, { ...lien, id_responsable: Number(lien.id_responsable) }),
      'dossiers.messages.lie'
    );
    if (ok) await rechargerDossier();
  };

  const delierResponsable = async (idResponsable) => {
    const ok = await envoyer(
      () => vieScolaireAPI.delierResponsable(dossier.id_personne, idResponsable),
      'dossiers.messages.delie'
    );
    if (ok) await rechargerDossier();
  };

  const supprimerPersonne = async () => {
    const ok = await envoyer(() => vieScolaireAPI.supprimerPersonne(aSupprimer.id_personne), 'dossiers.messages.supprime');
    if (ok) {
      setASupprimer(null);
      setDossier(null);
      await charger();
    }
  };

  const ouvrirResponsables = async () => {
    try {
      const reponse = await vieScolaireAPI.responsables('');
      setResponsablesDispo(reponse.data ?? []);
    } catch (error) {
      toast.error(messageDe(error, t('dossiers.messages.erreur')));
    }
  };

  const ouvrirPersonne = (source = null) => setPersonne({
    id: source?.id_personne ?? null,
    form: source
      ? {
          nom: source.nom ?? '',
          prenom: source.prenom ?? '',
          date_naissance: source.date_naissance ?? '',
          sexe: source.sexe ?? '',
          cne: source.cne ?? '',
          telephone: source.telephone ?? '',
          email_contact: source.email_contact ?? '',
        }
      : { ...PERSONNE_VIDE },
  });

  const ouvrirFamille = () => setFamille({
    form: {
      id_annee: annees[0]?.id_annee ?? '',
      responsable: { nom: '', prenom: '', telephone: '', profession: '' },
      enfants: [{ ...ENFANT_VIDE, lien: 'pere', titulaire: true }],
    },
  });

  const changerEnfant = (index, champs) => setFamille((etat) => {
    const enfants = etat.form.enfants.map((enfant, i) => (i === index ? { ...enfant, ...champs } : enfant));
    return { ...etat, form: { ...etat.form, enfants } };
  });

  const changementPersonne = (champs) => setPersonne((etat) => ({ ...etat, form: { ...etat.form, ...champs } }));

  return (
    <DashboardLayout>
      <EnteteGestion contexte={t('dossiers.intro')}>
        <Button variant="outlined" startIcon={<PersonAdd />} onClick={() => ouvrirPersonne()}>
          {t('dossiers.nouvellePersonne')}
        </Button>
        <Button variant="contained" startIcon={<FamilyRestroom />} onClick={ouvrirFamille} disabled={!annees.length}>
          {t('dossiers.inscrireFamille')}
        </Button>
      </EnteteGestion>

      <TextField
        fullWidth
        size="small"
        value={recherche}
        onChange={(event) => setRecherche(event.target.value)}
        placeholder={t('dossiers.rechercher')}
        sx={{ mb: 2 }}
        InputProps={{ startAdornment: <InputAdornment position="start"><Search /></InputAdornment> }}
      />

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>{t('dossiers.colonnes.nom')}</TableCell>
            <TableCell>{t('dossiers.colonnes.cne')}</TableCell>
            <TableCell>{t('dossiers.colonnes.compte')}</TableCell>
            <TableCell align="right">{t('dossiers.colonnes.actions')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {liste.map((item) => (
            <TableRow key={item.id_personne} hover>
              <TableCell>{item.nom_complet}</TableCell>
              <TableCell>{item.cne ?? '—'}</TableCell>
              <TableCell>
                <Chip
                  size="small"
                  label={t(item.a_un_compte ? 'dossiers.compte.oui' : 'dossiers.compte.non')}
                  color={item.a_un_compte ? 'success' : 'default'}
                  variant="outlined"
                />
              </TableCell>
              <TableCell align="right">
                <Button size="small" onClick={() => ouvrirDossier(item.id_personne)}>{t('dossiers.ouvrir')}</Button>
              </TableCell>
            </TableRow>
          ))}
          {!chargement && !liste.length && (
            <TableRow>
              <TableCell colSpan={4}>
                <Typography variant="body2" color="text.secondary">{t('dossiers.aucunePersonne')}</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* ── Dossier ouvert ───────────────────────────────────────────────── */}
      <Dialog open={Boolean(dossier)} onClose={() => setDossier(null)} fullWidth maxWidth="md">
        {dossier && (
          <>
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ flex: 1 }}>
                {dossier.nom_complet}
                <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                  <Chip size="small" label={dossier.cne ?? t('dossiers.sansCne')} variant="outlined" />
                  {dossier.responsable && <Chip size="small" color="info" label={t('dossiers.estResponsable')} />}
                </Stack>
              </Box>
              <IconButton onClick={() => setDossier(null)} aria-label={t('dossiers.fermer')}><Close /></IconButton>
            </DialogTitle>
            <DialogContent dividers>
              <Stack spacing={3}>
                <Box>
                  <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                    <Button size="small" variant="outlined" onClick={() => ouvrirPersonne(dossier)}>{t('dossiers.modifier')}</Button>
                    <Button size="small" color="error" startIcon={<Delete />} onClick={() => setASupprimer(dossier)}>
                      {t('dossiers.supprimer')}
                    </Button>
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    {[dossier.date_naissance, dossier.lieu_naissance, dossier.telephone, dossier.email_contact]
                      .filter(Boolean)
                      .join(' · ') || t('dossiers.etatCivilVide')}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>{t('dossiers.inscriptions.titre')}</Typography>
                  {!dossier.inscriptions.length && (
                    <Typography variant="body2" color="text.secondary">{t('dossiers.inscriptions.aucune')}</Typography>
                  )}
                  {dossier.inscriptions.map((inscription) => {
                    const suite = PROGRESSION[inscription.etat];
                    const radiable = etatsSuivants(inscription.etat).includes('radiee');
                    return (
                      <Stack
                        key={inscription.id_inscription}
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        sx={{ py: 0.5, flexWrap: 'wrap', rowGap: 1 }}
                      >
                        <Typography variant="body2" sx={{ minWidth: 96 }}>{libelleAnnee[inscription.id_annee] ?? inscription.id_annee}</Typography>
                        <Typography variant="body2" sx={{ flex: 1 }}>{inscription.niveau}</Typography>
                        <Chip size="small" label={t(`dossiers.etats.${inscription.etat}`)} />
                        {suite && (
                          <Button size="small" disabled={envoi} onClick={() => changerEtat(inscription, suite)}>
                            {t('dossiers.inscriptions.avancer', { etat: t(`dossiers.etats.${suite}`) })}
                          </Button>
                        )}
                        {radiable && (
                          <Button size="small" color="error" disabled={envoi} onClick={() => changerEtat(inscription, 'radiee')}>
                            {t('dossiers.inscriptions.radier')}
                          </Button>
                        )}
                        {['confirmee', 'inscrite', 'passante'].includes(inscription.etat) && (
                          <Button
                            size="small"
                            disabled={envoi}
                            onClick={() => setReinscription({ id_inscription: inscription.id_inscription, id_annee: '', niveau: inscription.niveau })}
                          >
                            {t('dossiers.inscriptions.reinscrire')}
                          </Button>
                        )}
                      </Stack>
                    );
                  })}
                </Box>

                <Divider />

                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>{t('dossiers.responsable.titre')}</Typography>
                  {!dossier.responsables.length && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{t('dossiers.responsable.aucun')}</Typography>
                  )}
                  {dossier.responsables.map((responsable) => (
                    <Stack key={responsable.id_responsable} direction="row" spacing={1} alignItems="center" sx={{ py: 0.5 }}>
                      <Typography variant="body2" sx={{ flex: 1 }}>
                        {responsable.nom_complet} — {t(`dossiers.liens.${responsable.lien}`)}
                      </Typography>
                      {responsable.titulaire && <Chip size="small" color="primary" label={t('dossiers.responsable.titulaire')} />}
                      <Tooltip title={t('dossiers.responsable.delier')}>
                        <IconButton size="small" disabled={envoi} onClick={() => delierResponsable(responsable.id_responsable)}>
                          <Delete fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  ))}
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ mt: 1 }}>
                    <TextField
                      select
                      size="small"
                      label={t('dossiers.responsable.choisir')}
                      value={lien.id_responsable}
                      onChange={(event) => setLien({ ...lien, id_responsable: event.target.value })}
                      onFocus={ouvrirResponsables}
                      sx={{ minWidth: 220 }}
                    >
                      {responsablesDispo.map((item) => (
                        <MenuItem key={item.id_responsable} value={item.id_responsable}>{item.personne?.nom_complet ?? item.nom_complet}</MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      select
                      size="small"
                      label={t('dossiers.responsable.lien')}
                      value={lien.lien}
                      onChange={(event) => setLien({ ...lien, lien: event.target.value })}
                      sx={{ minWidth: 140 }}
                    >
                      {LIENS_FAMILLE.map((valeur) => (
                        <MenuItem key={valeur} value={valeur}>{t(`dossiers.liens.${valeur}`)}</MenuItem>
                      ))}
                    </TextField>
                    <FormControlLabel
                      control={<Checkbox checked={lien.titulaire} onChange={(event) => setLien({ ...lien, titulaire: event.target.checked })} />}
                      label={t('dossiers.responsable.titulaire')}
                    />
                    <Button variant="outlined" disabled={!lien.id_responsable || envoi} onClick={lierResponsable}>
                      {t('dossiers.responsable.ajouter')}
                    </Button>
                  </Stack>
                </Box>

                {Boolean(dossier.enfants?.length) && (
                  <Box>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>{t('dossiers.enfants.titre')}</Typography>
                    {dossier.enfants.map((enfant) => (
                      <Stack key={enfant.id_personne} direction="row" spacing={1} alignItems="center" sx={{ py: 0.5 }}>
                        <Typography variant="body2" sx={{ flex: 1 }}>
                          {enfant.nom_complet} — {t(`dossiers.liens.${enfant.lien}`)}
                          {enfant.titulaire ? ` (${t('dossiers.responsable.titulaire')})` : ''}
                        </Typography>
                        <Button size="small" onClick={() => ouvrirDossier(enfant.id_personne)}>{t('dossiers.ouvrir')}</Button>
                      </Stack>
                    ))}
                  </Box>
                )}
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDossier(null)}>{t('dossiers.fermer')}</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* ── Identité ─────────────────────────────────────────────────────── */}
      <Dialog open={Boolean(personne)} onClose={() => setPersonne(null)} fullWidth maxWidth="sm">
        {personne && (
          <>
            <DialogTitle>{t(personne.id ? 'dossiers.identite.modification' : 'dossiers.identite.creation')}</DialogTitle>
            <DialogContent dividers>
              <Stack spacing={2} sx={{ mt: 0.5 }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    required
                    fullWidth
                    label={t('dossiers.identite.nom')}
                    value={personne.form.nom}
                    onChange={(event) => changementPersonne({ nom: event.target.value })}
                  />
                  <TextField
                    required
                    fullWidth
                    label={t('dossiers.identite.prenom')}
                    value={personne.form.prenom}
                    onChange={(event) => changementPersonne({ prenom: event.target.value })}
                  />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    type="date"
                    label={t('dossiers.identite.naissance')}
                    InputLabelProps={{ shrink: true }}
                    value={personne.form.date_naissance}
                    onChange={(event) => changementPersonne({ date_naissance: event.target.value })}
                  />
                  <TextField
                    select
                    fullWidth
                    label={t('dossiers.identite.sexe')}
                    value={personne.form.sexe}
                    onChange={(event) => changementPersonne({ sexe: event.target.value })}
                  >
                    <MenuItem value="">—</MenuItem>
                    {SEXES.map((valeur) => (
                      <MenuItem key={valeur} value={valeur}>{t(`dossiers.sexes.${valeur}`)}</MenuItem>
                    ))}
                  </TextField>
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    label={t('dossiers.identite.cne')}
                    value={personne.form.cne}
                    onChange={(event) => changementPersonne({ cne: event.target.value })}
                  />
                  <TextField
                    fullWidth
                    label={t('dossiers.identite.telephone')}
                    value={personne.form.telephone}
                    onChange={(event) => changementPersonne({ telephone: event.target.value })}
                  />
                </Stack>
                <TextField
                  fullWidth
                  label={t('dossiers.identite.courriel')}
                  value={personne.form.email_contact}
                  onChange={(event) => changementPersonne({ email_contact: event.target.value })}
                />
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setPersonne(null)}>{t('dossiers.annuler')}</Button>
              <Button variant="contained" disabled={envoi} onClick={enregistrerPersonne}>{t('dossiers.enregistrer')}</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* ── Famille entière ──────────────────────────────────────────────── */}
      <Dialog open={Boolean(famille)} onClose={() => setFamille(null)} fullWidth maxWidth="md">
        {famille && (
          <>
            <DialogTitle>{t('dossiers.famille.titre')}</DialogTitle>
            <DialogContent dividers>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{t('dossiers.famille.intro')}</Typography>
              <Stack spacing={2}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    required
                    fullWidth
                    label={t('dossiers.famille.responsableNom')}
                    value={famille.form.responsable.nom}
                    onChange={(event) => setFamille((etat) => ({ ...etat, form: { ...etat.form, responsable: { ...etat.form.responsable, nom: event.target.value } } }))}
                  />
                  <TextField
                    required
                    fullWidth
                    label={t('dossiers.famille.responsablePrenom')}
                    value={famille.form.responsable.prenom}
                    onChange={(event) => setFamille((etat) => ({ ...etat, form: { ...etat.form, responsable: { ...etat.form.responsable, prenom: event.target.value } } }))}
                  />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    label={t('dossiers.identite.telephone')}
                    value={famille.form.responsable.telephone}
                    onChange={(event) => setFamille((etat) => ({ ...etat, form: { ...etat.form, responsable: { ...etat.form.responsable, telephone: event.target.value } } }))}
                  />
                  <TextField
                    fullWidth
                    label={t('dossiers.responsable.profession')}
                    value={famille.form.responsable.profession}
                    onChange={(event) => setFamille((etat) => ({ ...etat, form: { ...etat.form, responsable: { ...etat.form.responsable, profession: event.target.value } } }))}
                  />
                </Stack>

                <Divider />
                <Typography variant="subtitle2">{t('dossiers.famille.enfants')}</Typography>
                {famille.form.enfants.map((enfant, index) => (
                  <Box key={`enfant-${index}`} sx={{ p: 1.5, border: 1, borderColor: 'divider', borderRadius: 1 }}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mb: 1 }}>
                      <TextField
                        required
                        size="small"
                        fullWidth
                        label={t('dossiers.identite.nom')}
                        value={enfant.nom}
                        onChange={(event) => changerEnfant(index, { nom: event.target.value })}
                      />
                      <TextField
                        required
                        size="small"
                        fullWidth
                        label={t('dossiers.identite.prenom')}
                        value={enfant.prenom}
                        onChange={(event) => changerEnfant(index, { prenom: event.target.value })}
                      />
                      <TextField
                        size="small"
                        fullWidth
                        type="date"
                        label={t('dossiers.identite.naissance')}
                        InputLabelProps={{ shrink: true }}
                        value={enfant.date_naissance}
                        onChange={(event) => changerEnfant(index, { date_naissance: event.target.value })}
                      />
                    </Stack>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ alignItems: 'center' }}>
                      <TextField
                        required
                        size="small"
                        fullWidth
                        label={t('dossiers.famille.niveau')}
                        value={enfant.niveau}
                        onChange={(event) => changerEnfant(index, { niveau: event.target.value })}
                      />
                      <TextField
                        select
                        size="small"
                        label={t('dossiers.responsable.lien')}
                        value={enfant.lien}
                        onChange={(event) => changerEnfant(index, { lien: event.target.value })}
                        sx={{ minWidth: 140 }}
                      >
                        {LIENS_FAMILLE.map((valeur) => (
                          <MenuItem key={valeur} value={valeur}>{t(`dossiers.liens.${valeur}`)}</MenuItem>
                        ))}
                      </TextField>
                      <FormControlLabel
                        control={<Checkbox checked={enfant.titulaire} onChange={(event) => changerEnfant(index, { titulaire: event.target.checked })} />}
                        label={t('dossiers.responsable.titulaire')}
                      />
                      <IconButton
                        size="small"
                        disabled={famille.form.enfants.length === 1}
                        onClick={() => setFamille((etat) => ({ ...etat, form: { ...etat.form, enfants: etat.form.enfants.filter((_, i) => i !== index) } }))}
                        aria-label={t('dossiers.famille.retirer')}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Stack>
                  </Box>
                ))}
                <Box>
                  <Button
                    size="small"
                    startIcon={<Add />}
                    onClick={() => setFamille((etat) => ({ ...etat, form: { ...etat.form, enfants: [...etat.form.enfants, { ...ENFANT_VIDE, lien: 'pere' }] } }))}
                  >
                    {t('dossiers.famille.ajouterEnfant')}
                  </Button>
                </Box>

                <TextField
                  select
                  required
                  label={t('dossiers.famille.annee')}
                  value={famille.form.id_annee}
                  onChange={(event) => setFamille((etat) => ({ ...etat, form: { ...etat.form, id_annee: event.target.value } }))}
                  sx={{ maxWidth: 260 }}
                >
                  {annees.map((annee) => (
                    <MenuItem key={annee.id_annee} value={annee.id_annee}>{annee.libelle}</MenuItem>
                  ))}
                </TextField>
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setFamille(null)}>{t('dossiers.annuler')}</Button>
              <Button variant="contained" disabled={envoi} onClick={enregistrerFamille}>{t('dossiers.enregistrer')}</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* ── Réinscription ────────────────────────────────────────────────── */}
      <Dialog open={Boolean(reinscription)} onClose={() => setReinscription(null)} fullWidth maxWidth="xs">
        {reinscription && (
          <>
            <DialogTitle>{t('dossiers.reinscription.titre')}</DialogTitle>
            <DialogContent dividers>
              <Stack spacing={2} sx={{ mt: 0.5 }}>
                <TextField
                  select
                  required
                  label={t('dossiers.famille.annee')}
                  value={reinscription.id_annee}
                  onChange={(event) => setReinscription({ ...reinscription, id_annee: event.target.value })}
                >
                  {annees.map((annee) => (
                    <MenuItem key={annee.id_annee} value={annee.id_annee}>{annee.libelle}</MenuItem>
                  ))}
                </TextField>
                <TextField
                  required
                  label={t('dossiers.famille.niveau')}
                  value={reinscription.niveau}
                  onChange={(event) => setReinscription({ ...reinscription, niveau: event.target.value })}
                />
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setReinscription(null)}>{t('dossiers.annuler')}</Button>
              <Button variant="contained" disabled={envoi || !reinscription.id_annee} onClick={confirmerReinscription}>
                {t('dossiers.reinscription.valider')}
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* ── Suppression ──────────────────────────────────────────────────── */}
      <Dialog open={Boolean(aSupprimer)} onClose={() => setASupprimer(null)} maxWidth="xs" fullWidth>
        <DialogTitle>{t('dossiers.confirmSuppression.titre')}</DialogTitle>
        <DialogContent>
          <Alert severity="warning">{t('dossiers.confirmSuppression.texte', { nom: aSupprimer?.nom_complet ?? '' })}</Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setASupprimer(null)}>{t('dossiers.annuler')}</Button>
          <Button color="error" variant="contained" disabled={envoi} onClick={supprimerPersonne}>{t('dossiers.supprimer')}</Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}
