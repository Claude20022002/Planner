/** Affiche la liste de fiches du référentiel sur téléphone. */
import { Fragment } from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

function ChampsFiche({ colonnes, ligne }) {
  return (
    <Box
      component="dl"
      sx={{
        m: 0,
        mt: 1,
        display: 'grid',
        gridTemplateColumns: 'minmax(80px, 0.8fr) minmax(0, 1.2fr)',
        gap: '6px 12px',
      }}
    >
      {colonnes.map((col) => (
        <Fragment key={col.cle}>
          <Typography component="dt" variant="body2" color="text.secondary">
            {col.libelle}
          </Typography>
          <Box component="dd" sx={{ m: 0, minWidth: 0, overflowWrap: 'anywhere', fontSize: 14 }}>
            {col.afficher(ligne)}
          </Box>
        </Fragment>
      ))}
    </Box>
  );
}

export default function FichesGestion({
  lignes,
  colonnes,
  titre,
  actions,
  selection,
  cleLigne,
  namespace,
  replierTelephone,
  complementTitre,
}) {
  const { t } = useTranslation();
  return (
    <Box>
      {colonnes.some((col) => col.entete) && (
        <Box role="group" aria-label={t(namespace + '.trier')} sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, p: 1, mb: 1 }}>
          {colonnes
            .filter((col) => col.entete)
            .map((col) => (
              <Box key={col.cle}>{col.entete}</Box>
            ))}
        </Box>
      )}
      {selection && <Box sx={{ mb: 1 }}>{selection.entete}</Box>}
      <Box
        component="ul"
        sx={{
          listStyle: 'none',
          m: 0,
          p: 0,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
          bgcolor: 'background.paper',
        }}
      >
        {lignes.map((ligne) => (
          <Box component="li" key={cleLigne(ligne)} sx={{ p: 2, '& + li': { borderTop: '1px solid', borderColor: 'divider' } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
              {selection?.ligne(ligne)}
              <Typography component="h2" variant="body1" sx={{ fontWeight: 600, overflowWrap: 'anywhere' }}>
                {titre(ligne)}
              </Typography>
            </Box>
            {complementTitre?.(ligne)}
            {replierTelephone ? (
              <Box
                component="details"
                sx={{
                  mt: 1,
                  '& summary': { cursor: 'pointer', minHeight: 44, display: 'flex', alignItems: 'center', fontWeight: 600 },
                }}
              >
                <summary>{t('gestion.details')}</summary>
                <ChampsFiche colonnes={colonnes} ligne={ligne} />
              </Box>
            ) : (
              <ChampsFiche colonnes={colonnes} ligne={ligne} />
            )}

            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: 0.5, mt: 1 }}>{actions(ligne)}</Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
