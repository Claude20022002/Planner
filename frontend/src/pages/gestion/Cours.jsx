/** Page maquette : filtres, modules/composantes et formulaires existants. */
import { Button, MenuItem, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Add, UploadFile } from '@mui/icons-material';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import EnteteGestion from '../../components/gestion/EnteteGestion';
import RechercheGestion from '../../components/gestion/RechercheGestion';
import ListeModules from '../../components/cours/ListeModules';
import DialogsModules from '../../components/cours/DialogsModules';
import useModules from '../../components/cours/useModules';
import { exportToExcelLazy } from '../../utils/lazyExports';
import { COLS_COURS } from '../../utils/exportColumns';
export default function Cours() {
  const m = useModules();
  const { t } = m;
  return (
    <DashboardLayout>
      <EnteteGestion>
        <Button variant="outlined" onClick={() => exportToExcelLazy(m.modulesAffiches, COLS_COURS, 'Maquette', 'Maquette')}>
          {t('ref.import.export')}
        </Button>
        <Button variant="outlined" startIcon={<UploadFile />} onClick={() => m.setImportOuvert(true)}>
          {t('ref.import.button')}
        </Button>
        <Button variant="contained" startIcon={<Add />} onClick={() => m.ouvrirModule()} disabled={!m.filieres.length}>
          {t('ref.curriculum.addModule')}
        </Button>
      </EnteteGestion>
      <RechercheGestion
        valeur={m.search}
        changer={m.setSearch}
        libelle={t('gestion.modules.rechercher')}
        nombre={m.modulesAffiches.length}
      >
        <TextField
          select
          label={t('ref.curriculum.program')}
          value={m.filiere}
          onChange={(e) => m.setFiliere(e.target.value)}
          sx={{ minWidth: 0, width: { sm: 240 } }}
        >
          <MenuItem value="toutes">{t('ref.curriculum.allPrograms')}</MenuItem>
          {m.filieres.map((f) => (
            <MenuItem key={f.id_filiere} value={f.id_filiere}>
              {f.code_filiere} · {f.nom_filiere}
            </MenuItem>
          ))}
        </TextField>
        <ToggleButtonGroup
          size="small"
          exclusive
          value={m.periode}
          onChange={(_, v) => v && m.setPeriode(v)}
          aria-label={t('ref.curriculum.period')}
          sx={{ flexWrap: 'wrap', '& button': { whiteSpace: 'normal' } }}
        >
          <ToggleButton value="toutes">{t('ref.curriculum.allSemesters')}</ToggleButton>
          <ToggleButton value="S1">{t('ref.curriculum.oddSemesters')}</ToggleButton>
          <ToggleButton value="S2">{t('ref.curriculum.evenSemesters')}</ToggleButton>
        </ToggleButtonGroup>
      </RechercheGestion>
      <ListeModules modele={m} />
      <DialogsModules modele={m} />
    </DashboardLayout>
  );
}
