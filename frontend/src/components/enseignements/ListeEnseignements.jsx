/** Enseignements, sélection et équipe : aucun champ ou commande perdu en téléphone. */
import { Checkbox, IconButton } from '@mui/material';
import { GroupAdd, CallSplit, Edit, Delete } from '@mui/icons-material';
import ListeGestion from '../gestion/ListeGestion';
import EquipeListe from './EquipeListe';
export default function ListeEnseignements({ modele: m }) {
 const { t } = m;
 const colonnes = [
  { cle: 'module', libelle: t('ref.teaching.cols.module'), afficher: (e) => (e.libelle || e.composante.cours.nom_cours) + ' · ' + e.composante.cours.code_cours + ' · ' + e.composante.cours.semestre },
  { cle: 'type', libelle: t('ref.teaching.cols.type'), afficher: (e) => e.composante.type + ' · ' + t('ref.modes.' + e.composante.modalite) },
  { cle: 'groupes', libelle: t('ref.teaching.cols.groups'), afficher: (e) => e.groupes.map((g) => g.nom_groupe).join(', ') + (e.groupes.length > 1 ? ' · ' + t('ref.teaching.shared') : '') },
  { cle: 'equipe', libelle: t('ref.teaching.team.col'), afficher: (e) => <EquipeListe services={e.services} onOuvrir={() => m.setIdEquipe(e.id_enseignement)} /> },
  { cle: 'effectif', libelle: t('ref.teaching.cols.size'), afficher: (e) => e.effectif },
  { cle: 'heures', libelle: t('ref.teaching.cols.hours'), afficher: (e) => m.nombre.format(e.heures_prevues) + ' h' },
  { cle: 'seances', libelle: t('ref.teaching.cols.sessions'), afficher: (e) => e.nb_seances },
 ];
 return <ListeGestion lignes={m.tries} colonnes={colonnes} cleLigne={(e) => e.id_enseignement} titre={(e) => e.libelle || e.composante.cours.nom_cours}
  selection={{ ligne: (e) => <Checkbox checked={m.selection.has(e.id_enseignement)} onChange={() => m.basculer(e.id_enseignement)} inputProps={{ 'aria-label': t('ref.teaching.select', { name: e.composante.cours.nom_cours + ' ' + e.composante.type }) }} /> }}
  chargement={m.loading || m.initialisation} erreur={m.erreurInitiale ? t('common.errorLoad') : m.erreurChargement} recharger={m.erreurInitiale ? m.chargerOptions : m.charger} vide replierTelephone
  actions={(e) => {
   const nom = e.composante.cours.nom_cours;
   return <>
    <IconButton onClick={() => m.setIdEquipe(e.id_enseignement)} aria-label={t('ref.teaching.team.manage', { name: nom })}><GroupAdd fontSize="small" /></IconButton>
    {e.groupes.length > 1 && <IconButton onClick={() => m.scinder(e)} aria-label={t('ref.teaching.splitItem', { name: nom })}><CallSplit fontSize="small" /></IconButton>}
    <IconButton onClick={() => m.setEdition({ id_enseignement: e.id_enseignement, heures_prevues: e.heures_prevues, libelle: e.libelle || '', nom })} aria-label={t('ref.common.editItem', { name: nom })}><Edit fontSize="small" /></IconButton>
    <IconButton color="error" onClick={() => m.setASupprimer(e)} aria-label={t('ref.common.deleteItem', { name: nom })}><Delete fontSize="small" /></IconButton>
   </>;
  }} />;
}
