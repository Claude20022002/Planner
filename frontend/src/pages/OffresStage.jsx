import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { BusinessCenter, ContentCopy, MailOutline, OpenInNew } from '@mui/icons-material';
import DashboardLayout from '../components/layouts/DashboardLayout';
import PageHeader from '../design-system/components/PageHeader';
import EmptyState from '../design-system/components/EmptyState';
import ConfirmDialog from '../components/common/ConfirmDialog';
import { TableSkeleton } from '../design-system/components/PremiumSkeleton';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { filiereAPI, offreStageAPI } from '../services/api';
import { ds } from '../design-system/tokens';
import { estResponsable } from '../utils/droits';
import { lienCandidature, lienPartage, periodeDe, prixAffiche } from '../utils/offresStage';
import { DEVISES, OFFRE_STAGE, STATUTS_OFFRE_STAGE, filtrerOffres, manquesPourPublier, verifierOffre } from '../../../shared/offresStage.js';

const VIDE = {
  titre: '',
  entreprise: '',
  ville: '',
  description: '',
  id_filiere: '',
  niveau: '',
  debut: '',
  fin: '',
  gratification: '',
  devise: 'MAD',
  lien_candidature: '',
  contact_email: '',
};

/** Une offre du serveur (ou un formulaire vide) vers les champs du formulaire. */
const versChamps = (offre = VIDE) => ({
  id: offre?.id ?? null,
  statut: offre?.statut ?? 'brouillon',
  titre: offre?.titre ?? '',
  entreprise: offre?.entreprise ?? '',
  ville: offre?.ville ?? '',
  description: offre?.description ?? '',
  id_filiere: offre?.id_filiere ?? '',
  niveau: offre?.niveau ?? '',
  debut: offre?.debut ?? '',
  fin: offre?.fin ?? '',
  gratification: offre?.gratification ?? '',
  devise: offre?.devise ?? 'MAD',
  lien_candidature: offre?.lien_candidature ?? '',
  contact_email: offre?.contact_email ?? '',
});
const periodeTexte = (offre, t) => {
  const periode = periodeDe(offre);
  if (periode.type === 'periode') return t('offresStage.periode', { debut: periode.debut, fin: periode.fin });
  if (periode.type === 'debut') return t('offresStage.aPartirDu', { debut: periode.debut });
  if (periode.type === 'fin') return t('offresStage.jusquAu', { fin: periode.fin });
  return null;
};

/** Couleur du badge de statut : publiée en succès, brouillon en attente, fermée en neutre. */
const couleurStatut = (statut) => (statut === 'publiee' ? 'success' : statut === 'brouillon' ? 'warning' : 'default');

/**
 * Offres de stage (STA-01, espace Carrière). L'administration et les responsables de filière
 * écrivent, publient, ferment et partagent ; l'étudiant consulte les offres publiées et postule.
 * Le prix est affiché tel qu'il a été saisi (aucun calcul de paie ici).
 */
export default function OffresStage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const toast = useToast();
  const peutPublier = user?.role === 'admin' || estResponsable(user);

  const [offres, setOffres] = useState(null);
  const [filieres, setFilieres] = useState([]);
  const [erreur, setErreur] = useState(false);
  const [recherche, setRecherche] = useState('');
  const [idFiliere, setIdFiliere] = useState('');
  const [niveau, setNiveau] = useState('');
  const [statut, setStatut] = useState('');
  const [champ, setChamp] = useState(null);
  const [envoi, setEnvoi] = useState(false);
  const [aSupprimer, setASupprimer] = useState(null);

  const charger = useCallback(() => {
    setErreur(false);
    offreStageAPI
      .lister()
      .then((reponse) => setOffres(reponse?.data ?? []))
      .catch(() => setErreur(true));
  }, []);

  useEffect(() => {
    charger();
    filiereAPI.getTous().then((liste) => setFilieres(liste ?? [])).catch(() => setFilieres([]));
  }, [charger]);

  const visibles = useMemo(() => {
    const filtrees = filtrerOffres(offres ?? [], { recherche, id_filiere: idFiliere, niveau });
    return statut ? filtrees.filter((offre) => offre.statut === statut) : filtrees;
  }, [offres, recherche, idFiliere, niveau, statut]);

  // Niveaux proposés : ceux déjà écrits dans les offres, sans liste inventée
  const niveaux = useMemo(
    () => [...new Set((offres ?? []).map((offre) => offre.niveau).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'fr')),
    [offres]
  );

  const controle = useMemo(() => (champ ? verifierOffre(champ) : {}), [champ]);
  // Publication possible : contenu valide et un moyen de postuler (lien ou courriel)
  const publiabe = Boolean(champ) && !controle.motif && manquesPourPublier(controle.offre).length === 0;
  const champVide = champ && !champ.titre && !champ.entreprise && !champ.ville && !champ.description;

  const modifierChamp = (cle, valeur) => setChamp((actuel) => ({ ...actuel, [cle]: valeur }));

  const remplacer = (mise) => {
    setOffres((liste) => (liste ?? []).map((offre) => (offre.id === mise.id ? mise : offre)));
    setChamp((actuel) => (actuel?.id === mise.id ? versChamps(mise) : actuel));
  };

  const enregistrer = async (publier) => {
    if (!champ || controle.motif) return;
    setEnvoi(true);
    try {
      const corps = { ...controle.offre, id_filiere: champ.id_filiere === '' ? null : champ.id_filiere };
      const gardee = champ.id ? await offreStageAPI.modifier(champ.id, corps) : await offreStageAPI.creer(corps);
      let finale = gardee;
      if (publier && gardee.statut !== 'publiee') finale = await offreStageAPI.changerStatut(gardee.id, 'publiee');
      setOffres((liste) => [finale, ...(liste ?? []).filter((offre) => offre.id !== finale.id)]);
      toast.success(t(publier ? 'offresStage.publiee' : 'offresStage.enregistree'));
      setChamp(null);
    } catch (e) {
      toast.error(e?.message || t('offresStage.erreur'));
    } finally {
      setEnvoi(false);
    }
  };

  const changer = async (offre, cible) => {
    try {
      const mise = await offreStageAPI.changerStatut(offre.id, cible);
      remplacer(mise);
      toast.success(t(cible === 'publiee' ? (offre.statut === 'close' ? 'offresStage.rouverte' : 'offresStage.publiee') : 'offresStage.fermee'));
    } catch (e) {
      toast.error(e?.message || t('offresStage.erreur'));
    }
  };

  const supprimer = async () => {
    const offre = aSupprimer;
    setASupprimer(null);
    if (!offre) return;
    try {
      await offreStageAPI.supprimer(offre.id);
      setOffres((liste) => (liste ?? []).filter((autre) => autre.id !== offre.id));
      toast.success(t('offresStage.supprimee'));
    } catch (e) {
      toast.error(e?.message || t('offresStage.erreur'));
    }
  };

  const copier = async (offre) => {
    try {
      await navigator.clipboard.writeText(lienPartage(offre.jeton_partage, window.location.origin));
      toast.success(t('offresStage.lienCopie'));
    } catch {
      toast.error(t('offresStage.lienImpossible'));
    }
  };

  const mien = (offre) => peutPublier && (user?.role === 'admin' || offre.id_user_auteur === user?.id_user);

  return (
    <DashboardLayout>
      <PageHeader
        title={t('offresStage.titre')}
        subtitle={peutPublier ? t('offresStage.sousTitreAuteur') : t('offresStage.sousTitre')}
        actions={peutPublier ? [{ label: t('offresStage.nouvelle'), variant: 'contained', onClick: () => setChamp(versChamps()) }] : []}
      />

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5} sx={{ mb: 2.5 }}>
        <TextField
          size="small"
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          placeholder={t('offresStage.rechercher')}
          sx={{ flex: 1, minWidth: 220 }}
        />
        <TextField size="small" select value={idFiliere} onChange={(e) => setIdFiliere(e.target.value)} label={t('offresStage.filiere')} sx={{ minWidth: 200 }}>
          <MenuItem value="">{t('offresStage.toutesFilieres')}</MenuItem>
          {filieres.map((filiere) => (
            <MenuItem key={filiere.id_filiere} value={filiere.id_filiere}>
              {filiere.code_filiere ? `${filiere.code_filiere} · ${filiere.nom_filiere}` : filiere.nom_filiere}
            </MenuItem>
          ))}
        </TextField>
        <TextField size="small" select value={niveau} onChange={(e) => setNiveau(e.target.value)} label={t('offresStage.niveau')} sx={{ minWidth: 160 }}>
          <MenuItem value="">{t('offresStage.tousNiveaux')}</MenuItem>
          {niveaux.map((valeur) => (
            <MenuItem key={valeur} value={valeur}>
              {valeur}
            </MenuItem>
          ))}
        </TextField>
        {peutPublier && (
          <TextField size="small" select value={statut} onChange={(e) => setStatut(e.target.value)} label={t('offresStage.statut')} sx={{ minWidth: 160 }}>
            <MenuItem value="">{t('offresStage.tousStatuts')}</MenuItem>
            {STATUTS_OFFRE_STAGE.map((valeur) => (
              <MenuItem key={valeur} value={valeur}>
                {t(`offresStage.statuts.${valeur}`)}
              </MenuItem>
            ))}
          </TextField>
        )}
      </Stack>

      {erreur && (
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={charger}>
              {t('common.retry')}
            </Button>
          }
        >
          {t('offresStage.erreur')}
        </Alert>
      )}

      {!erreur && offres === null && <TableSkeleton rows={4} />}

      {!erreur && offres !== null && visibles.length === 0 && (
        <EmptyState
          icon={<BusinessCenter />}
          title={offres.length === 0 ? t('offresStage.aucune') : t('offresStage.aucuneFiltre')}
          actionLabel={peutPublier && offres.length === 0 ? t('offresStage.nouvelle') : undefined}
          onAction={() => setChamp(versChamps())}
        />
      )}

      {!erreur && visibles.length > 0 && (
        <Stack spacing={1.5}>
          {visibles.map((offre) => (
            <Paper key={offre.id} sx={{ p: { xs: 2, sm: 2.5 }, border: '1px solid', borderColor: 'divider' }}>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ alignItems: { md: 'flex-start' } }}>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {offre.titre}
                    </Typography>
                    {peutPublier && <Chip size="small" label={t(`offresStage.statuts.${offre.statut}`)} color={couleurStatut(offre.statut)} />}
                  </Stack>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
                    {[offre.entreprise, offre.ville, offre.filiere, offre.niveau].filter(Boolean).join(' · ')}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1, whiteSpace: 'pre-line' }}>
                    {offre.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                    {[periodeTexte(offre, t), offre.auteur].filter(Boolean).join(' · ')}
                  </Typography>
                </Box>

                <Stack spacing={1} sx={{ minWidth: { md: 230 }, alignItems: { md: 'flex-end' } }}>
                  {prixAffiche(offre) && (
                    <Typography sx={{ fontFamily: ds.font.board, fontWeight: 700, fontSize: '1.15rem' }}>
                      {t('offresStage.parMois', { montant: prixAffiche(offre) })}
                    </Typography>
                  )}
                  <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', justifyContent: { md: 'flex-end' } }}>
                    {lienCandidature(offre) && (
                      <Button size="small" variant="contained" href={lienCandidature(offre)} target="_blank" rel="noopener noreferrer" endIcon={<OpenInNew />}>
                        {t('offresStage.postuler')}
                      </Button>
                    )}
                    {offre.contact_email && (
                      <Button size="small" variant="outlined" href={`mailto:${offre.contact_email}`} startIcon={<MailOutline />}>
                        {t('offresStage.ecrireA', { courriel: offre.contact_email })}
                      </Button>
                    )}
                    {mien(offre) && offre.statut === 'publiee' && (
                      <Button size="small" variant="outlined" startIcon={<ContentCopy />} onClick={() => copier(offre)}>
                        {t('offresStage.partager')}
                      </Button>
                    )}
                    {mien(offre) && (
                      <Button size="small" onClick={() => setChamp(versChamps(offre))}>
                        {t('offresStage.modifier')}
                      </Button>
                    )}
                    {mien(offre) && offre.statut === 'publiee' && (
                      <Button size="small" onClick={() => changer(offre, 'close')}>
                        {t('offresStage.fermer')}
                      </Button>
                    )}
                    {mien(offre) && offre.statut === 'close' && (
                      <Button size="small" onClick={() => changer(offre, 'publiee')}>
                        {t('offresStage.rouvrir')}
                      </Button>
                    )}
                    {mien(offre) && offre.statut !== 'publiee' && (
                      <Button size="small" color="error" onClick={() => setASupprimer(offre)}>
                        {t('offresStage.supprimer')}
                      </Button>
                    )}
                    {mien(offre) && offre.statut === 'brouillon' && (
                      <Button size="small" variant="contained" onClick={() => changer(offre, 'publiee')} disabled={manquesPourPublier(offre).length > 0}>
                        {t('offresStage.publier')}
                      </Button>
                    )}
                  </Stack>
                </Stack>
              </Stack>
            </Paper>
          ))}
        </Stack>
      )}

      <Dialog open={Boolean(champ)} onClose={() => setChamp(null)} maxWidth="md" fullWidth>
        {champ && (
          <>
            <DialogTitle>{champ.id ? t('offresStage.modifier') : t('offresStage.nouvelle')}</DialogTitle>
            <DialogContent dividers>
              <Stack spacing={2}>
                <Typography variant="subtitle2" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 0.6 }}>
                  {t('offresStage.form.titreSection')}
                </Typography>
                <TextField
                  label={`${t('offresStage.champTitre')} *`}
                  value={champ.titre}
                  onChange={(e) => modifierChamp('titre', e.target.value)}
                  inputProps={{ maxLength: OFFRE_STAGE.titreMax }}
                  autoFocus
                />
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    label={`${t('offresStage.entreprise')} *`}
                    value={champ.entreprise}
                    onChange={(e) => modifierChamp('entreprise', e.target.value)}
                    inputProps={{ maxLength: OFFRE_STAGE.entrepriseMax }}
                    sx={{ flex: 1 }}
                  />
                  <TextField
                    label={`${t('offresStage.ville')} *`}
                    value={champ.ville}
                    onChange={(e) => modifierChamp('ville', e.target.value)}
                    inputProps={{ maxLength: OFFRE_STAGE.villeMax }}
                    sx={{ flex: 1 }}
                  />
                </Stack>
                <TextField
                  label={`${t('offresStage.description')} *`}
                  value={champ.description}
                  onChange={(e) => modifierChamp('description', e.target.value)}
                  multiline
                  minRows={4}
                  inputProps={{ maxLength: OFFRE_STAGE.descriptionMax }}
                  helperText={`${champ.description.trim().length} / ${OFFRE_STAGE.descriptionMax}`}
                />
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField select label={t('offresStage.filiere')} value={champ.id_filiere} onChange={(e) => modifierChamp('id_filiere', e.target.value)} sx={{ flex: 1 }}>
                    {user?.role === 'admin' && <MenuItem value="">{t('offresStage.toutesFilieres')}</MenuItem>}
                    {filieres.map((filiere) => (
                      <MenuItem key={filiere.id_filiere} value={filiere.id_filiere}>
                        {filiere.code_filiere ? `${filiere.code_filiere} · ${filiere.nom_filiere}` : filiere.nom_filiere}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    label={t('offresStage.niveau')}
                    value={champ.niveau}
                    onChange={(e) => modifierChamp('niveau', e.target.value)}
                    inputProps={{ maxLength: OFFRE_STAGE.niveauMax }}
                    placeholder="2A, 3A…"
                    sx={{ flex: 1 }}
                  />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    type="date"
                    label={t('offresStage.debut')}
                    value={champ.debut}
                    onChange={(e) => modifierChamp('debut', e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    sx={{ flex: 1 }}
                  />
                  <TextField
                    type="date"
                    label={t('offresStage.fin')}
                    value={champ.fin}
                    onChange={(e) => modifierChamp('fin', e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    sx={{ flex: 1 }}
                  />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    label={t('offresStage.gratification')}
                    value={champ.gratification}
                    onChange={(e) => modifierChamp('gratification', e.target.value)}
                    inputProps={{ inputMode: 'decimal' }}
                    helperText={t('offresStage.gratificationAide')}
                    sx={{ flex: 2 }}
                  />
                  <TextField select label={t('offresStage.devise')} value={champ.devise} onChange={(e) => modifierChamp('devise', e.target.value)} sx={{ flex: 1 }}>
                    {DEVISES.map((devise) => (
                      <MenuItem key={devise} value={devise}>
                        {devise}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>

                <Typography variant="subtitle2" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 0.6, pt: 1 }}>
                  {t('offresStage.form.contactSection')}
                </Typography>
                <TextField
                  label={t('offresStage.lien')}
                  value={champ.lien_candidature}
                  onChange={(e) => modifierChamp('lien_candidature', e.target.value)}
                  inputProps={{ maxLength: OFFRE_STAGE.lienMax }}
                  placeholder="https://"
                />
                <TextField
                  label={t('offresStage.courriel')}
                  value={champ.contact_email}
                  onChange={(e) => modifierChamp('contact_email', e.target.value)}
                  inputProps={{ maxLength: OFFRE_STAGE.emailMax }}
                  type="email"
                />
                {!champVide && (controle.motif === 'dates' || controle.motif === 'gratification' || controle.motif === 'devise' || controle.motif === 'lien' || controle.motif === 'email') && (
                  <Alert severity="warning">{t('offresStage.form.invalide')}</Alert>
                )}
                {manquesPourPublier({ lien_candidature: champ.lien_candidature, contact_email: champ.contact_email }).length > 0 && (
                  <Alert severity="info">{t('offresStage.form.sansCandidature')}</Alert>
                )}
              </Stack>
            </DialogContent>
            <DialogActions sx={{ px: 3, py: 2 }}>
              <Button onClick={() => setChamp(null)}>{t('common.cancel')}</Button>
              <Button variant="outlined" onClick={() => enregistrer(false)} disabled={Boolean(controle.motif) || envoi}>
                {t('offresStage.enregistrer')}
              </Button>
              {champ.statut !== 'publiee' && (
                <Button variant="contained" onClick={() => enregistrer(true)} disabled={!publiabe || envoi}>
                  {t('offresStage.enregistrerPublier')}
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>

      <ConfirmDialog
        open={Boolean(aSupprimer)}
        title={t('offresStage.supprimerTitre')}
        message={aSupprimer ? t('offresStage.supprimerMessage', { titre: aSupprimer.titre }) : ''}
        confirmLabel={t('offresStage.supprimer')}
        onConfirm={supprimer}
        onCancel={() => setASupprimer(null)}
      />
    </DashboardLayout>
  );
}
