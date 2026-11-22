import { useTranslation } from 'react-i18next';
import { Alert, AlertTitle } from '@mui/material';
import { localeEcran } from '../../utils/dates';

/** Une date de calendrier (AAAA-MM-JJ) écrite en lettres, sans aucun décalage horaire. */
const enLettres = (iso, locale) => new Date(`${iso}T12:00:00Z`).toLocaleDateString(locale, { timeZone: 'UTC', weekday: 'long', day: 'numeric', month: 'long' });

/**
 * Page de l'appel d'une séance sans appel, hors du jour même (M-1) : pas de QR code. Dans le délai,
 * l'enseignant saisit l'appel fait sur papier, puis le termine ; la date limite est celle que rend
 * le serveur (etat.saisie_possible_jusqu_au). Hors délai, à venir ou annulée : un message, en lecture.
 */
export default function BandeauApresCoup({ seance, etat }) {
  const { t, i18n } = useTranslation();
  if (!seance?.date || !etat) return null;
  const locale = localeEcran(i18n.language);
  if (etat.mode === 'apres_coup') {
    return (
      <Alert severity="info" sx={{ textAlign: 'left' }}>
        <AlertTitle>{t('appel.apresCoup.titre', { date: enLettres(seance.date, locale) })}</AlertTitle>
        {t('appel.apresCoup.aide', { limite: enLettres(etat.saisie_possible_jusqu_au, locale) })}
      </Alert>
    );
  }
  const cle = { hors_delai: 'horsDelai', a_venir: 'aVenir', annulee: 'annulee' }[etat.mode] ?? 'horsDelai';
  return (
    <Alert severity={etat.mode === 'a_venir' ? 'info' : 'warning'} sx={{ textAlign: 'left' }}>
      {t(`appel.apresCoup.${cle}`)}
    </Alert>
  );
}
