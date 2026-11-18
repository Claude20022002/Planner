import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Collapse, IconButton, Stack, TableCell, TableRow, Typography } from '@mui/material';
import { Delete, Edit, KeyboardArrowDown, KeyboardArrowRight } from '@mui/icons-material';
import { lineColor } from '../../design-system/tokens';
import ComposantesModule from './ComposantesModule';
import { volumeTotal } from './formatage';

/** Une ligne de la maquette : le module, et dessous ses composantes quand on le déplie. */
export default function LigneModule({ module, ouvert, nombre, nomEnseignant, onBasculer, onModifier, onSupprimer, onAjouterComposante, onModifierComposante, onSupprimerComposante }) {
    const { t } = useTranslation();
    return (
        <Fragment>
            <TableRow hover sx={{ '& > td': { borderBottom: ouvert ? 0 : undefined } }}>
                <TableCell sx={{ px: 0.5 }}>
                    <IconButton
                        size="small"
                        onClick={() => onBasculer()}
                        aria-expanded={ouvert}
                        aria-label={t(ouvert ? 'ref.curriculum.collapse' : 'ref.curriculum.expand', { name: module.nom_cours })}
                    >
                        {ouvert ? <KeyboardArrowDown fontSize="small" /> : <KeyboardArrowRight fontSize="small" />}
                    </IconButton>
                </TableCell>
                <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Box component="span" aria-hidden sx={{ width: 9, height: 9, borderRadius: '2px', flexShrink: 0, bgcolor: lineColor(module.id_filiere) }} />
                        <Box sx={{ minWidth: 0 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                {module.nom_cours}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {module.code_cours} · {module.niveau}
                            </Typography>
                        </Box>
                    </Stack>
                </TableCell>
                <TableCell>{module.filiere?.code_filiere}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{module.semestre}</TableCell>
                <TableCell>
                    <Typography variant="body2" sx={{ overflowWrap: 'anywhere' }}>
                        {module.composantes.map((c) => `${c.type} ${nombre.format(c.volume_heures)} h`).join(' · ') || '-'}
                    </Typography>
                </TableCell>
                <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>{nombre.format(volumeTotal(module))} h</TableCell>
                <TableCell align="right">{module.ects ?? '-'}</TableCell>
                <TableCell>{module.id_responsable ? nomEnseignant(module.id_responsable) : '-'}</TableCell>
                <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                    <IconButton size="small" onClick={() => onModifier()} aria-label={t('ref.common.editItem', { name: module.nom_cours })}>
                        <Edit fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => onSupprimer()} aria-label={t('ref.common.deleteItem', { name: module.nom_cours })}>
                        <Delete fontSize="small" />
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={9} sx={{ py: 0, px: { xs: 0.5, md: 2 }, borderBottom: ouvert ? undefined : 0 }}>
                    <Collapse in={ouvert} timeout="auto" unmountOnExit>
                        <ComposantesModule module={module} nombre={nombre} onAjouterComposante={onAjouterComposante} onModifierComposante={onModifierComposante} onSupprimerComposante={onSupprimerComposante} />
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}
