/**
 * Assemble le calendrier de l'école (UIX-06c, lot 4) : année affichée, semestres, événements et leurs fenêtres.
 * Données, droits et appels au serveur inchangés ; le chargement et les actions vivent dans useCalendrier.
 */
import { Button, Stack } from '@mui/material';
import { Add } from '@mui/icons-material';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import EnteteGestion from '../../components/gestion/EnteteGestion';
import EtatsGestion from '../../components/gestion/EtatsGestion';
import BarreAnnee from '../../components/calendrier/BarreAnnee';
import DialogsCalendrier from '../../components/calendrier/DialogsCalendrier';
import SectionEvenements from '../../components/calendrier/SectionEvenements';
import SectionSemestres from '../../components/calendrier/SectionSemestres';
import useCalendrier from '../../components/calendrier/useCalendrier';

export default function Calendrier() {
  const m = useCalendrier();
  const { t } = m;
  const sansAnnee = !m.loading && !m.erreurChargement && m.annees.length === 0;
  return (
    <DashboardLayout>
      <EnteteGestion>
        <Button variant="contained" startIcon={<Add />} onClick={() => m.ouvrirAnnee()}>
          {t('ref.calendar.newYear')}
        </Button>
      </EnteteGestion>
      {m.loading || m.erreurChargement || sansAnnee ? (
        <EtatsGestion
          chargement={m.loading}
          erreur={m.erreurChargement}
          recharger={m.charger}
          vide
          titreVide={t('ref.calendar.noYearTitle')}
          aideVide={t('ref.calendar.noYearBody')}
        />
      ) : (
        <Stack spacing={3}>
          <BarreAnnee modele={m} />
          <SectionSemestres modele={m} />
          <SectionEvenements modele={m} />
        </Stack>
      )}
      <DialogsCalendrier modele={m} />
    </DashboardLayout>
  );
}
