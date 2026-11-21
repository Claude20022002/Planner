/** Assemblage école/filet/PLANNER du kit ; logo complet uniquement sans école. */
import { useState } from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { adresseLogo, identiteEcole } from '../../services/etablissement';
import { estSansEcole, fichierMarque, hauteurMot } from './choixMarque.js';

export default function MarquePlanner({ hauteur = 28, identite = identiteEcole(), sx }) {
  const theme = useTheme();
  const sombre = theme.palette.mode === 'dark';
  const adresse = adresseLogo(identite);
  const [echec, setEchec] = useState(null);
  const sansEcole = estSansEcole(identite);
  const mot = hauteurMot(hauteur);
  return (
    <Box data-marque={sansEcole ? 'planner' : 'ecole'} sx={{ display: 'inline-flex', alignItems: 'center', minWidth: 0, maxWidth: '100%', py: 1, ...sx }}>
      {!sansEcole && <>
        {adresse && echec !== adresse ? (
          <Box component="img" src={adresse} alt={identite.nom} onError={() => setEchec(adresse)}
            sx={{ height: hauteur, maxWidth: 'min(45vw, 120px)', objectFit: 'contain', display: 'block', ...(sombre && { bgcolor: '#FFFFFF', outline: '4px solid #FFFFFF', borderRadius: '1px' }) }} />
        ) : (
          <Box component="span" title={identite.nom} sx={{ minWidth: 0, overflowWrap: 'anywhere', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, textTransform: 'uppercase', fontSize: hauteur * 0.7, lineHeight: 1, color: 'text.primary' }}>
            {identite.nom_court || identite.nom}
          </Box>
        )}
        <Box aria-hidden sx={{ height: hauteur, borderInlineStart: '1px solid', borderColor: 'text.primary', mx: (hauteur * 0.4) + 'px', flexShrink: 0 }} />
      </>}
      <Box component="img" src={fichierMarque(sansEcole, sombre)} alt="Planner"
        sx={sansEcole
          ? { width: Math.max(120, hauteur * 5), height: 'auto', display: 'block', flexShrink: 0, py: 0.5 }
          : { height: mot, width: 'auto', display: 'block', flexShrink: 0 }} />
    </Box>
  );
}
