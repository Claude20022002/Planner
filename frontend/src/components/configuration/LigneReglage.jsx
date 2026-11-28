/**
 * Une ligne de l'onglet « Réglages » : nom, aide, champ et unité, valeur de départ, effet (réponse 7),
 * pastilles, et le refus sous le champ : local tout de suite, puis celui du serveur après l'aperçu.
 * Une valeur hors bornes reste au brouillon (réponse 7) ; une saisie qui n'est pas un nombre en sort.
 */
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import StateChip from '../../design-system/components/StateChip';
import { cleTexte, controlerSaisie, depuisSaisie, valeurLisible, versSaisie } from './reglages';
import { texteDuRefus } from './refus';

export default function LigneReglage({ reglage: r, entree, refusServeur, onPoser, onRevenir, onRetirer }) {
    const { t } = useTranslation();
    const enCours = entree ? (entree.retiree ? r.valeur_du_profil : entree.valeur) : r.valeur;
    const [saisie, setSaisie] = useState(() => versSaisie(r, enCours));
    const cle = cleTexte(r.id);
    const nom = t(`configuration.reglages.${cle}.nom`, { defaultValue: r.id });
    const lisible = (v) => valeurLisible(r, v, t);
    const bornes = { min: lisible(r.min), max: lisible(r.max) };
    const local = controlerSaisie(r, saisie);
    const refus = local ?? refusServeur;
    const texteRefus = refus ? texteDuRefus(refus, t, { bornes }) : null;
    const unite = r.unite === 'nombre' ? null : t(`configuration.unites.${r.unite}`);

    const changer = (texte) => {
        setSaisie(texte);
        const valeur = depuisSaisie(r, texte);
        if (valeur === null) onRetirer(r.id);
        else onPoser(r.id, valeur, r.valeur);
    };

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'minmax(260px, 1fr) minmax(280px, 1fr)' },
                gap: { xs: 1.5, md: 3 },
                alignItems: 'start',
                px: { xs: 1.5, md: 2 },
                py: 2,
                borderTop: '1px solid',
                borderColor: 'divider',
            }}
        >
            <Box sx={{ minWidth: 0 }}>
                <Stack direction="row" spacing={1} useFlexGap sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
                    <Typography variant="subtitle1" component="h3" sx={{ fontWeight: 600 }}>
                        {nom}
                    </Typography>
                    {r.origine === 'etablissement' && <StateChip tone="info">{t('configuration.regleParEcole')}</StateChip>}
                    {entree && <StateChip tone="warning">{t('configuration.dansBrouillon')}</StateChip>}
                </Stack>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {t(`configuration.reglages.${cle}.aide`, { defaultValue: '' })}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                    {t('configuration.valeurDepart', { valeur: lisible(r.valeur_du_profil) })} · {t(`configuration.effet.${r.effet}`, { defaultValue: '' })}
                </Typography>
            </Box>
            <Box>
                <TextField
                    size="small"
                    value={saisie}
                    onChange={(e) => changer(e.target.value)}
                    error={Boolean(texteRefus)}
                    helperText={texteRefus || ' '}
                    slotProps={{
                        htmlInput: { inputMode: 'numeric', 'aria-label': nom },
                        input: unite ? { endAdornment: <InputAdornment position="end">{unite}</InputAdornment> } : undefined,
                    }}
                    sx={{ width: { xs: '100%', sm: 200 } }}
                />
                <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
                    {entree && (
                        <Button size="small" onClick={() => onRetirer(r.id, true)}>
                            {t('configuration.retirerDuBrouillon')}
                        </Button>
                    )}
                    {r.origine === 'etablissement' && !entree?.retiree && (
                        <Button size="small" onClick={() => onRevenir(r.id)}>
                            {t('configuration.revenirDepart')}
                        </Button>
                    )}
                </Stack>
            </Box>
        </Box>
    );
}
