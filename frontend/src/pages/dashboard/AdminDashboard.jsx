import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import BlocSeances from '../../components/dashboard/BlocSeances';
import FileATraiter from '../../components/dashboard/FileATraiter';
import BlocSemaine from '../../components/dashboard/BlocSemaine';
import BlocSuivi from '../../components/dashboard/BlocSuivi';
import BlocAVenir from '../../components/dashboard/BlocAVenir';
import BlocUsage from '../../components/dashboard/BlocUsage';
import VoletLignes from '../../components/dashboard/VoletLignes';

/**
 * Places des blocs (UIX-11, plan § 4.3, réponse 8 du chef). L'ordre du code est celui du téléphone,
 * une colonne : ce qui attend une décision (B), puis les chiffres (C à F), puis le panneau (A), le
 * plus long (jusqu'à 100 séances). Sur ordinateur, le panneau seul à gauche et les blocs l'un sous
 * l'autre à droite ; la dernière rangée « 1fr » absorbe la hauteur du panneau.
 */
const grille = {
  display: 'grid',
  gap: { xs: 2, md: 3 },
  alignItems: 'start',
  gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'repeat(2, minmax(0, 1fr))', lg: 'minmax(0, 1fr) minmax(320px, 400px)' },
  gridTemplateRows: { lg: 'auto auto auto auto 1fr' },
  gridTemplateAreas: {
    xs: '"b" "c" "d" "e" "f" "a"',
    md: '"b b" "c d" "e f" "a a"',
    lg: '"a b" "a c" "a d" "a e" "a f"',
  },
};

/**
 * Tableau de bord de l'administration (UIX-11) : six blocs indépendants, chacun avec sa période ;
 * un clic sur un chiffre ouvre le volet de ses lignes. La page ne charge plus rien elle-même.
 */
export default function AdminDashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  // Le chiffre dont le volet est ouvert : { chiffre, titre, periode, periodeTexte }, ou null
  const [volet, setVolet] = useState(null);
  const ouvrir = useCallback((v) => setVolet(v), []);
  const fermer = useCallback(() => setVolet(null), []);

  return (
    <DashboardLayout>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: { xs: 2, md: 3 } }}>
        <Button variant="contained" startIcon={<Add />} onClick={() => navigate('/gestion/affectations')}>
          {t('tableauDeBord.planifierSeance')}
        </Button>
      </Box>

      <Box sx={grille}>
        <Box sx={{ gridArea: 'b', minWidth: 0 }}>
          <FileATraiter />
        </Box>
        <Box sx={{ gridArea: 'c', minWidth: 0 }}>
          <BlocSemaine ouvrir={ouvrir} />
        </Box>
        <Box sx={{ gridArea: 'd', minWidth: 0 }}>
          <BlocSuivi ouvrir={ouvrir} />
        </Box>
        <Box sx={{ gridArea: 'e', minWidth: 0 }}>
          <BlocAVenir ouvrir={ouvrir} />
        </Box>
        <Box sx={{ gridArea: 'f', minWidth: 0 }}>
          <BlocUsage ouvrir={ouvrir} />
        </Box>
        <Box sx={{ gridArea: 'a', minWidth: 0 }}>
          <BlocSeances />
        </Box>
      </Box>

      <VoletLignes chiffre={volet?.chiffre ?? null} titre={volet?.titre} periode={volet?.periode} periodeTexte={volet?.periodeTexte} onFermer={fermer} />
    </DashboardLayout>
  );
}
