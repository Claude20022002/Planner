import { useTranslation } from 'react-i18next';
import { Box, ButtonBase, Typography } from '@mui/material';
import { ChevronRight } from '@mui/icons-material';
import { ds } from '../../design-system/tokens';

/**
 * Un chiffre du tableau de bord (UIX-11) : sa valeur, son unité, son libellé et sa période. C'est un
 * bouton, pas un lien : il ouvre le volet de ses lignes. Son nom accessible dit tout
 * (« 12 séances planifiées, cette semaine : voir les lignes »).
 *
 * Sans valeur (la route n'a rien rendu), le chiffre affiche « - » et ne s'ouvre pas.
 *
 * @param {number|null} valeur
 * @param {string} [unite] - « % », « h »… collée à la valeur
 * @param {string} libelle - « séances planifiées »
 * @param {string} periode - « cette semaine »
 * @param {(cible: HTMLElement) => void} onOuvrir - ouvre le volet ; reçoit le bouton, pour lui rendre le focus
 */
export default function Chiffre({ valeur, unite, libelle, periode, onOuvrir }) {
  const { t, i18n } = useTranslation();
  const absent = valeur === null || valeur === undefined;
  const texte = absent ? '-' : new Intl.NumberFormat(i18n.language, { maximumFractionDigits: 1 }).format(valeur);
  const valeurDite = absent ? t('tableauDeBord.sansValeur') : `${texte}${unite ? ` ${unite}` : ''}`;

  return (
    <ButtonBase
      onClick={(e) => onOuvrir?.(e.currentTarget)}
      disabled={absent}
      aria-label={t('tableauDeBord.chiffreNom', { valeur: valeurDite, libelle, periode })}
      sx={{
        width: '100%',
        minHeight: 44,
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        px: 2,
        py: 1.25,
        textAlign: 'left',
        borderRadius: `${ds.radius.sm}px`,
        '&:hover': { bgcolor: 'action.hover' },
      }}
    >
      <Box sx={{ minWidth: 0, flexGrow: 1 }}>
        <Typography component="span" sx={{ display: 'block', fontWeight: 500, fontSize: '0.9375rem', lineHeight: 1.35 }}>
          {libelle}
        </Typography>
        <Typography component="span" sx={{ display: 'block', color: 'text.secondary', fontSize: '0.8125rem' }}>
          {periode}
        </Typography>
      </Box>
      <Typography component="span" sx={{ fontWeight: 700, fontSize: '1.25rem', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>
        {texte}
        {!absent && unite && (
          <Box component="span" sx={{ ml: 0.25, fontSize: '0.875rem', fontWeight: 600, color: 'text.secondary' }}>
            {unite}
          </Box>
        )}
      </Typography>
      {!absent && <ChevronRight fontSize="small" aria-hidden="true" sx={{ color: 'text.secondary' }} />}
    </ButtonBase>
  );
}
