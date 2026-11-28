/** Liste des comptes : tri et sélection conservés, commandes nommées pour chaque personne. */
import { Checkbox, Chip, IconButton, TableSortLabel } from '@mui/material';
import { Edit, Delete, PhonelinkErase } from '@mui/icons-material';
import StatutCompte from './StatutCompte';
import BoutonsCompte from './BoutonsCompte';
import ListePersonnes from '../personnes/ListePersonnes';
import PaginationPersonnes from '../personnes/PaginationPersonnes';

export default function ListeComptes({ modele: m }) {
  const { t, actions, cochables } = m;
  const colonnes = ['nom', 'prenom', 'identifiant', 'email', 'role', 'telephone', 'statut'].map((cle) => ({
    cle, libelle: t('utilisateurs.colonnes.' + cle),
    entete: ['nom', 'prenom', 'identifiant', 'email'].includes(cle) ? <TableSortLabel active={m.getSortDir(cle) !== undefined} direction={m.getSortDir(cle) || 'asc'} onClick={() => m.requestSort(cle)}>{t('utilisateurs.colonnes.' + cle)}</TableSortLabel> : null,
    afficher: (u) => cle === 'statut' ? <StatutCompte compte={u} /> : cle === 'role'
      ? <Chip label={t('roles.' + u.role, { defaultValue: u.role })} size="small" variant="outlined" />
      : u[cle] || '-',
  }));
  const selection = {
    entete: <Checkbox checked={cochables.length > 0 && cochables.every((id) => actions.coches.has(id))}
      indeterminate={cochables.some((id) => actions.coches.has(id)) && !cochables.every((id) => actions.coches.has(id))}
      onChange={() => actions.toutBasculer(cochables)} disabled={!cochables.length}
      inputProps={{ 'aria-label': t('comptes.toutSelectionner') }} />,
    ligne: (u) => <Checkbox checked={actions.coches.has(u.id_user)} onChange={() => actions.basculer(u.id_user)}
      disabled={!cochables.includes(u.id_user)} inputProps={{ 'aria-label': t('comptes.selectionnerNom', { nom: u.prenom + ' ' + u.nom }) }} />,
  };
  return <>
    <ListePersonnes lignes={m.visibles} colonnes={colonnes} selection={selection} titre={(u) => u.prenom + ' ' + u.nom}
      chargement={m.loading} erreur={m.erreurChargement} recharger={m.loadUtilisateurs} vide={!m.utilisateurs.length} creer={() => m.ouvrirFormulaire()}
      actions={(u) => {
        const nom = u.prenom + ' ' + u.nom;
        return <>
          <IconButton onClick={() => m.ouvrirFormulaire(u)} aria-label={t('utilisateurs.modifierNom', { nom })}><Edit /></IconButton>
          {u.mfa_active && <IconButton onClick={() => m.setMfaAReinitialiser(u)} aria-label={t('utilisateurs.mfaNom', { nom })} title={t('utilisateurs.mfaTitre')}><PhonelinkErase /></IconButton>}
          <BoutonsCompte compte={u} actions={actions} estMoi={u.id_user === m.moi?.id_user} />
          <IconButton color="error" onClick={() => m.setConfirmDialog({ open: true, id: u.id_user })} aria-label={t('utilisateurs.supprimerNom', { nom })}><Delete /></IconButton>
        </>;
      }} />
    {!m.loading && !m.erreurChargement && <PaginationPersonnes total={m.total} page={m.page} changerPage={m.setPage} taille={m.rowsPerPage} changerTaille={m.setRowsPerPage} />}
  </>;
}
