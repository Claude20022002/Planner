/** Assemble la liste et les formulaires enseignants ; les règles et requêtes restent dans le hook. */
import { Button, MenuItem, TextField, Typography } from '@mui/material';
import { Add, Download, UploadFile } from '@mui/icons-material';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import ImportCsvDialog from '../../components/common/ImportCsvDialog';
import EntetePersonnes from '../../components/personnes/EntetePersonnes';
import RecherchePersonnes from '../../components/personnes/RecherchePersonnes';
import ListeEnseignants from '../../components/enseignants/ListeEnseignants';
import FormulairesEnseignant from '../../components/enseignants/FormulairesEnseignant';
import useEnseignants from '../../components/enseignants/useEnseignants';
import { MODELE_CSV, STATUTS } from '../../components/enseignants/fiche';

export default function Enseignants() {
  const m = useEnseignants();
  const { t } = m;
  return <DashboardLayout>
    <EntetePersonnes contexte={t('ref.staff.intro')}>
      <Button variant="outlined" startIcon={<UploadFile />} onClick={() => m.setImportOuvert(true)}>{t('ref.import.button')}</Button>
      <Button variant="outlined" startIcon={<Download />} onClick={m.exporter} disabled={!m.affiches.length}>{t('ref.import.export')}</Button>
      <Button variant="contained" startIcon={<Add />} onClick={() => m.ouvrir()}>{t('ref.staff.add')}</Button>
    </EntetePersonnes>
    <RecherchePersonnes valeur={m.search} changer={m.setSearch} libelle={t('ref.staff.search')} nombre={m.affiches.length}>
      <TextField select label={t('ref.staff.cols.status')} value={m.statut} onChange={(e) => m.setStatut(e.target.value)} sx={{ minWidth: { sm: 180 } }}>
        <MenuItem value="tous">{t('ref.staff.allStatuses')}</MenuItem>
        {STATUTS.map((s) => <MenuItem key={s} value={s}>{t('ref.staff.statuses.' + s)}</MenuItem>)}
      </TextField>
    </RecherchePersonnes>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
      {m.charges.annee ? t('ref.staff.year', { year: m.charges.annee.libelle }) : t('ref.staff.noYear')}
    </Typography>
    <ListeEnseignants modele={m} />
    <FormulairesEnseignant modele={m} />
    <ImportCsvDialog open={m.importOuvert} onClose={() => m.setImportOuvert(false)} titre={t('ref.staff.importTitle')}
      intro={t('ref.staff.importIntro')} modele={MODELE_CSV} nomModele="modele-enseignants.csv" onImport={m.importer} />
    <ConfirmDialog open={Boolean(m.aSupprimer)} title={t('ref.staff.deleteTitle')}
      message={t('ref.staff.deleteBody', { name: (m.aSupprimer?.user?.prenom || '') + ' ' + (m.aSupprimer?.user?.nom || '') })}
      onConfirm={m.supprimer} onCancel={() => m.setASupprimer(null)} />
  </DashboardLayout>;
}
