/** Toutes les données enseignants et actions, disponibles aussi en présentation téléphone. */
import { IconButton, Typography } from '@mui/material';
import { Delete, Edit, Psychology } from '@mui/icons-material';
import ListePersonnes from '../personnes/ListePersonnes';
import ChargeEnseignant from './ChargeEnseignant';

export default function ListeEnseignants({ modele: m }) {
  const { t, nombre } = m;
  const colonnes = [
    { cle: 'nom', libelle: t('ref.staff.cols.teacher'), afficher: (e) => <><Typography variant="body2" fontWeight={600}>{e.user?.nom} {e.user?.prenom}</Typography><Typography variant="caption" color="text.secondary">{e.user?.email}</Typography></> },
    { cle: 'departement', libelle: t('ref.staff.cols.department'), afficher: (e) => <>{e.departement}{e.specialite && e.specialite !== e.departement && <Typography variant="caption" display="block" color="text.secondary">{e.specialite}</Typography>}</> },
    { cle: 'statut', libelle: t('ref.staff.cols.status'), afficher: (e) => <>{t('ref.staff.statuses.' + e.statut)}{e.entreprise && <Typography variant="caption" display="block" color="text.secondary">{e.entreprise}</Typography>}</> },
    { cle: 'service', libelle: t('ref.staff.cols.due'), afficher: (e) => e.service_annuel_heures ? nombre.format(e.service_annuel_heures) + ' h' : '-' },
    { cle: 'charge', libelle: t('ref.staff.cols.planned'), afficher: (e) => <ChargeEnseignant charge={m.charges.parId.get(e.id_user)} nombre={nombre} /> },
    { cle: 'plafond', libelle: t('ref.staff.cols.weekly'), afficher: (e) => e.max_heures_semaine ? nombre.format(e.max_heures_semaine) + ' h' : '-' },
  ];
  return <ListePersonnes lignes={m.affiches} colonnes={colonnes} titre={(e) => (e.user?.prenom || '') + ' ' + (e.user?.nom || '')}
    chargement={m.loading} erreur={m.erreurChargement} recharger={m.charger} vide={!m.enseignants.length} creer={() => m.ouvrir()}
    actions={(e) => {
      const nom = (e.user?.prenom || '') + ' ' + (e.user?.nom || '');
      return <>
        <IconButton onClick={() => m.ouvrirCompetences(e)} aria-label={t('ref.staff.skillsTitle', { name: nom })} title={t('ref.staff.skills')}><Psychology fontSize="small" /></IconButton>
        <IconButton onClick={() => m.ouvrir(e)} aria-label={t('ref.common.editItem', { name: nom })}><Edit fontSize="small" /></IconButton>
        <IconButton color="error" onClick={() => m.setASupprimer(e)} aria-label={t('ref.common.deleteItem', { name: nom })}><Delete fontSize="small" /></IconButton>
      </>;
    }} />;
}
