/** Native explicit solution control with a read-only, localized answer panel. */
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { creerStyles } from '../theme';
import { BoutonSimulation } from './AtelierSimulation';
import { lignesSolution } from '../../../shared/simulations/presentation.js';

export default function SolutionSimulation({ jeu, defi, etat, session }) {
    const { t: traduire, i18n } = useTranslation();
    const t = (cle, valeurs) => String(traduire(`simulations.${cle}`, valeurs));
    const s = useStyles();
    const suivi = etat.etats[defi.id];
    return <View style={s.panneau} accessibilityLiveRegion="polite">
        {suivi?.echecs >= 3 && !etat.solution && <Text style={s.texte}>{t('solutionConseil')}</Text>}
        <Text style={s.texte}>{t(suivi?.solution_vue ? (suivi.sans_points ? 'solutionSansPoints' : 'solutionConserve') : 'solutionCout')}</Text>
        <BoutonSimulation onPress={session.voirSolution} disabled={etat.occupe || Boolean(etat.solution)}>{t('voirSolution')}</BoutonSimulation>
        {etat.solution && <View>
            <Text accessibilityRole="header" style={s.texte}>{t('solutionTitre')}</Text>
            {lignesSolution(jeu, defi, etat.solution, t, i18n.language).map((ligne) => <Text key={ligne.label} style={s.texte}>{ligne.label}: {ligne.valeur}</Text>)}
        </View>}
    </View>;
}

const useStyles = creerStyles((t) => ({
    panneau: { gap: 8 },
    texte: { color: t.couleurs.lettre, fontFamily: t.polices.texte, fontSize: 16, lineHeight: 24 },
}));
