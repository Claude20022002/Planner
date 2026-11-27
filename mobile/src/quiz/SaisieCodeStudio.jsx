// Saisie d’un code Studio depuis le scanner, caméra autorisée ou non.
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { CIBLE_TACTILE, creerStyles } from '../theme';
import { codeQuizSaisi } from './studio';

export default function SaisieCodeStudio({ rejoindre, occupe }) {
  const [texte, setTexte] = useState('');
  const { t } = useTranslation();
  const styles = useStyles();
  const code = codeQuizSaisi(texte);
  const bloque = !code || occupe;
  const valider = () => { if (!bloque) rejoindre(code); };

  return (
    <View style={styles.formulaire}>
      <Text style={styles.libelle}>{t('app.direct.code')}</Text>
      <TextInput
        style={styles.champ}
        value={texte}
        onChangeText={setTexte}
        onSubmitEditing={valider}
        editable={!occupe}
        accessibilityLabel={t('app.direct.code')}
        autoCapitalize="characters"
        autoCorrect={false}
        returnKeyType="go"
      />
      <Pressable style={[styles.bouton, bloque && styles.bloque]} onPress={valider} disabled={bloque} accessibilityRole="button">
        <Text style={styles.boutonTexte}>{t(occupe ? 'app.commun.chargement' : 'app.direct.rejoindre')}</Text>
      </Pressable>
    </View>
  );
}

const useStyles = creerStyles((t) => ({
  formulaire: { gap: 8, padding: 16, backgroundColor: t.couleurs.fond },
  libelle: { color: t.couleurs.lettre, fontFamily: t.polices.texteGras, fontSize: 15 },
  champ: { minHeight: CIBLE_TACTILE, borderWidth: 1, borderColor: t.couleurs.lettreAttenuee, borderRadius: t.rayons.sm, paddingHorizontal: 12, color: t.couleurs.lettre, fontFamily: t.polices.texte, fontSize: 16 },
  bouton: { minHeight: CIBLE_TACTILE, alignItems: 'center', justifyContent: 'center', backgroundColor: t.couleurs.cadre, borderRadius: t.rayons.sm },
  boutonTexte: { color: t.couleurs.surCadre, fontFamily: t.polices.texteGras, fontSize: 15, padding: 8 },
  bloque: { opacity: 0.65 },
}));
