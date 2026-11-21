/** Salles : tableau sur ordinateur ; sur téléphone, une fiche par salle, places et état visibles d'abord, le reste dans « Détails ». */
import { Box, IconButton, Typography, useMediaQuery } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import StateChip from '../../design-system/components/StateChip';
import ListeGestion from '../gestion/ListeGestion';
import { cleEtage } from './fiche';

/** La cellule commune coupe n'importe où (« N-GEN/1 ») : ici on coupe aux espaces, et une valeur courte reste d'un seul tenant. */
const Texte = ({ children, insecable = false }) => (
  <Box component="span" sx={{ overflowWrap: 'normal', whiteSpace: insecable ? 'nowrap' : 'normal' }}>
    {children}
  </Box>
);

/** Seule l'exception est signalée : une salle disponible reste discrète. */
function EtatSalle({ salle, t }) {
  return salle.disponible ? (
    <Typography variant="body2" color="text.secondary" component="span" sx={{ whiteSpace: 'nowrap' }}>
      {t('ref.rooms.available')}
    </Typography>
  ) : (
    <StateChip tone="danger">{t('ref.rooms.unavailable')}</StateChip>
  );
}

export default function ListeSalles({ modele: m }) {
  const { t } = m;
  // Mêmes seuils qu'avant UIX-06c pour le tableau ; la fiche du téléphone (sous 700 px) garde tous les champs
  const telephone = useMediaQuery('(max-width:699px)');
  const large = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const moyen = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const masquees = telephone ? [] : [...(large ? [] : ['etage', 'equipements']), ...(moyen ? [] : ['reservation'])];
  const etage = (s) => {
    const cle = cleEtage(s.etage);
    return cle ? t('ref.rooms.' + cle[0], cle[1]) : '-';
  };
  const colonnes = [
    { cle: 'nom', libelle: t('ref.rooms.cols.name'), afficher: (s) => <Texte>{s.nom_salle}</Texte> },
    { cle: 'type', libelle: t('ref.rooms.cols.type'), afficher: (s) => <Texte>{t('ref.roomTypes.' + s.type_salle, { defaultValue: s.type_salle })}</Texte> },
    { cle: 'campus', libelle: t('ref.rooms.cols.campus'), afficher: (s) => <Texte>{s.campus?.nom ?? '-'}</Texte> },
    { cle: 'capacite', libelle: t('ref.rooms.cols.capacity'), afficher: (s) => s.capacite },
    { cle: 'examen', libelle: t('ref.rooms.cols.exam'), afficher: (s) => s.capacite_examen ?? '-' },
    { cle: 'etage', libelle: t('ref.rooms.cols.floor'), afficher: (s) => <Texte insecable>{etage(s)}</Texte> },
    { cle: 'equipements', libelle: t('ref.rooms.cols.equipment'), afficher: (s) => (s.equipements || []).join(', ') || '-' },
    {
      cle: 'reservation',
      libelle: t('ref.rooms.cols.booking'),
      afficher: (s) => <Texte insecable>{t(s.reservable_par === 'enseignants' ? 'ref.rooms.bookingTeachers' : 'ref.rooms.bookingAdmin')}</Texte>,
    },
    { cle: 'etat', libelle: t('ref.rooms.cols.state'), afficher: (s) => <EtatSalle salle={s} t={t} /> },
  ];
  return (
    <ListeGestion
      lignes={m.affichees}
      colonnes={colonnes.filter((col) => !masquees.includes(col.cle))}
      cleLigne={(s) => s.id_salle}
      titre={(s) => s.nom_salle}
      complementTitre={(s) => (
        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1, mt: 0.5 }}>
          <Typography variant="body2">{t('gestion.salles.places', { count: s.capacite })}</Typography>
          <EtatSalle salle={s} t={t} />
        </Box>
      )}
      replierTelephone
      chargement={m.loading}
      erreur={m.erreurChargement}
      recharger={m.charger}
      vide={!m.salles.length}
      titreVide={m.salles.length ? undefined : t('ref.rooms.emptyTitle')}
      creer={m.campus.length ? () => m.ouvrir() : undefined}
      actions={(s) => (
        <>
          <IconButton onClick={() => m.ouvrir(s)} aria-label={t('ref.common.editItem', { name: s.nom_salle })}>
            <Edit fontSize="small" />
          </IconButton>
          <IconButton color="error" onClick={() => m.setASupprimer(s)} aria-label={t('ref.common.deleteItem', { name: s.nom_salle })}>
            <Delete fontSize="small" />
          </IconButton>
        </>
      )}
    />
  );
}
