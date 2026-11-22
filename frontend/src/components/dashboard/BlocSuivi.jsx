import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import { calendrierAPI, suiviAPI } from '../../services/api';
import Bloc from './Bloc';
import { ListeChiffres } from './Chiffre';
import useBloc from './useBloc';
import { VOLETS } from './lignesDuVolet';
import { moisEnCours, nomMois, nomPeriode, periodeEnCours } from './periodes';

/** Les données du bloc : la période en cours (règle de la page Suivi), ses enseignements, les heures du mois. */
const charger = async () => {
  const mois = moisEnCours();
  const [annees, enseignants] = await Promise.all([calendrierAPI.getAnnees(), suiviAPI.enseignants(mois)]);
  const periode = periodeEnCours(annees);
  const modules = periode ? await suiviAPI.modules({ id_periode: periode.id_periode }) : null;
  return { mois, periode, modules, enseignants };
};

const arrondi = (n) => Math.round(n * 10) / 10;

/**
 * Bloc D, « Suivi » (UIX-11, question 1) : les enseignements en retard sur la période en cours, et les
 * heures réalisées du mois par les enseignants (vacataires compris, pour la paie). Les deux chiffres
 * comptent les lignes de leur volet (lignesDuVolet).
 */
export default function BlocSuivi({ ouvrir }) {
  const { t, i18n } = useTranslation();
  const { donnees, chargement, erreur, recharger } = useBloc(useCallback(charger, []));
  const periode = donnees?.periode;
  const mois = donnees?.mois ?? moisEnCours();
  const nom = nomPeriode(periode);

  const chiffres = [
    ...(periode
      ? [{
          id: 'enseignementsEnRetard',
          valeur: VOLETS.enseignementsEnRetard.lignes(donnees?.modules).length,
          libelle: t('tableauDeBord.blocs.suivi.enRetard'),
          periode: nom,
          parametres: { id_periode: periode.id_periode },
          periodeTexte: nom,
        }]
      : []),
    {
      id: 'heuresMois',
      valeur: donnees ? arrondi(VOLETS.heuresMois.lignes(donnees.enseignants).reduce((s, l) => s + (l.heures_realisees || 0), 0)) : null,
      unite: 'h',
      libelle: t('tableauDeBord.blocs.suivi.heures'),
      periode: t('tableauDeBord.ceMois'),
      parametres: { mois },
      periodeTexte: nomMois(mois, i18n.language),
    },
  ];

  return (
    <Bloc id="suivi" titre={t('tableauDeBord.blocs.suivi.titre')} periode={nom || nomMois(mois, i18n.language)} chargement={chargement} erreur={erreur} onReessayer={recharger}>
      {donnees && !periode && (
        <Typography sx={{ px: 2, pt: 1.5, color: 'text.secondary', fontSize: '0.875rem' }}>{t('tableauDeBord.blocs.suivi.sansPeriode')}</Typography>
      )}
      <ListeChiffres chiffres={chiffres} ouvrir={ouvrir} />
    </Bloc>
  );
}
