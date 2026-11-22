/** Les semestres de l'année affichée : tableau sur ordinateur, une fiche par semestre sur téléphone. */
import { Box, Button, IconButton, Typography, useMediaQuery } from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';
import EtatsGestion from '../gestion/EtatsGestion';
import ListeGestion from '../gestion/ListeGestion';

export default function SectionSemestres({ modele: m }) {
  const { t } = m;
  const periodes = m.annee?.periodes || [];
  // Sur téléphone, le code est déjà le titre de la fiche
  const telephone = useMediaQuery('(max-width:699px)');
  const colonnes = [
    { cle: 'code', libelle: t('ref.calendar.cols.code'), afficher: (p) => <Box sx={{ fontWeight: 600 }}>{p.code}</Box> },
    {
      cle: 'dates',
      libelle: t('ref.calendar.cols.dates'),
      afficher: (p) => (
        <>
          {m.plage(p.date_debut, p.date_fin)}
          {p.libelle && (
            <Typography component="span" variant="body2" color="text.secondary">
              {' '}
              · {p.libelle}
            </Typography>
          )}
        </>
      ),
    },
    { cle: 'semaines', libelle: t('ref.calendar.cols.weeks'), afficher: (p) => p.nb_semaines },
  ].filter((col) => !(telephone && col.cle === 'code'));
  return (
    <Box component="section" aria-labelledby="titre-semestres">
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 1, mb: 1.5 }}>
        <Typography id="titre-semestres" variant="h2" component="h2">
          {t('ref.calendar.semesters')}
        </Typography>
        <Button startIcon={<Add />} onClick={() => m.ouvrirPeriode()}>
          {t('ref.calendar.addSemester')}
        </Button>
      </Box>
      {periodes.length === 0 ? (
        <EtatsGestion vide titreVide={t('ref.calendar.noSemester')} aideVide={t('gestion.calendrier.semestresAide')} />
      ) : (
        <ListeGestion
          lignes={periodes}
          colonnes={colonnes}
          cleLigne={(p) => p.id_periode}
          titre={(p) => p.code}
          actions={(p) => (
            <>
              <IconButton onClick={() => m.ouvrirPeriode(p)} aria-label={t('ref.common.editItem', { name: p.code })}>
                <Edit fontSize="small" />
              </IconButton>
              <IconButton color="error" onClick={() => m.setASupprimer({ type: 'periode', item: p })} aria-label={t('ref.common.deleteItem', { name: p.code })}>
                <Delete fontSize="small" />
              </IconButton>
            </>
          )}
        />
      )}
    </Box>
  );
}
