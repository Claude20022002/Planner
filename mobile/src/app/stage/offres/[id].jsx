import { useEffect, useState } from 'react';
import { Linking, Pressable, ScrollView, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Ecran, { Message } from '../../../board/Ecran';
import { chargerOffreStage } from '../../../api/donnees';
import { ouvrirAdresse } from '../../../espaces/ouvrir';
import { lienCandidature, periodeOffre, prixOffre } from '../../../stage/offres';
import { CIBLE_TACTILE, creerStyles, useTheme } from '../../../theme';

/**
 * Une offre de stage (STA-01) : le détail, le prix, la période, puis le lien de candidature ou le
 * courriel de contact. Une offre brouillon ou fermée répond 404 à un étudiant : le même message
 * qu'une offre qui n'existe pas.
 */
export default function OffreDeStage() {
  const { id } = useLocalSearchParams();
  const { t } = useTranslation();
  const router = useRouter();
  const { couleurs } = useTheme();
  const styles = useStyles();
  const margeBas = useSafeAreaInsets().bottom;
  const [offre, setOffre] = useState(null);
  const [erreur, setErreur] = useState(false);

  useEffect(() => {
    let actif = true;
    chargerOffreStage(id)
      .then((lue) => actif && setOffre(lue))
      .catch(() => actif && setErreur(true));
    return () => {
      actif = false;
    };
  }, [id]);

  const fermer = (
    <Pressable onPress={() => (router.canGoBack() ? router.back() : router.replace('/stage/offres'))} style={styles.fermer} accessibilityRole="button" accessibilityLabel={t('app.commun.fermer')}>
      <MaterialCommunityIcons name="close" size={24} color={couleurs.surCadre} />
    </Pressable>
  );

  const periode = offre ? periodeOffre(offre) : { type: null };
  const textePeriode =
    periode.type === 'periode'
      ? t('app.stages.periode', { debut: periode.debut, fin: periode.fin })
      : periode.type === 'debut'
        ? t('app.stages.aPartirDu', { debut: periode.debut })
        : periode.type === 'fin'
          ? t('app.stages.jusquAu', { fin: periode.fin })
          : null;
  const prix = offre ? prixOffre(offre) : null;
  const lien = offre ? lienCandidature(offre) : null;

  return (
    <Ecran titre={t('app.stages.titre')} droite={fermer} espaces={false}>
      {erreur ? <Message>{t('app.stages.introuvable')}</Message> : null}
      {!offre && !erreur ? <Message discret>{t('app.commun.chargement')}</Message> : null}
      {offre ? (
        <ScrollView contentContainerStyle={[styles.contenu, { paddingBottom: margeBas + 24 }]}>
          <Text style={styles.titre} accessibilityRole="header">
            {offre.titre}
          </Text>
          <Text style={styles.meta}>{[offre.entreprise, offre.ville].filter(Boolean).join(' · ')}</Text>
          <Text style={styles.meta}>{[offre.filiere, offre.niveau, textePeriode].filter(Boolean).join(' · ')}</Text>
          {prix ? <Text style={styles.prix}>{t('app.stages.parMois', { montant: prix })}</Text> : null}

          <Text style={styles.corps} selectable>
            {offre.description}
          </Text>

          {lien ? (
            <Pressable onPress={() => ouvrirAdresse(lien, couleurs)} style={({ pressed }) => [styles.bouton, pressed && { opacity: 0.7 }]} accessibilityRole="link">
              <MaterialCommunityIcons name="open-in-new" size={20} color={couleurs.surAccent} />
              <Text style={styles.boutonTexteAccent}>{t('app.stages.postuler')}</Text>
            </Pressable>
          ) : null}

          {offre.contact_email ? (
            <Pressable
              onPress={() => Linking.openURL(`mailto:${offre.contact_email}`).catch(() => {})}
              style={({ pressed }) => [styles.boutonClair, pressed && { opacity: 0.7 }]}
              accessibilityRole="link"
            >
              <MaterialCommunityIcons name="email-outline" size={20} color={couleurs.lettre} />
              <View style={styles.boutonClairTexte}>
                <Text style={styles.boutonTexte}>{t('app.stages.ecrireA')}</Text>
                <Text style={styles.courriel} numberOfLines={1}>
                  {offre.contact_email}
                </Text>
              </View>
            </Pressable>
          ) : null}
        </ScrollView>
      ) : null}
    </Ecran>
  );
}

const useStyles = creerStyles((t) => ({
  fermer: { width: CIBLE_TACTILE, height: CIBLE_TACTILE, alignItems: 'center', justifyContent: 'center' },
  contenu: { paddingHorizontal: 16, paddingTop: 16, gap: 10 },
  titre: { color: t.couleurs.lettre, fontFamily: t.polices.texteGras, fontSize: 22, lineHeight: 28 },
  meta: { color: t.couleurs.lettreAttenuee, fontFamily: t.polices.texte, fontSize: 14 },
  prix: { color: t.couleurs.lettre, fontFamily: t.polices.panneauGras, fontSize: 20, marginTop: 2 },
  corps: { color: t.couleurs.lettre, fontFamily: t.polices.texte, fontSize: 16, lineHeight: 24, marginTop: 6 },
  bouton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    minHeight: CIBLE_TACTILE,
    paddingHorizontal: 16,
    borderRadius: t.rayons.sm,
    backgroundColor: t.couleurs.accent,
    marginTop: 8,
  },
  boutonClair: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: CIBLE_TACTILE,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: t.couleurs.filet,
    borderRadius: t.rayons.sm,
    backgroundColor: t.couleurs.cellule,
  },
  boutonClairTexte: { flex: 1 },
  boutonTexte: { color: t.couleurs.lettre, fontFamily: t.polices.texteGras, fontSize: 15 },
  boutonTexteAccent: { color: t.couleurs.surAccent, fontFamily: t.polices.texteGras, fontSize: 15 },
  courriel: { color: t.couleurs.lettreAttenuee, fontFamily: t.polices.texte, fontSize: 13, marginTop: 2 },
}));
