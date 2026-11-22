/**
 * Les événements de l'année : filtre « à confirmer », tableau sur ordinateur, une fiche par événement sur téléphone.
 * Sur téléphone, les dates et l'état sont sous le titre et « Confirmer » reste dans les actions visibles, jamais replié.
 */
import { Box, Button, FormControlLabel, IconButton, Switch, Typography, useMediaQuery } from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';
import StateChip from '../../design-system/components/StateChip';
import EtatsGestion from '../gestion/EtatsGestion';
import ListeGestion from '../gestion/ListeGestion';
import { hhmm } from './constantes';
import { nomCible } from './calendrier';

// Le type est une catégorie, pas un état : pastille neutre (le rouge et l'orange restent aux états).
// Seul le Ramadan se distingue, en marine voilé, car il change la grille horaire.
const toneType = (type) => (type === 'ramadan' ? 'info' : 'neutral');

function Dates({ evenement: e, plage }) {
  return (
    <Box component="span" sx={{ whiteSpace: 'nowrap' }}>
      {plage(e.date_debut, e.date_fin)}
      {e.heure_debut && (
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
          {hhmm(e.heure_debut)} – {hhmm(e.heure_fin)}
        </Typography>
      )}
    </Box>
  );
}

/** Seule la date à confirmer appelle une action : elle seule est signalée. */
const EtatDate = ({ evenement, t }) =>
  evenement.date_confirmee ? (
    <Typography variant="body2" component="span" color="text.secondary">
      {t('ref.calendar.confirmed')}
    </Typography>
  ) : (
    <StateChip tone="warning">{t('ref.calendar.toConfirm')}</StateChip>
  );

export default function SectionEvenements({ modele: m }) {
  const { t } = m;
  const telephone = useMediaQuery('(max-width:699px)');
  const moyen = useMediaQuery((theme) => theme.breakpoints.up('md'));
  // Même seuil qu'avant UIX-06c : sous 900 px, le tableau garde dates, titre, type, état et actions
  const masquees = telephone ? ['dates', 'titre', 'etat'] : moyen ? [] : ['portee', 'seances'];
  const colonnes = [
    { cle: 'dates', libelle: t('ref.calendar.eventCols.dates'), afficher: (e) => <Dates evenement={e} plage={m.plage} /> },
    { cle: 'titre', libelle: t('ref.calendar.eventCols.title'), afficher: (e) => <Box sx={{ fontWeight: 600 }}>{e.titre}</Box> },
    {
      cle: 'type',
      libelle: t('ref.calendar.eventCols.type'),
      afficher: (e) => <StateChip tone={toneType(e.type_evenement)}>{t(`ref.eventTypes.${e.type_evenement}`)}</StateChip>,
    },
    { cle: 'portee', libelle: t('ref.calendar.eventCols.scope'), afficher: (e) => nomCible(e, m.cibles) ?? t('ref.scopes.etablissement') },
    {
      cle: 'seances',
      libelle: t('ref.calendar.eventCols.blocking'),
      afficher: (e) => (e.bloque_affectations ? t('ref.calendar.blocking') : t('ref.calendar.notBlocking')),
    },
    { cle: 'etat', libelle: t('ref.calendar.eventCols.state'), afficher: (e) => <EtatDate evenement={e} t={t} /> },
  ];
  const sansLigne = m.chargementEvenements || m.erreurEvenements || m.evenementsAffiches.length === 0;
  return (
    <Box component="section" aria-labelledby="titre-evenements">
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 1.5, mb: 1.5 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1.5 }}>
          <Typography id="titre-evenements" variant="h2" component="h2">
            {t('ref.calendar.events')}
          </Typography>
          {m.nbAConfirmer > 0 && <StateChip tone="warning">{t('ref.calendar.toConfirmCount', { count: m.nbAConfirmer })}</StateChip>}
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1.5, marginInlineStart: 'auto' }}>
          <FormControlLabel
            control={<Switch checked={m.aConfirmerSeulement} onChange={(e) => m.setAConfirmerSeulement(e.target.checked)} />}
            label={t('ref.calendar.onlyToConfirm')}
          />
          <Button variant="contained" startIcon={<Add />} onClick={() => m.ouvrirEvenement()}>
            {t('ref.calendar.addEvent')}
          </Button>
        </Box>
      </Box>
      {sansLigne ? (
        <EtatsGestion
          chargement={m.chargementEvenements}
          erreur={m.erreurEvenements}
          recharger={() => m.chargerEvenements()}
          vide={m.evenements.length === 0}
          titreVide={m.evenements.length === 0 ? t('ref.calendar.noEvents') : undefined}
          aideVide={t('gestion.calendrier.evenementsAide')}
        />
      ) : (
        <ListeGestion
          lignes={m.evenementsAffiches}
          colonnes={colonnes.filter((col) => !masquees.includes(col.cle))}
          cleLigne={(e) => e.id_evenement}
          titre={(e) => e.titre}
          complementTitre={(e) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1, mt: 0.5 }}>
              <Typography variant="body2" component="span">
                <Dates evenement={e} plage={m.plage} />
              </Typography>
              <EtatDate evenement={e} t={t} />
            </Box>
          )}
          actions={(e) => (
            <>
              {!e.date_confirmee && <Button onClick={() => m.ouvrirConfirmation(e)}>{t('ref.calendar.confirm')}</Button>}
              <IconButton onClick={() => m.ouvrirEvenement(e)} aria-label={t('ref.common.editItem', { name: e.titre })}>
                <Edit fontSize="small" />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => m.setASupprimer({ type: 'evenement', item: e })}
                aria-label={t('ref.common.deleteItem', { name: e.titre })}
              >
                <Delete fontSize="small" />
              </IconButton>
            </>
          )}
        />
      )}
    </Box>
  );
}
