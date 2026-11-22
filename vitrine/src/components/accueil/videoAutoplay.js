// VIT-17 C9 : la vidéo ne part seule que sur un grand écran, sans mouvement réduit,
// sans économie de données et sans connexion lente. Sinon l'image fixe reste.
const CONNEXIONS_LENTES = new Set(['slow-2g', '2g', '3g']);

export const videoPeutPartirSeule = ({
  reduit = false,
  economie = false,
  mobile = false,
  effectiveType,
} = {}) => !reduit && !economie && !mobile && !CONNEXIONS_LENTES.has(effectiveType);
