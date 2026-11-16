/** Colonnes étudiants et actions identiques sur ordinateur et téléphone. */
import { IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import ListePersonnes from '../personnes/ListePersonnes';
import PaginationPersonnes from '../personnes/PaginationPersonnes';

export default function ListeEtudiants({ modele: m }) {
  const { t } = m;
  const champs = [
    ['numero', (e) => e.numero_etudiant], ['nom', (e) => e.user?.nom || '-'],
    ['prenom', (e) => e.user?.prenom || '-'], ['email', (e) => e.user?.email || '-'],
    ['niveau', (e) => e.niveau], ['groupe', (e) => e.groupe?.nom_groupe || '-'],
  ];
  return <>
    <ListePersonnes lignes={m.filteredEtudiants}
      colonnes={champs.map(([cle, afficher]) => ({ cle, afficher, libelle: t('etudiants.colonnes.' + cle) }))}
      titre={(e) => (e.user?.prenom || '') + ' ' + (e.user?.nom || '')}
      chargement={m.loading} erreur={m.erreurChargement} recharger={m.loadEtudiants} vide={!m.etudiants.length}
      actions={(e) => <>
        <IconButton onClick={() => m.handleEdit(e)} aria-label={t('etudiants.modifier') + ' ' + (e.user?.prenom || '') + ' ' + (e.user?.nom || '')}><Edit /></IconButton>
        <IconButton color="error" onClick={() => m.handleDelete(e.id_user)} aria-label={t('common.delete') + ' ' + (e.user?.prenom || '') + ' ' + (e.user?.nom || '')}><Delete /></IconButton>
      </>} />
    {!m.loading && !m.erreurChargement && <PaginationPersonnes total={m.total} page={m.page} changerPage={m.setPage} taille={m.rowsPerPage} changerTaille={m.setRowsPerPage} />}
  </>;
}
