/**
 * Jeux d'un module, rangés par cycle puis par domaine.
 * La carte montre la vue, le titre, le domaine, l'accroche et la progression.
 * Sans fichier WebP, la carte reste lisible.
 */
import { Image, Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { cartesRangees } from './cartes.js';
import { CIBLE_TACTILE, creerStyles, espace } from '../theme';

const VUES = {
  'terminal-linux': require('../../../shared/jeux/images/terminal-linux.webp'),
  'cpu-process': require('../../../shared/jeux/images/cpu-process.webp'),
  'robot-route': require('../../../shared/jeux/images/robot-route.webp'),
  'topo-reseau': require('../../../shared/jeux/images/topo-reseau.webp'),
  'tri-cyber': require('../../../shared/jeux/images/tri-cyber.webp'),
  'threshold-lab': require('../../../shared/jeux/images/threshold-lab.webp'),
  'budget-erp': require('../../../shared/jeux/images/budget-erp.webp'),
  'sprint-agile': require('../../../shared/jeux/images/sprint-agile.webp'),
  'stock-pilot': require('../../../shared/jeux/images/stock-pilot.webp'),
};

/** `ouvrir(code)` lance l'écran du jeu. Les deux jeux sans vue (Codex) n'ont pas de fichier. */
export default function GroupeJeux({ jeux, langue, ouvrir }) {
  const { t } = useTranslation();
  const styles = useStyles();
  const groupes = cartesRangees(jeux, langue, (code) => VUES[code]);

  return groupes.map((cycle) => (
    <View key={cycle.cycle}>
      <Text style={styles.cycle} accessibilityRole="header">{cycle.titre}</Text>
      {cycle.domaines.map((domaine) => (
        <View key={domaine.domaine}>
          <Text style={styles.domaine} accessibilityRole="header">{domaine.titre}</Text>
          {domaine.jeux.map((carte) => {
            const p = carte.progression;
            const progression = t('app.jeux.progression', { reussis: p.reussis, total: p.total, points: p.points });
            return (
              <Pressable
                key={carte.code}
                onPress={() => ouvrir(carte.code)}
                style={styles.ligne}
                accessibilityRole="button"
                accessibilityLabel={`${carte.titre}, ${carte.domaine}, ${carte.accroche}, ${progression}`}
              >
                {carte.image ? (
                  <Image source={VUES[carte.code]} style={styles.vue} accessible={false} />
                ) : (
                  <View style={styles.icone} />
                )}
                <View style={styles.contenu}>
                  <Text style={styles.titre}>{carte.titre}</Text>
                  <Text style={styles.detail}>{carte.domaine}</Text>
                  <Text style={styles.accroche}>{carte.accroche}</Text>
                  <View style={styles.barre}>
                    <View style={[styles.barrePleine, { width: `${p.total ? Math.round((100 * p.reussis) / p.total) : 0}%` }]} />
                  </View>
                  <Text style={styles.code}>{progression}</Text>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={22} color={couleurs.lettreAttenuee} />
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  ));
}

const useStyles = creerStyles((t) => ({
  cycle: { color: t.couleurs.lettre, fontFamily: t.polices.panneauGras, fontSize: 15, letterSpacing: espace(t, 0.4), paddingHorizontal: 16, paddingTop: 14, paddingBottom: 2 },
  domaine: { color: t.couleurs.lettreAttenuee, fontFamily: t.polices.panneauGras, fontSize: 13, letterSpacing: espace(t, 1.2), textTransform: t.capitales, paddingHorizontal: 16, paddingTop: 8, paddingBottom: 2 },
  ligne: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingVertical: 14, minHeight: CIBLE_TACTILE + 16, borderTopWidth: 1, borderTopColor: t.couleurs.filet },
  vue: { width: 64, height: 64, borderRadius: t.rayons.sm },
  icone: { width: 64, height: 64, borderRadius: t.rayons.sm, alignItems: 'center', justifyContent: 'center', backgroundColor: t.couleurs.fond },
  contenu: { flex: 1 },
  titre: { color: t.couleurs.lettre, fontFamily: t.polices.texteGras, fontSize: 16 },
  detail: { color: t.couleurs.lettreAttenuee, fontFamily: t.polices.texte, fontSize: 13, marginTop: 2 },
  accroche: { color: t.couleurs.lettre, fontFamily: t.polices.texte, fontSize: 14, marginTop: 4, lineHeight: 20 },
  code: { color: t.couleurs.lettreAttenuee, fontFamily: t.polices.panneauMoyen, fontSize: 14, marginTop: 4, letterSpacing: espace(t, 1) },
  barre: { height: 6, borderRadius: 3, backgroundColor: t.couleurs.filet, marginTop: 10, overflow: 'hidden' },
  barrePleine: { height: 6, borderRadius: 3, backgroundColor: t.couleurs.enCours },
}));
