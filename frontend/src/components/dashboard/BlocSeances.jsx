import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Alert, Box, Button, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { affectationAPI } from '../../services/api';
import { DepartureBoard } from '../../design-system/board';
import { byStart, findSpotlight, toBoardSession } from '../../utils/session';
import { ds } from '../../design-system/tokens';
import useBloc from './useBloc';
import { PLAFOND_SEANCES } from './lignesDuVolet';
import { joursSuivants } from './periodes';

/** Aujourd'hui et les 2 jours suivants, comme avant UIX-11. */
const JOURS_SUIVANTS = 2;

const charger = () => {
  const { debut, fin } = joursSuivants(JOURS_SUIVANTS);
  // Les plus proches d'abord : la page est plafonnée à 100 séances par le serveur, et sans cet ordre
  // un campus chargé perdait les séances du jour au profit de celles du surlendemain
  return affectationAPI
    .getAll({ date_from: debut, date_to: fin, ordre: 'asc', limit: PLAFOND_SEANCES })
    .then((r) => (r?.data || []).map(toBoardSession).sort(byStart));
};

/**
 * Bloc A, le panneau des séances à venir (UIX-11) : inchangé dans sa forme, il est déjà ses lignes.
 * Il se charge seul (une panne de la liste des séances ne vide plus la page) et garde son filtre par
 * bâtiment. La lampe s'allume sur la prochaine séance qui démarre.
 */
export default function BlocSeances() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { donnees, chargement, erreur, recharger } = useBloc(useCallback(charger, []));
  const [batiment, setBatiment] = useState('all');
  const [maintenant, setMaintenant] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setMaintenant(new Date()), 60000);
    return () => clearInterval(id);
  }, []);

  const seances = useMemo(() => donnees ?? [], [donnees]);
  const batiments = useMemo(() => [...new Set(seances.map((s) => s.building).filter(Boolean))].sort(), [seances]);
  const aVenir = useMemo(
    () => seances.filter((s) => (!s.end || s.end > maintenant) && (batiment === 'all' || s.building === batiment)),
    [seances, maintenant, batiment]
  );
  const lampe = useMemo(() => findSpotlight(aVenir, maintenant), [aVenir, maintenant]);
  const titre = t('tableauDeBord.blocs.seances.titre');

  return (
    <Box component="section" aria-label={titre} data-bloc="seances" sx={{ minWidth: 0 }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
        <Typography sx={{ color: 'text.secondary', fontSize: '0.875rem', flexGrow: 1 }}>{t('tableauDeBord.blocs.seances.periode')}</Typography>
        {batiments.length > 1 && (
          <ToggleButtonGroup size="small" exclusive value={batiment} onChange={(_, v) => v && setBatiment(v)} aria-label={t('tableauDeBord.blocs.seances.filtrerBatiment')}>
            <ToggleButton value="all">{t('tableauDeBord.blocs.seances.tousBatiments')}</ToggleButton>
            {batiments.map((b) => (
              <ToggleButton key={b} value={b}>
                {b}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        )}
      </Box>
      {erreur ? (
        <Alert severity="error" action={<Button color="inherit" size="small" onClick={recharger}>{t('common.retry')}</Button>}>
          {t('tableauDeBord.erreurBloc')}
        </Alert>
      ) : (
        <DepartureBoard
          title={titre}
          sessions={aVenir}
          loading={chargement}
          spotlight={lampe}
          columns={['time', 'course', 'group', 'room', 'status']}
          empty={
            <Box sx={{ color: ds.board.letter }}>
              <Typography component="p" sx={{ fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '1.125rem' }}>
                {t('tableauDeBord.blocs.seances.vide')}
              </Typography>
              <Button variant="outlined" sx={{ mt: 2, color: ds.board.letter, borderColor: ds.board.seam }} onClick={() => navigate('/gestion/emplois-du-temps')}>
                {t('tableauDeBord.blocs.seances.emplois')}
              </Button>
            </Box>
          }
        />
      )}
    </Box>
  );
}
