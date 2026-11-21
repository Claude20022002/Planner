import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { statistiquesAPI } from '../../services/api';
import { toLocalISODate } from '../../utils/session';
import Bloc from './Bloc';
import { ListeChiffres } from './Chiffre';
import useBloc from './useBloc';
import { dateCourte, semaineEnCours } from './periodes';

/**
 * Bloc C, « Cette semaine » (UIX-11, réponse 3 du chef) : occupation des salles, séances planifiées et
 * enseignants qui ont cours, lus par GET /statistiques/kpis sur la semaine en cours. Sur une semaine,
 * l'occupation est juste (le serveur la rapporte à 40 h par salle). Le taux de conflits n'est plus
 * affiché (réponse 5) : il mêle tout l'historique des conflits et les séances de la période.
 */
export default function BlocSemaine({ ouvrir }) {
  const { t, i18n } = useTranslation();
  const jour = toLocalISODate();
  // eslint-disable-next-line react-hooks/exhaustive-deps -- la semaine change avec le jour
  const semaine = useMemo(() => semaineEnCours(), [jour]);
  const charger = useCallback(() => statistiquesAPI.getKPIs({ date_debut: semaine.debut, date_fin: semaine.fin }), [semaine]);
  const { donnees, chargement, erreur, recharger } = useBloc(charger);

  const du = t('tableauDeBord.du', { debut: dateCourte(semaine.debut, i18n.language), fin: dateCourte(semaine.fin, i18n.language) });
  const court = t('tableauDeBord.cetteSemaine');
  const commun = { periode: court, parametres: semaine, periodeTexte: `${court}, ${du}` };
  const kpis = donnees?.kpis;
  const chiffres = [
    { id: 'occupationSalles', valeur: kpis?.taux_occupation_salles?.valeur, unite: '%', libelle: t('tableauDeBord.blocs.semaine.occupation'), ...commun },
    { id: 'seancesSemaine', valeur: kpis?.taux_conflits?.detail?.total_affectations, libelle: t('tableauDeBord.blocs.semaine.seances'), ...commun },
    { id: 'enseignantsSemaine', valeur: kpis?.moyenne_heures_enseignant?.detail?.enseignants_actifs, libelle: t('tableauDeBord.blocs.semaine.enseignants'), ...commun },
  ];

  return (
    <Bloc id="semaine" titre={t('tableauDeBord.blocs.semaine.titre')} periode={du} chargement={chargement} erreur={erreur} onReessayer={recharger} lignesSquelette={3}>
      <ListeChiffres chiffres={chiffres} ouvrir={ouvrir} />
    </Bloc>
  );
}
