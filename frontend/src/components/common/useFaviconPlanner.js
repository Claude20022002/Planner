/** Favicon générique du kit ; ne remplace jamais le favicon d’une école. */
import { useEffect } from 'react';
import { identiteEcole } from '../../services/etablissement';
import { estSansEcole } from './choixMarque.js';

export default function useFaviconPlanner(actif) {
  useEffect(() => {
    if (!actif || !estSansEcole(identiteEcole())) return undefined;
    const lien = document.querySelector('link[rel="icon"]');
    if (!lien) return undefined;
    const href = lien.getAttribute('href');
    const type = lien.getAttribute('type');
    lien.setAttribute('href', '/marque/favicon.svg');
    lien.setAttribute('type', 'image/svg+xml');
    return () => {
      if (href === null) lien.removeAttribute('href'); else lien.setAttribute('href', href);
      if (type === null) lien.removeAttribute('type'); else lien.setAttribute('type', type);
    };
  }, [actif]);
}
