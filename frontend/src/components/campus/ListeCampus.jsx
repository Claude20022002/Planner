/** Campus : tableau sur ordinateur, une fiche par campus sur téléphone ; l'adresse manquante est signalée. */
import { Box, IconButton, Typography } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import StateChip from '../../design-system/components/StateChip';
import ListeGestion from '../gestion/ListeGestion';

export default function ListeCampus({ modele: m }) {
  const { t } = m;
  const colonnes = [
    { cle: 'code', libelle: t('ref.campus.cols.code'), afficher: (c) => <Box sx={{ fontWeight: 600 }}>{c.code}</Box> },
    { cle: 'nom', libelle: t('ref.campus.cols.name'), afficher: (c) => c.nom },
    {
      cle: 'adresse',
      libelle: t('ref.campus.cols.address'),
      afficher: (c) => (
        <Typography variant="body2" component="span" color={c.adresse ? 'text.primary' : 'text.secondary'}>
          {c.adresse || t('ref.campus.addressMissing')}
        </Typography>
      ),
    },
    { cle: 'salles', libelle: t('ref.campus.cols.rooms'), afficher: (c) => c.nb_salles },
    {
      cle: 'etat',
      libelle: t('ref.campus.cols.state'),
      afficher: (c) =>
        c.actif ? (
          <Typography variant="body2" component="span" color="text.secondary">
            {t('ref.campus.active')}
          </Typography>
        ) : (
          <StateChip tone="warning">{t('ref.campus.inactive')}</StateChip>
        ),
    },
  ];
  return (
    <ListeGestion
      lignes={m.campus}
      colonnes={colonnes}
      cleLigne={(c) => c.id_campus}
      titre={(c) => c.nom}
      chargement={m.loading}
      erreur={m.erreurChargement}
      recharger={m.charger}
      vide
      titreVide={t('gestion.campus.vide')}
      creer={() => m.ouvrir()}
      actions={(c) => (
        <>
          <IconButton onClick={() => m.ouvrir(c)} aria-label={t('ref.common.editItem', { name: c.nom })}>
            <Edit fontSize="small" />
          </IconButton>
          <IconButton color="error" onClick={() => m.setASupprimer(c)} aria-label={t('ref.common.deleteItem', { name: c.nom })}>
            <Delete fontSize="small" />
          </IconButton>
        </>
      )}
    />
  );
}
