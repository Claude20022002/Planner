/**
 * Enregistre les textes de la page « Configuration » à l'import de la page, chargée à la demande :
 * ils restent hors du premier chargement de l'application (EP-19, réponse 4 du plan d'ADM-02b).
 */
import i18n from '../../i18n';
import fr from '../../i18n/ressources/configuration.fr.js';
import en from '../../i18n/ressources/configuration.en.js';

i18n.addResourceBundle('fr', 'translation', { configuration: fr }, true, true);
i18n.addResourceBundle('en', 'translation', { configuration: en }, true, true);
