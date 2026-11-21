/** Assemble les filières sans modifier les contrats, rôles ou règles d’import. */
import { Button } from '@mui/material';
import { Add, UploadFile } from '@mui/icons-material';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import EnteteGestion from '../../components/gestion/EnteteGestion';
import RechercheGestion from '../../components/gestion/RechercheGestion';
import ListeFilieres from '../../components/filieres/ListeFilieres';
import DialogsFilieres from '../../components/filieres/DialogsFilieres';
import useFilieres from '../../components/filieres/useFilieres';
export default function Filieres() {
 const m = useFilieres();
 return <DashboardLayout>
  <EnteteGestion>
   <Button variant="outlined" startIcon={<UploadFile />} onClick={() => m.setImportOuvert(true)}>{m.t('ref.import.button')}</Button>
   <Button variant="contained" startIcon={<Add />} onClick={() => m.ouvrir()}>{m.t('ref.programs.add')}</Button>
  </EnteteGestion>
  <RechercheGestion valeur={m.search} changer={m.setSearch} libelle={m.t('gestion.filieres.rechercher')} nombre={m.affichees.length} />
  <ListeFilieres modele={m} /><DialogsFilieres modele={m} />
 </DashboardLayout>;
}
