/** État vide d'une liste. L'apparition est en CSS : la bibliothèque d'animation reste sur le lanceur. */
import { Box, Button, Paper, Typography } from '@mui/material';
import { InboxOutlined } from '@mui/icons-material';

export default function EmptyState({ title, description, actionLabel, onAction, icon }) {
  return (
    <Paper
      sx={{
        p: { xs: 3, sm: 4 },
        textAlign: 'center',
        border: '1px dashed',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        '@keyframes apparitionEtatVide': {
          from: { opacity: 0, transform: 'scale(0.98)' },
          to: { opacity: 1, transform: 'scale(1)' },
        },
        animation: 'apparitionEtatVide 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
        '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
      }}
    >
      <Box
        sx={{
          width: 52,
          height: 52,
          borderRadius: 2,
          mx: 'auto',
          mb: 2,
          display: 'grid',
          placeItems: 'center',
          bgcolor: 'action.hover',
          color: 'primary.main',
        }}
      >
        {icon || <InboxOutlined />}
      </Box>
      <Typography variant="h2">{title}</Typography>
      {description && (
        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 440, mx: 'auto', mt: 1 }}>
          {description}
        </Typography>
      )}
      {actionLabel && (
        <Button variant="contained" onClick={onAction} sx={{ mt: 2 }}>
          {actionLabel}
        </Button>
      )}
    </Paper>
  );
}
