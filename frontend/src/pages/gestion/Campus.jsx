/** Assemble l'écran des campus (UIX-06c, lot 2) : liste, fiche et temps de trajet, sans changer les données ni les droits. */
import { Button, Stack } from '@mui/material';
import { Add } from '@mui/icons-material';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import EnteteGestion from '../../components/gestion/EnteteGestion';
import ListeCampus from '../../components/campus/ListeCampus';
import CampusDialog from '../../components/campus/CampusDialog';
import TempsTrajet from '../../components/campus/TempsTrajet';
import useCampus from '../../components/campus/useCampus';

export default function Campus() {
  const m = useCampus();
  return (
    <DashboardLayout>
      <EnteteGestion contexte={m.t('ref.campus.intro')}>
        <Button variant="contained" startIcon={<Add />} onClick={() => m.ouvrir()}>
          {m.t('ref.campus.add')}
        </Button>
      </EnteteGestion>
      <Stack spacing={3}>
        <ListeCampus modele={m} />
        {/* Les trajets attendent les campus : rien à saisir pendant le chargement ou après un échec */}
        {!m.loading && !m.erreurChargement && (
          <TempsTrajet
            paires={m.paires}
            minutes={m.minutes}
            enregistres={m.enregistres}
            defautMinutes={m.defautMinutes}
            onMinutes={m.changerMinutes}
            onEnregistrer={m.enregistrerTrajet}
          />
        )}
      </Stack>
      <CampusDialog modele={m} />
    </DashboardLayout>
  );
}
