/** Page groupes : arbre, année, import et formulaires existants dans le socle de gestion commun. */
import { Alert, Button, MenuItem, TextField } from '@mui/material';
import { Add, UploadFile } from '@mui/icons-material';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import EnteteGestion from '../../components/gestion/EnteteGestion';
import RechercheGestion from '../../components/gestion/RechercheGestion';
import SelecteurAnnee from '../../components/common/SelecteurAnnee';
import ListeGroupes from '../../components/groupes/ListeGroupes';
import DialogsGroupes from '../../components/groupes/DialogsGroupes';
import useGroupes from '../../components/groupes/useGroupes';
import { TOUTES } from '../../utils/annees';
export default function Groupes() {
  const m = useGroupes();
  const { t } = m;
  return (
    <DashboardLayout>
      <EnteteGestion contexte={t('ref.groups.intro')}>
        <Button variant="outlined" onClick={m.exporter}>
          {t('ref.import.export')}
        </Button>
        <Button variant="outlined" startIcon={<UploadFile />} onClick={() => m.setImportOuvert(true)}>
          {t('ref.import.button')}
        </Button>
        <Button variant="contained" startIcon={<Add />} onClick={() => m.ouvrir()} disabled={!m.filiere}>
          {t('ref.groups.addPromotion')}
        </Button>
      </EnteteGestion>
      <RechercheGestion nombre={m.lignes.length}>
        <TextField
          select
          fullWidth
          label={t('ref.curriculum.program')}
          value={m.filiere}
          onChange={(e) => m.setFiliere(e.target.value)}
          sx={{ minWidth: 0 }}
        >
          {m.filieres.map((f) => (
            <MenuItem key={f.id_filiere} value={f.id_filiere}>
              {f.code_filiere} · {f.nom_filiere}
            </MenuItem>
          ))}
        </TextField>
        <SelecteurAnnee annees={m.annees} valeur={m.valeurAnnee} onChange={m.choisirAnnee} />
      </RechercheGestion>
      {m.sansAnnee > 0 && m.valeurAnnee !== TOUTES && (
        <Alert
          severity="warning"
          sx={{ mb: 2 }}
          action={
            <Button color="inherit" onClick={() => m.choisirAnnee(TOUTES)}>
              {t('ref.groups.showAllYears')}
            </Button>
          }
        >
          {t('ref.groups.withoutYear', { count: m.sansAnnee })}
        </Alert>
      )}
      <ListeGroupes modele={m} />
      <DialogsGroupes modele={m} />
    </DashboardLayout>
  );
}
