import { useEffect, useState } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Button, Chip, Link, Paper, Stack, Typography } from '@mui/material';
import { BusinessCenter, MailOutline, OpenInNew } from '@mui/icons-material';
import { offreStageAPI } from '../services/api';
import { identiteEcole } from '../services/etablissement';
import { ds } from '../design-system/tokens';
import { lienCandidature, periodeDe, prixAffiche } from '../utils/offresStage';

const periodeTexte = (offre, t) => {
  const periode = periodeDe(offre);
  if (periode.type === 'periode') return t('offresStage.periode', { debut: periode.debut, fin: periode.fin });
  if (periode.type === 'debut') return t('offresStage.aPartirDu', { debut: periode.debut });
  if (periode.type === 'fin') return t('offresStage.jusquAu', { fin: periode.fin });
  return null;
};

/**
 * Fiche partagée d'une offre de stage (STA-01) : /offres-stage/p/<jeton>, lue sans compte.
 * Aucune navigation, aucun identifiant interne : le jeton ne donne que la lecture de cette offre,
 * et le serveur ne rend que les offres publiées (une offre fermée répond 404).
 */
export default function OffreStagePublique() {
  const { t, i18n } = useTranslation();
  const { jeton } = useParams();
  const ecole = identiteEcole();
  const [offre, setOffre] = useState(null);
  const [etat, setEtat] = useState('chargement');

  useEffect(() => {
    let vivant = true;
    offreStageAPI
      .publique(jeton)
      .then((lue) => {
        if (!vivant) return;
        setOffre(lue);
        setEtat('trouvee');
      })
      .catch(() => {
        if (vivant) setEtat('introuvable');
      });
    return () => {
      vivant = false;
    };
  }, [jeton]);

  useEffect(() => {
    if (offre) document.title = `${offre.titre} · ${ecole.nom_court}`;
    return () => {
      document.title = ecole.produit || ecole.nom_court;
    };
  }, [offre, ecole]);

  const publication = offre?.publiee_le
    ? new Date(offre.publiee_le).toLocaleDateString(i18n.language === 'en' ? 'en-GB' : 'fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
    : null;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: { xs: 3, md: 6 }, px: 2 }}>
      <Box sx={{ maxWidth: 760, mx: 'auto' }}>
        <Stack direction="row" spacing={1} sx={{ mb: 2, alignItems: 'center', justifyContent: 'center' }}>
          <BusinessCenter fontSize="small" color="primary" />
          <Typography variant="body2" color="text.secondary">
            {t('offresStage.partage.partagePar', { ecole: ecole.nom })}
          </Typography>
        </Stack>

        <Paper sx={{ p: { xs: 2.5, sm: 4 }, border: '1px solid', borderColor: 'divider' }}>
          {etat === 'introuvable' && (
            <Stack spacing={2} sx={{ alignItems: 'center', textAlign: 'center', py: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {t('offresStage.partage.introuvable')}
              </Typography>
              <Button component={RouterLink} to="/" variant="outlined">
                {t('offresStage.partage.retour')}
              </Button>
            </Stack>
          )}

          {etat === 'chargement' && (
            <Stack spacing={1.5}>
              <Box sx={{ height: 28, bgcolor: 'action.hover', borderRadius: 1 }} />
              <Box sx={{ height: 18, width: '45%', bgcolor: 'action.hover', borderRadius: 1 }} />
              <Box sx={{ height: 120, bgcolor: 'action.hover', borderRadius: 1, mt: 2 }} />
            </Stack>
          )}

          {etat === 'trouvee' && offre && (
            <Stack spacing={2}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
                  {offre.titre}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
                  {[offre.entreprise, offre.ville].filter(Boolean).join(' · ')}
                </Typography>
              </Box>

              <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', alignItems: 'center' }}>
                {offre.filiere && <Chip size="small" label={offre.filiere} />}
                {offre.niveau && <Chip size="small" label={offre.niveau} variant="outlined" />}
                {prixAffiche(offre) && (
                  <Typography sx={{ fontFamily: ds.font.board, fontWeight: 700, fontSize: '1.25rem' }}>
                    {t('offresStage.parMois', { montant: prixAffiche(offre) })}
                  </Typography>
                )}
              </Stack>

              {periodeTexte(offre, t) && (
                <Typography variant="body2" color="text.secondary">
                  {periodeTexte(offre, t)}
                </Typography>
              )}

              <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                {offre.description}
              </Typography>

              <Box sx={{ pt: 1 }}>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, textTransform: 'uppercase', letterSpacing: 0.6 }}>
                  {t('offresStage.partage.postuler')}
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                  {lienCandidature(offre) && (
                    <Button variant="contained" href={lienCandidature(offre)} target="_blank" rel="noopener noreferrer" endIcon={<OpenInNew />}>
                      {t('offresStage.postuler')}
                    </Button>
                  )}
                  {offre.contact_email && (
                    <Button variant="outlined" href={`mailto:${offre.contact_email}`} startIcon={<MailOutline />}>
                      {t('offresStage.ecrireA', { courriel: offre.contact_email })}
                    </Button>
                  )}
                </Stack>
              </Box>

              {publication && (
                <Typography variant="caption" color="text.secondary" sx={{ pt: 1 }}>
                  {t('offresStage.partage.apres', { date: publication })}
                </Typography>
              )}
            </Stack>
          )}
        </Paper>

        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 2 }}>
          <Link component={RouterLink} to="/" underline="hover">
            {t('offresStage.partage.retour')}
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
