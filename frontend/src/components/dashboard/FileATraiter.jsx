import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, ButtonBase, Typography } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { conflitAPI, demandeReportAPI, presenceAPI, suiviAPI } from '../../services/api';
import { formatDayLabel } from '../../utils/session';
import Bloc from './Bloc';
import useBloc from './useBloc';
import { moisEnCours } from './periodes';

/** Lignes montrées par sorte ; les totaux comptent tout. */
const LIGNES = 5;

/**
 * Les quatre listes de la file. Une route en panne met le bloc en erreur avec « Réessayer » : la
 * file n'affiche plus « Rien à traiter » quand elle n'a simplement pas pu lire.
 */
const charger = async () => {
  const [nonResolus, demandes, telephones, visas] = await Promise.all([
    conflitAPI.getNonResolus({ limit: LIGNES }),
    demandeReportAPI.getByStatut('en_attente'),
    // R-9 : changements de téléphone en attente, séances du mois à confirmer ou écarter avant la paie
    presenceAPI.demandesTelephone(),
    suiviAPI.seancesAVerifier(moisEnCours()),
  ]);
  const conflits = nonResolus?.data || [];
  const reports = demandes?.data || demandes || [];
  const tels = telephones?.data || [];
  return {
    conflits,
    totalConflits: nonResolus?.pagination?.total ?? conflits.length,
    reports: reports.slice(0, LIGNES),
    totalReports: reports.length,
    telephones: tels.slice(0, LIGNES),
    totalTelephones: tels.length,
    aVerifier: visas?.a_verifier ?? 0,
  };
};

/** Une ligne de la file : pastille de couleur, titre, détail, et la page où traiter. */
function Ligne({ ton, titre, detail, onClick }) {
  return (
    <Box component="li" sx={{ '& + &': { borderTop: '1px solid', borderColor: 'divider' } }}>
      <ButtonBase onClick={onClick} sx={{ width: '100%', minHeight: 44, display: 'flex', alignItems: 'flex-start', gap: 1.5, px: 2, py: 1.5, textAlign: 'left', '&:hover': { bgcolor: 'action.hover' } }}>
        <Box component="span" aria-hidden="true" sx={{ mt: '7px', width: 8, height: 8, borderRadius: '50%', flexShrink: 0, bgcolor: ton }} />
        <Box sx={{ minWidth: 0, flexGrow: 1 }}>
          <Typography sx={{ fontWeight: 600, fontSize: '0.9375rem', lineHeight: 1.35 }}>{titre}</Typography>
          <Typography sx={{ mt: 0.25, color: 'text.secondary', fontSize: '0.875rem', lineHeight: 1.45, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
            {detail}
          </Typography>
        </Box>
        <ArrowForward fontSize="small" sx={{ mt: '2px', color: 'text.secondary' }} />
      </ButtonBase>
    </Box>
  );
}

/**
 * Bloc B, la file « À traiter » du tableau de bord de l'administration (R-9, UIX-11), du plus urgent
 * au moins urgent : conflits ouverts, demandes de report, téléphones à changer (R-10), séances du
 * mois sans appel validé à confirmer ou écarter avant la paie (R-11). Chaque ligne mène à la page où
 * la traiter. Le bloc se charge et échoue seul.
 */
export default function FileATraiter() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { donnees: d, chargement, erreur, recharger } = useBloc(useCallback(charger, []));
  const vide = d && d.totalConflits === 0 && d.totalReports === 0 && d.totalTelephones === 0 && d.aVerifier === 0;
  const p = 'tableauDeBord.blocs.aTraiter';

  const resume = d
    ? [
        d.totalConflits ? t(`${p}.conflits`, { count: d.totalConflits }) : null,
        d.totalReports ? t(`${p}.reports`, { count: d.totalReports }) : null,
        d.totalTelephones ? t(`${p}.telephones`, { count: d.totalTelephones }) : null,
        d.aVerifier ? t(`${p}.aVerifier`, { count: d.aVerifier }) : null,
      ].filter(Boolean).join(' · ')
    : '';

  return (
    <Bloc id="a-traiter" titre={t(`${p}.titre`)} periode={resume || t(`${p}.periode`)} chargement={chargement} erreur={erreur} onReessayer={recharger} lignesSquelette={3}>
      {vide ? (
        <Typography sx={{ px: 2, py: 2.5, color: 'text.secondary', fontSize: '0.9375rem' }}>{t(`${p}.rien`)}</Typography>
      ) : (
        d && (
          <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
            {d.conflits.map((c) => (
              <Ligne
                key={`c-${c.id_conflit}`}
                ton="error.main"
                titre={t(`${p}.typeConflit.${c.type_conflit}`, { defaultValue: c.type_conflit })}
                detail={c.description}
                onClick={() => navigate('/gestion/conflits')}
              />
            ))}
            {d.reports.map((r) => (
              <Ligne
                key={`r-${r.id_demande}`}
                ton="warning.main"
                titre={t(`${p}.report`, { teacher: [r.enseignant?.prenom, r.enseignant?.nom].filter(Boolean).join(' ') || '-' })}
                detail={[
                  r.affectation?.cours?.nom_cours,
                  r.nouvelle_date ? t(`${p}.reportVers`, { date: formatDayLabel(String(r.nouvelle_date).slice(0, 10), i18n.language) }) : null,
                ].filter(Boolean).join(' · ')}
                onClick={() => navigate('/gestion/demandes-report')}
              />
            ))}
            {d.telephones.map((x) => (
              <Ligne
                key={`t-${x.id}`}
                ton="warning.main"
                titre={t(`${p}.telephone`, { student: x.etudiant?.nom ?? '-' })}
                detail={x.motif || t(`${p}.telephoneDetail`)}
                onClick={() => navigate('/gestion/signalements-presence')}
              />
            ))}
            {d.aVerifier > 0 && (
              <Ligne
                key="a-verifier"
                ton="warning.main"
                titre={t(`${p}.aVerifierTitre`, { count: d.aVerifier })}
                detail={t(`${p}.aVerifierDetail`)}
                onClick={() => navigate('/gestion/suivi?onglet=heures')}
              />
            )}
          </Box>
        )
      )}
    </Bloc>
  );
}
