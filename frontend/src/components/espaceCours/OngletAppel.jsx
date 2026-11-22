import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Alert, Box, Chip, List, ListItem, ListItemButton, ListItemText, Paper, Skeleton } from '@mui/material';
import EmptyState from '../../design-system/components/EmptyState';
import BoutonImprimer from '../appel/BoutonImprimer';
import { espaceCoursAPI } from '../../services/espaceCours';
import { localeEcran } from '../../utils/dates';
// La date de l'école, pas celle du fuseau du navigateur (faux entre 23 h et minuit avec une base de fuseaux ancienne)
import { aujourdhui } from '../../../../shared/dates.js';

const COULEUR = { a_venir: 'default', a_faire: 'default', ouvert: 'info', ferme: 'success' };

/**
 * Onglet « Appel » d'une classe (lot E-7, M-1) : ses séances des 7 prochains jours et passées, la plus
 * récente d'abord, avec l'état de l'appel et son bilan. Une séance s'ouvre si son appel existe (pour le
 * revoir ou le corriger), si elle a lieu aujourd'hui (pour le faire), ou si son appel non fait se
 * saisit encore après coup (dans les 7 jours, selon le serveur) ; sinon elle reste en lecture. Chaque
 * séance imprime sa liste d'appel, à l'avance pour celles à venir.
 */
export default function OngletAppel({ idCours, idGroupe }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [seances, setSeances] = useState(null);
  const [erreur, setErreur] = useState(false);
  const locale = localeEcran(i18n.language);

  useEffect(() => {
    espaceCoursAPI.appels(idCours, idGroupe).then(setSeances).catch(() => setErreur(true));
  }, [idCours, idGroupe]);

  if (erreur) return <Alert severity="warning">{t('common.errorLoad')}</Alert>;
  if (!seances) return <Skeleton variant="rounded" height={160} />;
  if (!seances.length) return <EmptyState title={t('espaceCours.appel.aucune')} description={t('espaceCours.appel.aucuneAide')} />;

  const date = (s) => new Date(`${s.date}T12:00:00`).toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long' });
  const enLettres = (iso) => new Date(`${iso}T12:00:00Z`).toLocaleDateString(locale, { timeZone: 'UTC', day: 'numeric', month: 'long' });
  const bilan = (s) => {
    if (s.appel === 'a_venir') return t('espaceCours.appel.aVenirAide');
    if (s.appel !== 'a_faire') return t('espaceCours.appel.bilan', { presents: s.presents, retards: s.retards, absents: s.absents ?? 0 });
    if (s.date === aujourdhui()) return t('espaceCours.appel.aFaireAujourdhui');
    return s.saisie_apres_coup ? t('espaceCours.appel.aSaisir', { limite: enLettres(s.saisie_possible_jusqu_au) }) : t('espaceCours.appel.nonFait');
  };
  // L'état affiché : « à saisir » pour un appel non fait encore saisissable après coup
  const etat = (s) => (s.appel === 'a_faire' && s.saisie_apres_coup ? 'a_saisir' : s.appel);

  return (
    <Paper variant="outlined">
      <List disablePadding>
        {seances.map((s, i) => {
          const ouvrable = s.appel === 'ouvert' || s.appel === 'ferme' || (s.appel === 'a_faire' && (s.date === aujourdhui() || s.saisie_apres_coup));
          return (
            <ListItem key={s.id_affectation} disablePadding divider={i < seances.length - 1} secondaryAction={<BoutonImprimer idAffectation={s.id_affectation} icone />}>
              <ListItemButton disabled={!ouvrable} onClick={() => navigate(`/appel/${s.id_affectation}`)} sx={{ gap: 2, '&.Mui-disabled': { opacity: 1 } }}>
                <ListItemText
                  // Majuscule à la première lettre seulement (« Jeudi 15 octobre »)
                  primary={<Box component="span" sx={{ display: 'inline-block', '&::first-letter': { textTransform: 'uppercase' } }}>{date(s)}</Box>}
                  secondary={[`${s.heure_debut}–${s.heure_fin}`, s.salle, bilan(s)].filter(Boolean).join(' · ')}
                />
                <Chip size="small" color={COULEUR[s.appel]} variant={s.appel === 'ferme' ? 'filled' : 'outlined'} label={t(`espaceCours.appel.etats.${etat(s)}`)} sx={{ mr: 4 }} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
}
