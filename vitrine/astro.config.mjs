// Configuration du site vitrine (VIT-01) : site statique, une page par langue, îlots React possibles.
// Rien n'est mis en ligne : `npm run build` produit dist/, prévisualisé en local ou en artefact de CI.
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  // Sous-domaine validé pour VIT-06 (plan vit-06-mise-en-ligne.md) : hreflang et Open Graph en adresses absolues.
  site: 'https://vitrine.finadmintech.fr',
  output: 'static',
  trailingSlash: 'always',
  integrations: [react()],
  devToolbar: { enabled: false },
  // Les logos des modules sont lus dans ../shared/icones/modules (VIT-09a) ; le serveur de développement doit pouvoir les servir.
  vite: { server: { fs: { allow: ['..'] } } },
  build: { format: 'directory', inlineStylesheets: 'auto' },
});
