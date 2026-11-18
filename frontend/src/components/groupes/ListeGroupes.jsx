/** Arbre de groupes : parent explicite et commandes conservées sur téléphone. */
import { Box, Button, IconButton, Typography } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import ListeGestion from '../gestion/ListeGestion';
import DesactiverGroupe from '../comptes/DesactiverGroupe';
import StateChip from '../../design-system/components/StateChip';
import { TOUTES } from '../../utils/annees';
import { ENFANT_DE } from './fiche';
export default function ListeGroupes({ modele: m }) {
 const { t } = m;
 const noms = new Map(m.lignes.map((g) => [g.id_groupe, g.nom_groupe]));
 const parent = (g) => noms.get(g.id_groupe_parent) || t('gestion.groupes.racine');
 const contexteVide = { program: m.filiereCourante?.code_filiere || '', year: m.anneeScolaire };
 const titreVide = t(m.valeurAnnee === TOUTES ? 'ref.groups.emptyTitleAllYears' : 'ref.groups.emptyTitle', contexteVide);
 const colonnes = [
  { cle: 'nom', libelle: t('ref.groups.cols.group'), afficher: (g) => <Box sx={{ paddingInlineStart: Math.min(g.profondeur, 2) * 12 + 'px' }}><Typography variant="body2" fontWeight={600}>{g.nom_groupe}</Typography>{m.valeurAnnee === TOUTES && g.profondeur === 0 && g.id_annee != null && <Typography variant="caption" color="text.secondary">{g.annee_scolaire}</Typography>}{g.id_annee == null && <StateChip tone="warning" title={t('ref.groups.unknownYearHelp', { text: g.annee_scolaire })}>{t('ref.groups.unknownYear')}</StateChip>}</Box> },
  { cle: 'parent', libelle: t('gestion.groupes.parent'), afficher: parent },
  { cle: 'type', libelle: t('ref.groups.cols.type'), afficher: (g) => t('ref.groupTypes.' + g.type_groupe) },
  { cle: 'niveau', libelle: t('ref.groups.cols.level'), afficher: (g) => g.niveau },
  { cle: 'effectif', libelle: t('ref.groups.cols.size'), afficher: (g) => <>{g.effectif}{m.ecartEffectif(g) !== null && <StateChip tone="warning" title={t('ref.groups.sizeGap', { sum: m.ecartEffectif(g) })}>{t('ref.groups.gap')}</StateChip>}</> },
 ];
 return <ListeGestion lignes={m.lignes} colonnes={colonnes} cleLigne={(g) => g.id_groupe} titre={(g) => g.nom_groupe}
  complementTitre={(g) => <Typography variant="body2" color="text.secondary">{t('gestion.groupes.parent')} : {parent(g)}</Typography>}
  replierTelephone chargement={m.loading || m.initialisation} erreur={m.erreurChargement} recharger={m.filiere ? m.chargerArbre : m.chargerFilieres} vide={!m.filtreVide} titreVide={titreVide} creer={m.filiere ? () => m.ouvrir() : undefined}
  actions={(g) => <>
   {ENFANT_DE[g.type_groupe] && <Button startIcon={<Add />} onClick={() => m.ouvrir({ parent: g })} aria-label={t('ref.groups.addChild', { type: t('ref.groupTypes.' + ENFANT_DE[g.type_groupe]), name: g.nom_groupe })}>{t('ref.groups.add.' + ENFANT_DE[g.type_groupe])}</Button>}
   <IconButton onClick={() => m.ouvrir({ groupe: g })} aria-label={t('ref.common.editItem', { name: g.nom_groupe })}><Edit fontSize="small" /></IconButton>
   {m.user?.role === 'admin' && <DesactiverGroupe groupe={g} />}
   <IconButton color="error" onClick={() => m.setASupprimer(g)} aria-label={t('ref.common.deleteItem', { name: g.nom_groupe })}><Delete fontSize="small" /></IconButton>
  </>} />;
}
