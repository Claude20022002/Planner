// Configuration du site vitrine (VIT-01) : site statique, une page par langue, îlots React possibles.
// Rien n'est mis en ligne : `npm run build` produit dist/, prévisualisé en local ou en artefact de CI.
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import { LANGUES_PUBLIEES } from './src/i18n/langues.js';

// Anciennes pages de fonction → nouvelle page (plan VIT-20, § 4.6). Astro écrit une page de renvoi sans script (CSP de VIT-06).
// La Bibliothèque est « Bientôt » : son ancienne adresse mène à « Toutes les applications ».
const RENVOIS = {
  'emploi-du-temps': 'applications/emploi-du-temps',
  'en-classe': 'applications/presences',
  'cours-et-annonces': 'applications/espace-de-cours',
  'quiz-et-jeux': 'applications/quiz-et-jeux',
  etablissement: 'socle',
  application: 'socle',
  bibliotheque: 'applications',
};
const redirects = Object.fromEntries(
  LANGUES_PUBLIEES.flatMap((lang) => Object.entries(RENVOIS).map(([ancien, nouveau]) => [`/${lang}/${ancien}/`, `/${lang}/${nouveau}/`])),
);

export default defineConfig({
  // Sous-domaine validé pour VIT-06 (plan vit-06-mise-en-ligne.md) : hreflang et Open Graph en adresses absolues.
  site: 'https://vitrine.finadmintech.fr',
  output: 'static',
  trailingSlash: 'always',
  redirects,
  integrations: [react()],
  devToolbar: { enabled: false },
  // Les logos des modules sont lus dans ../shared/icones/modules (VIT-09a) ; le serveur de développement doit pouvoir les servir.
  vite: { server: { fs: { allow: ['..'] } } },
  build: { format: 'directory', inlineStylesheets: 'auto' },
});
