/** Explicit solution control and read-only answer; never fetch automatically after failures. */
import { Alert, Box, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { lignesSolution } from '../../../../shared/simulations/presentation.js';

export default function SolutionSimulation({ jeu, defi, etat, session }) {
    const { t: traduire, i18n } = useTranslation();
    const t = (cle, valeurs) => traduire(`simulations.${cle}`, valeurs);
    const suivi = etat.etats[defi.id];
    return <Box sx={{ my: 2 }}>
        {suivi?.echecs >= 3 && !etat.solution && <Alert severity="info" sx={{ mb: 1 }}>{t('solutionConseil')}</Alert>}
        <Typography variant="body2">{t(suivi?.solution_vue ? (suivi.sans_points ? 'solutionSansPoints' : 'solutionConserve') : 'solutionCout')}</Typography>
        <Button onClick={session.voirSolution} disabled={etat.occupe || Boolean(etat.solution)} sx={{ minHeight: 44 }}>{t('voirSolution')}</Button>
        {etat.solution && <Box component="section" aria-label={t('solutionTitre')} aria-live="polite">
            <Typography variant="h3">{t('solutionTitre')}</Typography>
            <Box component="dl" sx={{ overflowWrap: 'anywhere' }}>
                {lignesSolution(jeu, defi, etat.solution, t, i18n.language).map((ligne) => <Box key={ligne.label}>
                    <Typography component="dt">{ligne.label}</Typography><Typography component="dd" sx={{ ml: 2 }}>{ligne.valeur}</Typography>
                </Box>)}
            </Box>
        </Box>}
    </Box>;
}
