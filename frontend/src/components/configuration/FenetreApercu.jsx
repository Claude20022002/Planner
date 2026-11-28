/**
 * La fenêtre d'aperçu (ADM-02b, réponses 3, 7, 8 et 13) : date d'effet (jour de l'école par défaut,
 * jamais une date passée), libellé facultatif, avant → après et quand pour chaque réglage, refus sous
 * leur ligne, conflits avec « Recharger », puis « Appliquer », actif seulement si le serveur le permet.
 */
import { useTranslation } from 'react-i18next';
import { Alert, AlertTitle, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { dateLisible } from './historique';
import { cleTexte, valeurLisible } from './reglages';
import { texteDuRefus } from './refus';

const titreId = 'titre-apercu-configuration';

export default function FenetreApercu({ modele: m, reglages = [] }) {
    const { t, i18n } = useTranslation();
    const theme = useTheme();
    const plein = useMediaQuery(theme.breakpoints.down('sm'));
    const parId = new Map(reglages.map((r) => [r.id, r]));
    const r = m.resultat;
    const lisible = (id, v) => (parId.has(id) ? valeurLisible(parId.get(id), v, t) : v === null || v === undefined ? '—' : String(v));
    const nomDe = (c) => t(`configuration.reglages.${cleTexte(c.id)}.nom`, { defaultValue: c.nom ?? c.id });
    const bornesDe = (cle) => (parId.has(cle) ? { min: lisible(cle, parId.get(cle).min), max: lisible(cle, parId.get(cle).max) } : undefined);
    const texte = (v) => texteDuRefus(v, t, { bornes: bornesDe(v.cle) });
    const quand = (c) => {
        const effet = t(`configuration.effet.${c.effet}`, { defaultValue: '' });
        return m.dateEffet > m.aujourdhui ? t('configuration.apercu.aPartirDu', { date: dateLisible(m.dateEffet, i18n.language), effet }) : effet;
    };
    const refusDate = m.refus?.code?.startsWith('DATE_EFFET') ? m.refus : null;
    const autreRefus = m.refus && !refusDate ? m.refus : null;
    const violations = r?.violations ?? [];
    const conflits = r?.conflits ?? [];
    const changees = new Set((r?.changements ?? []).map((c) => c.id));
    const sansLigne = violations.filter((v) => !changees.has(v.cle));

    return (
        <Dialog open={m.ouvert} onClose={m.fermer} fullScreen={plein} maxWidth="sm" fullWidth aria-labelledby={titreId}>
            <DialogTitle id={titreId}>{t('configuration.apercu.titre')}</DialogTitle>
            <DialogContent dividers>
                <Stack spacing={2}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <TextField
                            type="date"
                            label={t('configuration.apercu.dateEffet')}
                            value={m.dateEffet}
                            onChange={(e) => m.changerDate(e.target.value)}
                            error={Boolean(refusDate)}
                            helperText={refusDate ? texteDuRefus(refusDate, t) : t('configuration.apercu.dateAide')}
                            slotProps={{ inputLabel: { shrink: true }, htmlInput: { min: m.aujourdhui } }}
                        />
                        <TextField
                            label={t('configuration.apercu.libelle')}
                            value={m.libelle}
                            onChange={(e) => m.setLibelle(e.target.value)}
                            helperText={t('configuration.apercu.libelleAide')}
                            slotProps={{ htmlInput: { maxLength: 200 } }}
                            sx={{ flex: 1 }}
                        />
                    </Stack>
                    {m.etat === 'calcul' && (
                        <Stack direction="row" spacing={1} role="status" sx={{ alignItems: 'center' }}>
                            <CircularProgress size={18} aria-hidden="true" />
                            <Typography variant="body2">{t('configuration.apercu.chargement')}</Typography>
                        </Stack>
                    )}
                    {autreRefus && <Alert severity="error">{autreRefus.code ? texteDuRefus(autreRefus, t) : t('configuration.apercu.erreur')}</Alert>}
                    {conflits.length > 0 && (
                        <Alert
                            severity="warning"
                            action={
                                <Button color="inherit" size="small" onClick={m.recharger}>
                                    {t('configuration.apercu.recharger')}
                                </Button>
                            }
                        >
                            <AlertTitle>{t('configuration.apercu.conflitsTitre')}</AlertTitle>
                            {conflits.map((c, i) => (
                                <Box key={i}>{c.cle ? `${nomDe({ id: c.cle })} : ${texte(c)}` : texte(c)}</Box>
                            ))}
                            <Box sx={{ mt: 0.5 }}>{t('configuration.apercu.rechargerAide')}</Box>
                        </Alert>
                    )}
                    {violations.length > 0 && (
                        <Alert severity="error">
                            {t('configuration.apercu.refusTitre')}
                            {sansLigne.map((v, i) => (
                                <Box key={i}>{texte(v)}</Box>
                            ))}
                        </Alert>
                    )}
                    {(r?.changements ?? []).map((c) => {
                        const refusDeLaLigne = violations.filter((v) => v.cle === c.id);
                        return (
                            <Box key={c.id} sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 1.5 }}>
                                <Typography variant="subtitle2" component="h3">
                                    {nomDe(c)}
                                </Typography>
                                <Typography variant="body2">
                                    {t('configuration.apercu.avant', { valeur: lisible(c.id, c.avant?.valeur) })} → {t('configuration.apercu.apres', { valeur: lisible(c.id, c.apres?.valeur) })}
                                </Typography>
                                <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                                    {quand(c)}
                                </Typography>
                                {refusDeLaLigne.map((v, i) => (
                                    <Typography key={i} variant="caption" color="error" sx={{ display: 'block' }}>
                                        {texte(v)}
                                    </Typography>
                                ))}
                            </Box>
                        );
                    })}
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={m.fermer}>{t('configuration.apercu.fermer')}</Button>
                <Button variant="contained" onClick={m.appliquer} disabled={!m.peutAppliquer}>
                    {t('configuration.apercu.appliquer')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
