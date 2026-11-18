/** Filières : mêmes données et actions en tableau ou fiches dépliables. */
import { IconButton } from '@mui/material';
import { Edit, Delete, ManageAccounts } from '@mui/icons-material';
import ListeGestion from '../gestion/ListeGestion';
export default function ListeFilieres({ modele: m }) {
 const { t } = m;
 const colonnes = [
  { cle: 'nom', libelle: t('ref.programs.cols.program'), afficher: (f) => f.code_filiere + ' · ' + f.nom_filiere },
  { cle: 'cycle', libelle: t('ref.programs.cols.cycle'), afficher: (f) => (f.intitule_cycle || (f.cycle ? t('ref.cycles.' + f.cycle) : '-')) + (f.premiere_annee_cycle ? ' · ' + t('ref.programs.startsYear', { year: f.premiere_annee_cycle }) : '') },
  { cle: 'regime', libelle: t('ref.programs.cols.regime'), afficher: (f) => t('ref.regimes.' + f.regime) },
  { cle: 'partenaire', libelle: t('ref.programs.cols.partner'), afficher: (f) => f.partenaire || '-' },
  { cle: 'responsables', libelle: t('ref.programs.heads'), afficher: (f) => f.responsables?.length ? f.responsables.map((r) => (r.user?.prenom || '') + ' ' + (r.user?.nom || '')).join(', ') : t('ref.programs.headsNone') },
 ];
 return <ListeGestion lignes={m.affichees} colonnes={colonnes} cleLigne={(f) => f.id_filiere} titre={(f) => f.nom_filiere}
   chargement={m.loading} erreur={m.erreurChargement} recharger={m.charger} vide={!m.filieres.length} creer={() => m.ouvrir()} replierTelephone
   actions={(f) => <>
    <IconButton onClick={() => m.setIdResponsables(f.id_filiere)} aria-label={t('ref.programs.headsTitle', { name: f.code_filiere })}><ManageAccounts fontSize="small" /></IconButton>
    <IconButton onClick={() => m.ouvrir(f)} aria-label={t('ref.common.editItem', { name: f.nom_filiere })}><Edit fontSize="small" /></IconButton>
    <IconButton color="error" onClick={() => m.setASupprimer(f)} aria-label={t('ref.common.deleteItem', { name: f.nom_filiere })}><Delete fontSize="small" /></IconButton>
   </>} />;
}
