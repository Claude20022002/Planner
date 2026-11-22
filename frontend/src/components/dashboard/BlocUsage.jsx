import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { statistiquesAPI } from '../../services/api';
import Bloc from './Bloc';
import { ListeChiffres } from './Chiffre';
import useBloc from './useBloc';
import { moisEnCours, nomMois } from './periodes';

const charger = () => {
  const mois = moisEnCours();
  return statistiquesAPI.usage(mois).then((usage) => ({ mois, usage }));
};

/**
 * Bloc F, « Usage du mois » (UIX-11, question 1) : les comptes actifs du mois (R-12). Pas de lignes :
 * son volet montre le détail par rôle et par compteur, et la définition d'un compte actif. C'est
 * l'écart accepté par le chef à la règle « un chiffre mène à ses lignes ».
 */
export default function BlocUsage({ ouvrir }) {
  const { t, i18n } = useTranslation();
  const { donnees, chargement, erreur, recharger } = useBloc(useCallback(charger, []));
  const mois = donnees?.mois ?? moisEnCours();
  const libelleMois = nomMois(mois, i18n.language);

  const chiffres = [
    {
      id: 'usage',
      valeur: donnees?.usage?.comptes_actifs?.total ?? null,
      libelle: t('tableauDeBord.blocs.usage.comptes'),
      periode: t('tableauDeBord.ceMois'),
      parametres: { mois },
      periodeTexte: libelleMois,
    },
  ];

  return (
    <Bloc id="usage" titre={t('tableauDeBord.blocs.usage.titre')} periode={libelleMois} chargement={chargement} erreur={erreur} onReessayer={recharger} lignesSquelette={1}>
      <ListeChiffres chiffres={chiffres} ouvrir={ouvrir} />
    </Bloc>
  );
}
