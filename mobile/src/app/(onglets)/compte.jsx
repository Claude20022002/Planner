import { useEffect, useState } from 'react';
import { Pressable, ScrollView, Switch, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import Constants from 'expo-constants';
import Ecran from '../../board/Ecran';
import { useAuth } from '../../auth/AuthContext';
import { changerLangue } from '../../i18n';
import { desinscrireDesNotifications, inscrireAuxNotifications, notificationsActives } from '../../push';
import { CIBLE_TACTILE, creerStyles, espace, MODES, usePreferenceTheme, useTheme } from '../../theme';
import { useMargeOnglets } from '../../verre/Verre';
import { ajouterAuCalendrier } from '../../agenda';

/** Compte : profil, apparence (automatique, clair ou sombre), langue, notifications, téléphone de l'appel, déconnexion. */
export default function Compte() {
  const { couleurs } = useTheme();
  const styles = useStyles();
  const margeBas = useMargeOnglets();
  const { t, i18n } = useTranslation();
  const { utilisateur, deconnexion } = useAuth();
  const router = useRouter();
  const [erreurAgenda, setErreurAgenda] = useState(false);
  const [alertes, setAlertes] = useState(false);
  const [occupe, setOccupe] = useState(false);

  useEffect(() => {
    notificationsActives().then(setAlertes);
  }, []);

  const basculerAlertes = async (actif) => {
    setOccupe(true);
    try {
      if (actif) setAlertes(Boolean(await inscrireAuxNotifications()));
      else {
        await desinscrireDesNotifications();
        setAlertes(false);
      }
    } catch {
      setAlertes(await notificationsActives());
    } finally {
      setOccupe(false);
    }
  };

  return (
    <Ecran titre={t('app.onglets.compte')}>
      <ScrollView contentContainerStyle={{ paddingBottom: margeBas }} scrollIndicatorInsets={{ bottom: margeBas }}>
        <Text style={styles.section}>{t('app.compte.profil')}</Text>
        <View style={styles.bloc}>
          <Text style={styles.nom}>{[utilisateur?.prenom, utilisateur?.nom].filter(Boolean).join(' ')}</Text>
          <Text style={styles.detail}>{utilisateur?.email}</Text>
          {utilisateur?.niveau ? <Text style={styles.detail}>{utilisateur.niveau}</Text> : null}
        </View>

        <Apparence />

        <Text style={styles.section}>{t('app.compte.langue')}</Text>
        <View style={styles.choix} accessibilityRole="radiogroup">
          {['fr', 'en'].map((langue) => {
            const actif = i18n.language === langue;
            return (
              <Pressable key={langue} onPress={() => changerLangue(langue)} style={[styles.option, actif && styles.optionActive]} accessibilityRole="radio" accessibilityState={{ checked: actif }}>
                <Text style={[styles.optionTexte, actif && styles.optionTexteActif]}>{langue === 'fr' ? 'Français' : 'English'}</Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.section}>{t('app.compte.notifications')}</Text>
        <View style={[styles.bloc, styles.ligne]}>
          <Text style={[styles.detail, { flex: 1 }]}>{t('app.compte.notificationsAide')}</Text>
          <Switch value={alertes} disabled={occupe} onValueChange={basculerAlertes} trackColor={{ true: couleurs.enCours, false: couleurs.bord }} accessibilityLabel={t('app.compte.notifications')} />
        </View>

        <Text style={styles.section}>{t('app.compte.agenda')}</Text>
        <View style={styles.bloc}>
          <Text style={styles.detail}>{t('app.compte.agendaAide')}</Text>
          <Pressable
            onPress={() => ajouterAuCalendrier(couleurs).catch(() => setErreurAgenda(true))}
            style={({ pressed }) => [styles.option, styles.optionActive, { marginTop: 12, minHeight: CIBLE_TACTILE, justifyContent: 'center' }, pressed && { opacity: 0.7 }]}
            accessibilityRole="button"
          >
            <Text style={styles.agendaBouton}>{t('app.compte.agendaAjouter')}</Text>
          </Pressable>
          {erreurAgenda ? <Text style={[styles.detail, { marginTop: 8 }]}>{t('app.compte.agendaErreur')}</Text> : null}
        </View>

        <Text style={styles.section}>{t('app.compte.telephone')}</Text>
        <View style={styles.bloc}>
          <Text style={styles.detail}>{t('app.compte.telephoneAide')}</Text>
          <Pressable
            onPress={() => router.push('/telephone')}
            style={({ pressed }) => [styles.option, styles.optionActive, { marginTop: 12, minHeight: CIBLE_TACTILE, justifyContent: 'center' }, pressed && { opacity: 0.7 }]}
            accessibilityRole="button"
          >
            <Text style={styles.agendaBouton}>{t('app.compte.telephoneOuvrir')}</Text>
          </Pressable>
        </View>

        <Pressable onPress={deconnexion} style={styles.deconnexion} accessibilityRole="button">
          <Text style={styles.deconnexionTexte}>{t('app.compte.deconnexion')}</Text>
        </Pressable>
        <Text style={styles.version}>{t('app.compte.version', { version: Constants.expoConfig?.version ?? '1.0.0' })}</Text>
      </ScrollView>
    </Ecran>
  );
}

/** Apparence : le mode automatique (celui du téléphone), clair ou sombre. */
function Apparence() {
  const { t } = useTranslation();
  const styles = useStyles();
  const { preference, changer } = usePreferenceTheme();

  return (
    <>
      <Text style={styles.section}>{t('app.compte.theme')}</Text>
      <View style={styles.choix} accessibilityRole="radiogroup" accessibilityLabel={t('app.compte.mode')}>
        {MODES.map((mode) => {
          const actif = preference.mode === mode;
          return (
            <Pressable key={mode} onPress={() => changer({ mode })} style={[styles.option, actif && styles.optionActive]} accessibilityRole="radio" accessibilityState={{ checked: actif }}>
              <Text style={[styles.optionTexte, styles.optionPetite, actif && styles.optionTexteActif]}>{t(`app.compte.modes.${mode}`)}</Text>
            </Pressable>
          );
        })}
      </View>
    </>
  );
}

const useStyles = creerStyles((t) => ({
  section: { color: t.couleurs.lettreAttenuee, fontFamily: t.polices.panneau, fontSize: 14, textTransform: t.capitales, letterSpacing: espace(t, 1.2), paddingHorizontal: 16, paddingTop: 20, paddingBottom: 6 },
  bloc: { marginHorizontal: 16, padding: 14, backgroundColor: t.couleurs.cellule, borderRadius: t.rayons.md, gap: 4 },
  ligne: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  nom: { color: t.couleurs.lettre, fontFamily: t.polices.texteGras, fontSize: 17 },
  detail: { color: t.couleurs.lettreAttenuee, fontFamily: t.polices.texte, fontSize: 14 },
  agendaBouton: { color: t.couleurs.lettre, fontFamily: t.polices.texteGras, fontSize: 15, textAlign: 'center' },
  choix: { flexDirection: 'row', marginHorizontal: 16, gap: 8 },
  option: { flex: 1, minHeight: CIBLE_TACTILE, alignItems: 'center', justifyContent: 'center', backgroundColor: t.couleurs.cellule, borderRadius: t.rayons.sm, borderWidth: 1, borderColor: t.couleurs.bord },
  optionActive: { borderColor: t.couleurs.accent, borderWidth: 2 },
  optionPetite: { fontSize: 14 },
  optionTexte: { color: t.couleurs.lettreAttenuee, fontFamily: t.polices.panneau, fontSize: 16, textTransform: t.capitales },
  optionTexteActif: { color: t.couleurs.lettre },
  deconnexion: { marginHorizontal: 16, marginTop: 32, minHeight: CIBLE_TACTILE, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: t.couleurs.bord, borderRadius: t.rayons.sm },
  deconnexionTexte: { color: t.couleurs.lettre, fontFamily: t.polices.panneau, fontSize: 16, textTransform: t.capitales, letterSpacing: espace(t, 1) },
  version: { color: t.couleurs.lettreAttenuee, fontFamily: t.polices.texte, fontSize: 12, textAlign: 'center', marginTop: 16 },
}));
