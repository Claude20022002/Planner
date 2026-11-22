/** Assemble l'écran des salles (UIX-06c, lot 1) sans changer les données, les droits ni l'import. */
import { Button, MenuItem, TextField } from '@mui/material';
import { Add, Download, UploadFile } from '@mui/icons-material';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import EnteteGestion from '../../components/gestion/EnteteGestion';
import RechercheGestion from '../../components/gestion/RechercheGestion';
import ListeSalles from '../../components/salles/ListeSalles';
import DialogsSalles from '../../components/salles/DialogsSalles';
import useSalles from '../../components/salles/useSalles';

export default function Salles() {
  const m = useSalles();
  const { t } = m;
  return (
    <DashboardLayout>
      <EnteteGestion>
        <Button variant="outlined" startIcon={<Download />} onClick={m.exporter}>
          {t('gestion.salles.exporter')}
        </Button>
        <Button variant="outlined" startIcon={<UploadFile />} onClick={m.ouvrirImport}>
          {t('ref.rooms.import')}
        </Button>
        <Button variant="contained" startIcon={<Add />} onClick={() => m.ouvrir()} disabled={m.campus.length === 0}>
          {t('ref.rooms.add')}
        </Button>
      </EnteteGestion>
      <RechercheGestion valeur={m.search} changer={m.setSearch} libelle={t('gestion.salles.rechercher')} nombre={m.affichees.length}>
        <TextField
          select
          label={t('ref.rooms.cols.campus')}
          value={m.campusFiltre}
          onChange={(e) => m.setCampusFiltre(e.target.value)}
          sx={{ minWidth: { sm: 220 } }}
        >
          <MenuItem value="tous">{t('ref.rooms.allCampuses')}</MenuItem>
          {m.campus.map((c) => (
            <MenuItem key={c.id_campus} value={c.code}>
              {c.nom}
            </MenuItem>
          ))}
        </TextField>
      </RechercheGestion>
      <ListeSalles modele={m} />
      <DialogsSalles modele={m} />
    </DashboardLayout>
  );
}
