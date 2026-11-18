/** Module téléphone : synthèse, actions, puis détails de composantes dépliables. */
import { Box, Button, Collapse, IconButton, Typography } from '@mui/material';
import { Edit, Delete, ExpandMore, ExpandLess } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import ComposantesModule from './ComposantesModule';
import { volumeTotal } from './formatage';
export default function CarteModule(props) {
 const { module: m, ouvert, nombre, nomEnseignant, onBasculer, onModifier, onSupprimer } = props;
 const { t } = useTranslation();
 return <Box component="li" sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider', overflowWrap: 'anywhere' }}>
  <Typography component="h2" variant="body1" fontWeight={600}>{m.nom_cours}</Typography>
  <Typography variant="body2" color="text.secondary">{m.code_cours} · {m.niveau} · {m.filiere?.code_filiere} · {m.semestre}</Typography>
  <Typography variant="body2" sx={{ mt: 1 }}>{t('ref.curriculum.cols.volume')} : {nombre.format(volumeTotal(m))} h</Typography>
  <Typography variant="body2">{t('ref.curriculum.cols.ects')} : {m.ects ?? '-'} · {t('ref.curriculum.cols.lead')} : {m.id_responsable ? nomEnseignant(m.id_responsable) : '-'}</Typography>
  <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', mt: 1 }}>
   <Button aria-expanded={ouvert} onClick={onBasculer} startIcon={ouvert ? <ExpandLess /> : <ExpandMore />} aria-label={t(ouvert ? 'ref.curriculum.collapse' : 'ref.curriculum.expand', { name: m.nom_cours })}>{t('ref.curriculum.cols.components')}</Button>
   <IconButton onClick={onModifier} aria-label={t('ref.common.editItem', { name: m.nom_cours })}><Edit fontSize="small" /></IconButton>
   <IconButton color="error" onClick={onSupprimer} aria-label={t('ref.common.deleteItem', { name: m.nom_cours })}><Delete fontSize="small" /></IconButton>
  </Box>
  <Collapse in={ouvert} unmountOnExit><ComposantesModule {...props} /></Collapse>
 </Box>;
}
