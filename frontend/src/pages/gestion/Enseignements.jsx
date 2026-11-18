/** Page de préparation : filtres, bilan et enseignements existants dans le thème de gestion. */
import { Button, MenuItem, TextField } from '@mui/material';
import { AutoAwesome, MergeType } from '@mui/icons-material';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import EnteteGestion from '../../components/gestion/EnteteGestion';
import RechercheGestion from '../../components/gestion/RechercheGestion';
import EmptyState from '../../design-system/components/EmptyState';
import useEnseignements from '../../components/enseignements/useEnseignements';
import ListeEnseignements from '../../components/enseignements/ListeEnseignements';
import DialogsEnseignements from '../../components/enseignements/DialogsEnseignements';
import BilanGeneration from '../../components/enseignements/BilanGeneration';
export default function Enseignements() {
 const m = useEnseignements(); const { t } = m;
 const sansPeriode = !m.initialisation && !m.erreurInitiale && !m.periodes.length;
 return <DashboardLayout>
  <EnteteGestion contexte={t('ref.teaching.intro')}>
   <Button variant="outlined" startIcon={<MergeType />} onClick={m.mutualiser} disabled={m.loading || m.initialisation || m.selection.size < 2}>{t('ref.teaching.merge', { count: m.selection.size })}</Button>
   <Button variant="contained" startIcon={<AutoAwesome />} onClick={m.generer} disabled={!m.idPeriode || m.loading || m.initialisation}>{t('ref.teaching.generate')}</Button>
  </EnteteGestion>
  <RechercheGestion nombre={m.tries.length}>
   <TextField select fullWidth label={t('ref.teaching.period')} value={m.idPeriode} onChange={(e) => m.setIdPeriode(e.target.value)} sx={{ minWidth: 0 }}>
    {m.periodes.map((p) => <MenuItem key={p.id_periode} value={p.id_periode}>{p.libelle_annee} · {p.libelle}</MenuItem>)}
   </TextField>
   <TextField select fullWidth label={t('ref.curriculum.program')} value={m.filiere} onChange={(e) => m.setFiliere(e.target.value)} sx={{ minWidth: 0 }}>
    {m.user?.role === 'admin' && <MenuItem value="toutes">{t('ref.curriculum.allPrograms')}</MenuItem>}
    {m.filieres.map((f) => <MenuItem key={f.id_filiere} value={f.id_filiere}>{f.code_filiere} · {f.nom_filiere}</MenuItem>)}
   </TextField>
  </RechercheGestion>
  <BilanGeneration modele={m} />
  {sansPeriode ? <EmptyState title={t('gestion.enseignements.periodeAbsente')} description={t('ref.teaching.noPeriodBody')} /> : <ListeEnseignements modele={m} />}
  <DialogsEnseignements modele={m} />
 </DashboardLayout>;
}
