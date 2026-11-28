/**
 * Le détail d'une version, déplié dans l'historique : ses réglages (nom traduit pour les cinq de
 * l'école, sinon celui du catalogue) et ses contraintes ajoutées ou retirées, avec la phrase du serveur
 * (en français jusqu'à ADM-02c, qui la composera dans la langue de la personne).
 */
import { useTranslation } from 'react-i18next';
import { Box, CircularProgress, Typography } from '@mui/material';
import { cleTexte, valeurLisible } from './reglages';

export default function DetailVersion({ detail, reglages = [] }) {
    const { t } = useTranslation();
    if (detail === 'chargement') return <CircularProgress size={18} aria-label={t('configuration.historique.voirDetail')} />;
    const parId = new Map(reglages.map((r) => [r.id, r]));
    const valeur = (l) => {
        if (l.retiree) return t('configuration.historique.valeurDepart');
        if (parId.has(l.cle)) return valeurLisible(parId.get(l.cle), l.valeur, t);
        return typeof l.valeur === 'object' ? JSON.stringify(l.valeur) : String(l.valeur);
    };
    return (
        <Box component="ul" sx={{ m: 0, mt: 1, paddingInlineStart: 2.5 }}>
            {detail.reglages.map((l, i) => (
                <Typography component="li" variant="body2" key={`r${i}`}>
                    {t(`configuration.reglages.${cleTexte(l.cle)}.nom`, { defaultValue: l.nom })} : {valeur(l)}
                </Typography>
            ))}
            {detail.contraintes.map((c) => (
                <Typography component="li" variant="body2" key={`a${c.id_contrainte}`}>
                    {t('configuration.historique.ajoutee', { phrase: c.phrase })}
                </Typography>
            ))}
            {detail.retraits.map((c) => (
                <Typography component="li" variant="body2" key={`d${c.id_contrainte}`}>
                    {t('configuration.historique.retiree', { phrase: c.phrase })}
                </Typography>
            ))}
        </Box>
    );
}
