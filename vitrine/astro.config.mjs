// Configuration du site vitrine (VIT-01) : site statique, une page par langue, îlots React possibles.
// Rien n'est mis en ligne : `npm run build` produit dist/, prévisualisé en local ou en artefact de CI.
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  output: 'static',
  trailingSlash: 'always',
  integrations: [react()],
  devToolbar: { enabled: false },
  build: { format: 'directory', inlineStylesheets: 'auto' },
});
