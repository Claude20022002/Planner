/** Page étudiants : assemble outils, liste et formulaire sans changer les règles métier. */
import { Button, Alert, Snackbar } from '@mui/material';
import { Add, UploadFile, Download } from '@mui/icons-material';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import ImportCsvDialog from '../../components/common/ImportCsvDialog';
import SelecteurAnnee from '../../components/common/SelecteurAnnee';
import EntetePersonnes from '../../components/personnes/EntetePersonnes';
import RecherchePersonnes from '../../components/personnes/RecherchePersonnes';
import ListeEtudiants from '../../components/etudiants/ListeEtudiants';
import FormulaireEtudiant from '../../components/etudiants/FormulaireEtudiant';
import useEtudiants from '../../components/etudiants/useEtudiants';
import { MODELE_CSV } from '../../components/etudiants/fiche';

export default function Etudiants() {
  const m = useEtudiants();
  const { t } = m;
  return <DashboardLayout>
    <EntetePersonnes>
      <Button variant="outlined" startIcon={<UploadFile />} onClick={() => m.setImportOuvert(true)}>{t('etudiants.importer')}</Button>
      <Button variant="outlined" startIcon={<Download />} onClick={m.handleExport}>{t('etudiants.exporter')}</Button>
      <Button variant="contained" startIcon={<Add />} onClick={() => { m.setEditing(null); m.setError(''); m.setSuccess(''); m.formik.resetForm(); m.setOpen(true); }}>{t('etudiants.ajouter')}</Button>
    </EntetePersonnes>
    <RecherchePersonnes valeur={m.search} changer={m.setSearch} libelle={t('etudiants.rechercher')} nombre={m.filteredEtudiants.length} pageCourante>
      <SelecteurAnnee annees={m.annees} valeur={m.valeurAnnee} onChange={m.choisirAnnee} />
    </RecherchePersonnes>
    <ListeEtudiants modele={m} />
    <FormulaireEtudiant modele={m} />
    <Snackbar open={Boolean(m.error)} autoHideDuration={6000} onClose={() => m.setError('')}><Alert severity="error" onClose={() => m.setError('')}>{m.error}</Alert></Snackbar>
    <Snackbar open={Boolean(m.success)} autoHideDuration={6000} onClose={() => m.setSuccess('')}><Alert severity="success" onClose={() => m.setSuccess('')}>{m.success}</Alert></Snackbar>
    <ImportCsvDialog open={m.importOuvert} onClose={() => m.setImportOuvert(false)} titre={t('etudiants.titreImport')}
      intro={t('etudiants.introImport')} modele={MODELE_CSV} nomModele="modele-etudiants.csv" onImport={m.importer} />
  </DashboardLayout>;
}
