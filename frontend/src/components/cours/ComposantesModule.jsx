/** Composantes dépliées : mêmes champs, en tableau ou fiches sur téléphone. */
import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import StateChip from '../../design-system/components/StateChip';
import { TYPES } from './constantes';
import { libelleSeance, rythme } from './formatage';
export default function ComposantesModule({
  module,
  nombre,
  onAjouterComposante,
  onModifierComposante,
  onSupprimerComposante,
}) {
  const { t } = useTranslation();
  const telephone = useMediaQuery('(max-width:1199px)');
  if (telephone)
    return (
      <Box>
        {module.composantes.map((c) => (
          <Box key={c.id_composante} sx={{ mt: 2, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
            <Typography component="h3" variant="body1" fontWeight={600}>
              {c.type}
            </Typography>
            <Box component="dl" sx={{ m: 0, display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 1 }}>
              {[
                [t('ref.curriculum.compCols.volume'), nombre.format(c.volume_heures) + ' h'],
                [t('ref.curriculum.compCols.group'), t('ref.groupTypes.' + c.niveau_groupe)],
                [t('ref.curriculum.compCols.session'), libelleSeance(t, c.creneaux_par_seance)],
                [t('ref.curriculum.compCols.mode'), t('ref.modes.' + c.modalite)],
                [t('gestion.modules.mention'), c.mention || '-'],
                [
                  t('ref.curriculum.compCols.room'),
                  c.type_salle_requis ? t('ref.roomTypes.' + c.type_salle_requis, { defaultValue: c.type_salle_requis }) : '-',
                ],
                [t('ref.curriculum.compCols.rhythm'), rythme(t, c)],
              ].map(([label, valeur]) => (
                <Box key={label} sx={{ minWidth: 0, overflowWrap: 'anywhere' }}>
                  <Typography component="dt" variant="caption" color="text.secondary">
                    {label}
                  </Typography>
                  <Typography component="dd" variant="body2" sx={{ m: 0 }}>
                    {valeur}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', flexWrap: 'wrap', mt: 1 }}>
              <IconButton
                onClick={() => onModifierComposante(c)}
                aria-label={t('ref.common.editItem', { name: module.nom_cours + ' ' + c.type })}
              >
                <Edit fontSize="small" />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => onSupprimerComposante(c)}
                aria-label={t('ref.common.deleteItem', { name: module.nom_cours + ' ' + c.type })}
              >
                <Delete fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        ))}
        {module.composantes.length < TYPES.length && (
          <Button startIcon={<Add />} onClick={onAjouterComposante}>
            {t('ref.curriculum.addComponent')}
          </Button>
        )}
      </Box>
    );
  return (
    <Box sx={{ pl: { md: 5 }, pb: 2, pt: 0.5 }}>
      <Table size="small" aria-label={t('ref.curriculum.componentsOf', { name: module.nom_cours })}>
        <TableHead>
          <TableRow>
            <TableCell>{t('ref.curriculum.compCols.type')}</TableCell>
            <TableCell align="right">{t('ref.curriculum.compCols.volume')}</TableCell>
            <TableCell>{t('ref.curriculum.compCols.group')}</TableCell>
            <TableCell>{t('ref.curriculum.compCols.session')}</TableCell>
            <TableCell>{t('ref.curriculum.compCols.mode')}</TableCell>
            <TableCell>{t('ref.curriculum.compCols.room')}</TableCell>
            <TableCell>{t('ref.curriculum.compCols.rhythm')}</TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          {module.composantes.map((c) => (
            <TableRow key={c.id_composante}>
              <TableCell sx={{ fontWeight: 600 }}>{c.type}</TableCell>
              <TableCell align="right">{nombre.format(c.volume_heures)} h</TableCell>
              <TableCell>{t(`ref.groupTypes.${c.niveau_groupe}`)}</TableCell>
              <TableCell>{libelleSeance(t, c.creneaux_par_seance)}</TableCell>
              <TableCell>
                {c.modalite === 'presentiel' ? (
                  <Typography variant="body2" color="text.secondary">
                    {t('ref.modes.presentiel')}
                  </Typography>
                ) : (
                  <StateChip tone="info" title={c.mention || undefined}>
                    {t(`ref.modes.${c.modalite}`)}
                  </StateChip>
                )}
              </TableCell>
              <TableCell>
                {c.type_salle_requis ? t(`ref.roomTypes.${c.type_salle_requis}`, { defaultValue: c.type_salle_requis }) : '-'}
              </TableCell>
              <TableCell>{rythme(t, c)}</TableCell>
              <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                <IconButton
                  size="small"
                  onClick={() => onModifierComposante(c)}
                  aria-label={t('ref.common.editItem', { name: `${module.nom_cours} ${c.type}` })}
                >
                  <Edit fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => onSupprimerComposante(c)}
                  aria-label={t('ref.common.deleteItem', { name: `${module.nom_cours} ${c.type}` })}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {module.composantes.length < TYPES.length && (
        <Button size="small" startIcon={<Add />} onClick={() => onAjouterComposante()} sx={{ mt: 1 }}>
          {t('ref.curriculum.addComponent')}
        </Button>
      )}
    </Box>
  );
}
