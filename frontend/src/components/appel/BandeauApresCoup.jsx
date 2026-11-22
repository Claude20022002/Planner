import { useTranslation } from 'react-i18next';
import { Alert, AlertTitle } from '@mui/material';
import { localeEcran } from '../../utils/dates';
// Dates de l'école, sans le fuseau du navigateur
import { dansJours } from '../../../../shared/dates.js';

/** Délai de la saisie après coup, en jours ; le serveur le tient (services/presences/apresCoup.js). */
const DELAI_JOURS = 7;

/**
 * Page de l'appel d'une séance passée sans appel (M-1) : pas de QR code, l'enseignant saisit l'appel
 * fait sur papier, puis le termine. La date limite affichée suit le serveur, qui refuse au-delà.
 */
export default function BandeauApresCoup({ seance }) {
  const { t, i18n } = useTranslation();
  if (!seance?.date) return null;
  const locale = localeEcran(i18n.language);
  const enLettres = (iso) => new Date(`${iso}T12:00:00Z`).toLocaleDateString(locale, { timeZone: 'UTC', weekday: 'long', day: 'numeric', month: 'long' });
  const limite = dansJours(DELAI_JOURS, new Date(`${seance.date}T12:00:00Z`));
  return (
    <Alert severity="info" sx={{ textAlign: 'left' }}>
      <AlertTitle>{t('appel.apresCoup.titre', { date: enLettres(seance.date) })}</AlertTitle>
      {t('appel.apresCoup.aide', { limite: enLettres(limite) })}
    </Alert>
  );
}
