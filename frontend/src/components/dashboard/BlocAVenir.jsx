import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { examenAPI } from '../../services/api';
import { toLocalISODate } from '../../utils/session';
import Bloc from './Bloc';
import { ListeChiffres } from './Chiffre';
import useBloc from './useBloc';
import { VOLETS } from './lignesDuVolet';
import { dateCourte, prochainsJours } from './periodes';

/** Nombre de jours de « À venir », aujourd'hui compris. */
const JOURS = 14;

/**
 * Bloc E, « À venir » (UIX-11, question 1) : les épreuves d'examen des 14 prochains jours, lues par
 * GET /examens. Une épreuve annulée n'est plus à venir (lignesDuVolet).
 */
export default function BlocAVenir({ ouvrir }) {
  const { t, i18n } = useTranslation();
  const jour = toLocalISODate();
  // eslint-disable-next-line react-hooks/exhaustive-deps -- la plage change avec le jour
  const plage = useMemo(() => prochainsJours(JOURS), [jour]);
  const charger = useCallback(() => examenAPI.getAll({ date_from: plage.debut, date_to: plage.fin }), [plage]);
  const { donnees, chargement, erreur, recharger } = useBloc(charger);

  const du = t('tableauDeBord.du', { debut: dateCourte(plage.debut, i18n.language), fin: dateCourte(plage.fin, i18n.language) });
  const court = t('tableauDeBord.quatorzeJours');
  const chiffres = [
    {
      id: 'examens',
      valeur: donnees ? VOLETS.examens.lignes(donnees).length : null,
      libelle: t('tableauDeBord.blocs.aVenir.examens'),
      periode: court,
      parametres: plage,
      periodeTexte: `${court}, ${du}`,
    },
  ];

  return (
    <Bloc id="a-venir" titre={t('tableauDeBord.blocs.aVenir.titre')} periode={du} chargement={chargement} erreur={erreur} onReessayer={recharger} lignesSquelette={1}>
      <ListeChiffres chiffres={chiffres} ouvrir={ouvrir} />
    </Bloc>
  );
}
