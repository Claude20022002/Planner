/** Barre de travail : contexte, opérations secondaires puis action principale. */
import { Box, Typography } from '@mui/material';
export default function EnteteGestion({ contexte, children }) {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 2, mb: 3 }}>
      {contexte && (
        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: '65ch', flex: '1 1 280px' }}>
          {contexte}
        </Typography>
      )}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: 1,
          marginInlineStart: 'auto',
          '& button': { maxWidth: '100%' },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
