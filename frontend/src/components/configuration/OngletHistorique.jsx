/**
 * L'onglet « Historique » (ADM-02b, R-3) : une ligne par version (numéro, libellé, date d'effet, état,
 * auteur, changements), le détail à la demande, « Annuler » et « Abandonner » avec confirmation.
 * Des lignes plutôt qu'un tableau : lisible à 390 px sans défilement horizontal.
 */
import { useTranslation } from 'react-i18next';
import { Alert, Box, Button, Collapse, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Stack, Typography } from '@mui/material';
import EmptyState from '../../design-system/components/EmptyState';
import StateChip from '../../design-system/components/StateChip';
import { TableSkeleton } from '../../design-system/components/PremiumSkeleton';
import DetailVersion from './DetailVersion';
import { actionsDe, auteurDe, compteDe, dateLisible, etatDe, libelleDe, TEINTES } from './historique';

export default function OngletHistorique({ modele: m, aujourdhui, reglages }) {
    const { t, i18n } = useTranslation();
    const date = (jour) => dateLisible(jour, i18n.language);
    if (m.erreur) {
        return (
            <Alert severity="error" action={<Button color="inherit" size="small" onClick={m.charger}>{t('common.retry')}</Button>}>
                {t('common.errorLoad')}
            </Alert>
        );
    }
    if (m.chargement) {
        return (
            <Box sx={{ p: 2 }} role="status" aria-label={t('configuration.onglets.historique')}>
                <TableSkeleton rows={4} />
            </Box>
        );
    }
    if (!m.versions.length) return <EmptyState title={t('configuration.historique.vide.titre')} description={t('configuration.historique.vide.description')} />;

    const c = m.confirmation;
    const prefixe = `configuration.historique.${c?.action === 'annuler' ? 'confirmerAnnuler' : 'confirmerAbandonner'}`;
    return (
        <>
            <Paper component="ul" sx={{ m: 0, p: 0, listStyle: 'none', border: '1px solid', borderColor: 'divider' }}>
                {m.versions.map((v, i) => {
                    const etat = etatDe(v, aujourdhui);
                    const actions = actionsDe(v, aujourdhui);
                    const detail = m.details[v.id_version];
                    return (
                        <Box component="li" key={v.id_version} sx={{ px: { xs: 1.5, md: 2 }, py: 1.5, borderTop: i ? '1px solid' : 0, borderColor: 'divider' }}>
                            <Stack direction="row" spacing={1} useFlexGap sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
                                <Typography variant="subtitle1" component="h3" sx={{ fontWeight: 600 }}>
                                    {t('configuration.historique.version', { n: v.id_version })} · {libelleDe(v, t)}
                                </Typography>
                                <StateChip tone={TEINTES[etat]}>{t(`configuration.historique.etat.${etat}`, { date: date(v.date_effet), n: v.annulee_par })}</StateChip>
                            </Stack>
                            <Typography variant="body2" color="text.secondary">
                                {t('configuration.historique.aPartirDu', { date: date(v.date_effet) })} · {t('configuration.historique.auteur', { nom: auteurDe(v, t) })} · {compteDe(v, t)}
                            </Typography>
                            <Stack direction="row" spacing={1} useFlexGap sx={{ mt: 0.5, flexWrap: 'wrap' }}>
                                <Button size="small" onClick={() => m.basculerDetail(v.id_version)} aria-expanded={Boolean(detail)}>
                                    {t(detail ? 'configuration.historique.masquerDetail' : 'configuration.historique.voirDetail')}
                                </Button>
                                {actions.annuler && (
                                    <Button size="small" color="warning" onClick={() => m.demanderConfirmation('annuler', v)}>
                                        {t('configuration.historique.annuler')}
                                    </Button>
                                )}
                                {actions.abandonner && (
                                    <Button size="small" color="warning" onClick={() => m.demanderConfirmation('abandonner', v)}>
                                        {t('configuration.historique.abandonner')}
                                    </Button>
                                )}
                            </Stack>
                            <Collapse in={Boolean(detail)} unmountOnExit>
                                {detail && <DetailVersion detail={detail} reglages={reglages} />}
                            </Collapse>
                        </Box>
                    );
                })}
            </Paper>
            {/* ConfirmDialog (components/common) écrit « Annuler » en dur : ici, « Garder », traduit */}
            <Dialog open={Boolean(c)} onClose={m.annulerConfirmation} maxWidth="xs" fullWidth aria-labelledby="titre-confirmation-version">
                <DialogTitle id="titre-confirmation-version">{c ? t(`${prefixe}.titre`, { n: c.version.id_version }) : ''}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{c ? t(`${prefixe}.message`) : ''}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={m.annulerConfirmation}>{t('configuration.historique.garder')}</Button>
                    <Button variant="contained" color="warning" onClick={m.executer}>
                        {c ? t(`${prefixe}.bouton`) : ''}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
