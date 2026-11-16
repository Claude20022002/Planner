/** Page Comptes : outils, liste responsive et dialogues existants de gestion des accès. */
import { Button, Alert, Snackbar } from '@mui/material';
import { Add, Block } from '@mui/icons-material';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import EntetePersonnes from '../../components/personnes/EntetePersonnes';
import RecherchePersonnes from '../../components/personnes/RecherchePersonnes';
import ListeComptes from '../../components/comptes/ListeComptes';
import FormulairesComptes from '../../components/comptes/FormulairesComptes';
import useComptes from '../../components/comptes/useComptes';

export default function Utilisateurs() {
  const m = useComptes();
  const { t } = m;
  return <DashboardLayout>
    <EntetePersonnes>
      {m.actions.selection.length > 0 && <Button variant="outlined" color="error" startIcon={<Block />} onClick={m.actions.ouvrirLot}>{t('comptes.desactiverSelection', { count: m.actions.selection.length })}</Button>}
      <Button variant="contained" startIcon={<Add />} onClick={() => m.ouvrirFormulaire()}>{t('utilisateurs.ajouter')}</Button>
    </EntetePersonnes>
    <RecherchePersonnes valeur={m.search} changer={m.setSearch} libelle={t('utilisateurs.rechercher')} nombre={m.visibles.length} pageCourante />
    <ListeComptes modele={m} />
    <FormulairesComptes modele={m} />
    <Snackbar open={Boolean(m.error)} autoHideDuration={6000} onClose={() => m.setError('')}><Alert severity="error" onClose={() => m.setError('')}>{m.error}</Alert></Snackbar>
    <Snackbar open={Boolean(m.success)} autoHideDuration={6000} onClose={() => m.setSuccess('')}><Alert severity="success" onClose={() => m.setSuccess('')}>{m.success}</Alert></Snackbar>
  </DashboardLayout>;
}
