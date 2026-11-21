/** L'année affichée : choix, état actif, dates, modification, suppression et ajout groupé des fériés. */
import { Box, Button, IconButton, MenuItem, TextField, Typography } from '@mui/material';
import { Delete, Edit, Flag } from '@mui/icons-material';
import StateChip from '../../design-system/components/StateChip';

export default function BarreAnnee({ modele: m }) {
  const { t, annee } = m;
  return (
    <Box sx={{ border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', borderRadius: 1, p: 2 }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1.5 }}>
        <TextField
          select
          label={t('ref.calendar.year')}
          value={m.idAnnee ?? ''}
          onChange={(e) => m.setIdAnnee(Number(e.target.value))}
          sx={{ minWidth: 180, flex: { xs: '1 1 100%', sm: '0 0 auto' } }}
        >
          {m.annees.map((a) => (
            <MenuItem key={a.id_annee} value={a.id_annee}>
              {a.libelle}
            </MenuItem>
          ))}
        </TextField>
        {annee && (
          <>
            {annee.active && <StateChip tone="success">{t('ref.calendar.active')}</StateChip>}
            <Typography variant="body2" color="text.secondary">
              {m.plage(annee.date_debut, annee.date_fin)}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1, marginInlineStart: 'auto' }}>
              <IconButton onClick={() => m.ouvrirAnnee(annee)} aria-label={t('ref.common.editItem', { name: annee.libelle })}>
                <Edit fontSize="small" />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => m.setASupprimer({ type: 'annee', item: annee })}
                aria-label={t('ref.common.deleteItem', { name: annee.libelle })}
              >
                <Delete fontSize="small" />
              </IconButton>
              <Button variant="outlined" startIcon={<Flag />} onClick={m.ajouterFeries}>
                {t('ref.calendar.addHolidays')}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
