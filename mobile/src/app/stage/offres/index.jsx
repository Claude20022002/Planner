import { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, RefreshControl, ScrollView, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Ecran, { Message } from '../../../board/Ecran';
import { chargerOffresStage } from '../../../api/donnees';
import { filieresDesOffres, offresFiltrees, periodeOffre, prixOffre } from '../../../stage/offres';
import { CIBLE_TACTILE, creerStyles, useTheme } from '../../../theme';

/**
 * Offres de stage (STA-01, espace Carrière) : ce que l'école publie pour les étudiants, par filière.
 * La rédaction et la publication restent sur le site, comme les annonces ; l'application lit et
 * ouvre le lien de candidature ou le courriel de contact.
 */
export default function OffresDeStage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { couleurs } = useTheme();
  const styles = useStyles();
  const margeBas = useSafeAreaInsets().bottom;
  const [offres, setOffres] = useState(null);
  const [erreur, setErreur] = useState(false);
  const [rafraichit, setRafraichit] = useState(false);
  const [recherche, setRecherche] = useState('');
  const [idFiliere, setIdFiliere] = useState(null);

  const charger = useCallback(
    () =>
      chargerOffresStage()
        .then((liste) => {
          setOffres(liste);
          setErreur(false);
        })
        .catch(() => setErreur(true))
        .finally(() => setRafraichit(false)),
    []
  );

  useEffect(() => {
    charger();
  }, [charger]);

  const filieres = useMemo(() => filieresDesOffres(offres), [offres]);
  const visibles = useMemo(() => offresFiltrees(offres ?? [], { recherche, idFiliere }), [offres, recherche, idFiliere]);

  const periode = (offre) => {
    const p = periodeOffre(offre);
    if (p.type === 'periode') return t('app.stages.periode', { debut: p.debut, fin: p.fin });
    if (p.type === 'debut') return t('app.stages.aPartirDu', { debut: p.debut });
    if (p.type === 'fin') return t('app.stages.jusquAu', { fin: p.fin });
    return null;
  };

  return (
    <Ecran titre={t('app.stages.titre')}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: margeBas + 24 }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        refreshControl={
          <RefreshControl
            refreshing={rafraichit}
            onRefresh={() => {
              setRafraichit(true);
              charger();
            }}
            tintColor={couleurs.lettre}
            colors={[couleurs.cadre]}
          />
        }
      >
        <View style={styles.recherche}>
          <MaterialCommunityIcons name="magnify" size={20} color={couleurs.lettreAttenuee} />
          <TextInput
            value={recherche}
            onChangeText={setRecherche}
            placeholder={t('app.stages.rechercher')}
            placeholderTextColor={couleurs.lettreAttenuee}
            style={styles.champ}
            returnKeyType="search"
            autoCorrect={false}
            accessibilityLabel={t('app.stages.rechercher')}
          />
          {recherche ? (
            <Pressable onPress={() => setRecherche('')} style={styles.effacer} accessibilityRole="button" accessibilityLabel={t('app.commun.fermer')}>
              <MaterialCommunityIcons name="close-circle" size={18} color={couleurs.lettreAttenuee} />
            </Pressable>
          ) : null}
        </View>

        {filieres.length > 0 ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtres}>
            {[{ id: null, nom: t('app.stages.toutesFilieres') }, ...filieres].map((filiere) => {
              const actif = idFiliere === filiere.id;
              return (
                <Pressable
                  key={filiere.id ?? 'toutes'}
                  onPress={() => setIdFiliere(filiere.id)}
                  style={[styles.puce, actif && styles.puceActive]}
                  accessibilityRole="button"
                  accessibilityState={{ selected: actif }}
                >
                  <Text style={[styles.puceTexte, actif && styles.puceTexteActif]}>{filiere.nom}</Text>
                </Pressable>
              );
            })}
          </ScrollView>
        ) : null}

        {!offres && !erreur ? (
          <View style={styles.centre}>
            <ActivityIndicator color={couleurs.lettre} />
          </View>
        ) : null}

        {erreur ? (
          <View>
            <Message>{t('app.stages.erreur')}</Message>
            <Pressable onPress={charger} style={styles.reessayer} accessibilityRole="button">
              <Text style={styles.reessayerTexte}>{t('app.tableau.reessayer')}</Text>
            </Pressable>
          </View>
        ) : null}

        {offres && visibles.length === 0 ? <Message>{offres.length === 0 ? t('app.stages.aucune') : t('app.stages.aucunFiltre')}</Message> : null}

        {visibles.map((offre) => {
          const prix = prixOffre(offre);
          return (
            <Pressable
              key={offre.id}
              onPress={() => router.push({ pathname: '/stage/offres/[id]', params: { id: offre.id } })}
              style={({ pressed }) => [styles.carte, pressed && { opacity: 0.7 }]}
              accessibilityRole="button"
              accessibilityLabel={[offre.titre, offre.entreprise, prix].filter(Boolean).join(', ')}
            >
              <View style={styles.carteEntete}>
                <Text style={styles.titre} numberOfLines={2}>
                  {offre.titre}
                </Text>
                {prix ? <Text style={styles.prix}>{t('app.stages.parMois', { montant: prix })}</Text> : null}
              </View>
              <Text style={styles.meta} numberOfLines={1}>
                {[offre.entreprise, offre.ville].filter(Boolean).join(' · ')}
              </Text>
              <Text style={styles.meta} numberOfLines={1}>
                {[offre.filiere, offre.niveau, periode(offre)].filter(Boolean).join(' · ')}
              </Text>
              <MaterialCommunityIcons name="chevron-right" size={22} color={couleurs.lettreAttenuee} style={styles.chevron} />
            </Pressable>
          );
        })}
      </ScrollView>
    </Ecran>
  );
}

const useStyles = creerStyles((t) => ({
  recherche: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 16,
    marginTop: 12,
    paddingHorizontal: 12,
    minHeight: CIBLE_TACTILE,
    backgroundColor: t.couleurs.cellule,
    borderRadius: t.rayons.sm,
    borderWidth: t.sombre ? 0 : 1,
    borderColor: t.couleurs.filet,
  },
  champ: { flex: 1, minHeight: CIBLE_TACTILE, color: t.couleurs.lettre, fontFamily: t.polices.texte, fontSize: 16 },
  effacer: { width: CIBLE_TACTILE - 8, height: CIBLE_TACTILE, alignItems: 'center', justifyContent: 'center' },
  filtres: { gap: 8, paddingHorizontal: 16, paddingVertical: 12 },
  puce: {
    minHeight: CIBLE_TACTILE - 8,
    paddingHorizontal: 14,
    justifyContent: 'center',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: t.couleurs.filet,
  },
  puceActive: { backgroundColor: t.couleurs.accent, borderColor: t.couleurs.accent },
  puceTexte: { color: t.couleurs.lettre, fontFamily: t.polices.texteGras, fontSize: 14 },
  puceTexteActif: { color: t.couleurs.surAccent },
  centre: { paddingVertical: 32, alignItems: 'center' },
  reessayer: { marginHorizontal: 16, minHeight: CIBLE_TACTILE, justifyContent: 'center' },
  reessayerTexte: { color: t.couleurs.lettre, fontFamily: t.polices.texteGras, fontSize: 15, textDecorationLine: 'underline' },
  carte: {
    marginHorizontal: 16,
    marginBottom: 10,
    padding: 14,
    borderRadius: t.rayons.sm,
    backgroundColor: t.couleurs.cellule,
    borderWidth: t.sombre ? 0 : 1,
    borderColor: t.couleurs.filet,
  },
  carteEntete: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, paddingRight: 20 },
  titre: { flex: 1, color: t.couleurs.lettre, fontFamily: t.polices.texteGras, fontSize: 16, lineHeight: 21 },
  prix: { color: t.couleurs.lettre, fontFamily: t.polices.panneauGras, fontSize: 15 },
  meta: { color: t.couleurs.lettreAttenuee, fontFamily: t.polices.texte, fontSize: 13, marginTop: 3 },
  chevron: { position: 'absolute', right: 6, top: '50%', marginTop: -11 },
}));
