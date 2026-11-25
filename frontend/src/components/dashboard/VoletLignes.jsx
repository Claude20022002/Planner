import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Alert, Box, Button, Drawer, IconButton, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,
} from '@mui/material';
import { ArrowForward, Close } from '@mui/icons-material';
import * as api from '../../services/api';
import { formatDayLabel, formatHeure } from '../../utils/session';
import { ds } from '../../design-system/tokens';
import { VOLETS } from './lignesDuVolet';

/**
 * Volet des lignes d'un chiffre du tableau de bord (UIX-11, réponse 2 du chef) : un tiroir à droite,
 * en plein écran sur téléphone. Il lit ses lignes à l'ouverture seulement (rien d'avance, EP-18),
 * par la même route et la même période que le chiffre, puis montre un tableau simple et « Tout voir »
 * vers la page de gestion. Il ne modifie rien. Échap le ferme et rend le focus au chiffre (Drawer).
 *
 * @param {string|null} chiffre - identifiant dans VOLETS ; null : volet fermé
 * @param {string} titre - le libellé du chiffre
 * @param {object} periode - paramètres de la période ({ debut, fin }, `mois` ou `id_periode`)
 * @param {string} periodeTexte - la période telle que le chiffre l'affiche
 */
export default function VoletLignes({ chiffre, titre, periode, periodeTexte, onFermer }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const volet = chiffre ? VOLETS[chiffre] : null;
  const [lignes, setLignes] = useState(null);
  const [erreur, setErreur] = useState(false);

  const outils = useMemo(() => {
    const format = new Intl.NumberFormat(i18n.language, { maximumFractionDigits: 1 });
    return {
      t,
      nombre: (n) => (n === null || n === undefined ? '-' : format.format(n)),
      date: (iso) => (iso ? formatDayLabel(String(iso).slice(0, 10), i18n.language) : '-'),
      heure: (h) => formatHeure(h),
    };
  }, [t, i18n.language]);

  // La période comparée par sa valeur : un objet recréé par le bloc ne relance pas la lecture
  const clePeriode = JSON.stringify(periode ?? {});
  // Seule la dernière demande écrit : la réponse en retard d'un volet fermé ne remplit pas celui
  // d'un autre chiffre (fix/uix-11-volet), comme dans useBloc
  const demande = useRef(0);
  const charger = useCallback(async () => {
    const numero = ++demande.current;
    if (!volet) return;
    setLignes(null);
    setErreur(false);
    try {
      const [objet, fonction] = volet.api;
      const reponse = await api[objet][fonction](...volet.arguments(JSON.parse(clePeriode)));
      if (numero === demande.current) setLignes(volet.lignes(reponse));
    } catch {
      if (numero === demande.current) setErreur(true);
    }
  }, [volet, clePeriode]);

  useEffect(() => {
    charger();
    // Une demande encore en route quand le volet se ferme ou change de chiffre n'écrit plus rien
    return () => {
      demande.current += 1;
    };
  }, [charger]);

  const toutVoir = () => {
    onFermer();
    navigate(volet.toutVoir);
  };

  const titreId = 'volet-lignes-titre';
  return (
    <Drawer
      anchor="right"
      open={Boolean(volet)}
      onClose={onFermer}
      slotProps={{ paper: { 'aria-labelledby': titreId, role: 'dialog', 'aria-modal': true, sx: { width: { xs: '100%', sm: 560, md: 720 }, maxWidth: '100%' } } }}
    >
      {volet && (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, px: 2, py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Box sx={{ minWidth: 0, flexGrow: 1 }}>
              <Typography id={titreId} component="h2" sx={{ fontWeight: 700, fontSize: '1.125rem', lineHeight: 1.4 }}>
                {titre}
              </Typography>
              <Typography sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>{periodeTexte}</Typography>
            </Box>
            <IconButton onClick={onFermer} aria-label={t('tableauDeBord.fermer')}>
              <Close />
            </IconButton>
          </Box>

          <Box sx={{ flexGrow: 1, overflow: 'auto', px: 2, py: 1.5 }}>
            {erreur ? (
              <Alert severity="error" action={<Button color="inherit" size="small" onClick={charger}>{t('common.retry')}</Button>}>
                {t('tableauDeBord.erreurVolet')}
              </Alert>
            ) : lignes === null ? (
              <Box sx={{ display: 'grid', gap: 1 }} aria-busy="true">
                {[0, 1, 2, 3].map((i) => (
                  <Skeleton key={i} variant="rectangular" height={36} sx={{ borderRadius: `${ds.radius.sm}px` }} />
                ))}
              </Box>
            ) : lignes.length === 0 ? (
              <Typography sx={{ color: 'text.secondary' }}>{t('tableauDeBord.aucuneLigne')}</Typography>
            ) : (
              <TableContainer>
                <Table size="small" aria-labelledby={titreId}>
                  <TableHead>
                    <TableRow>
                      {volet.colonnes.map((c) => (
                        <TableCell key={c.cle} align={c.nombre ? 'right' : 'left'} sx={{ fontWeight: 600 }}>
                          {t(`tableauDeBord.colonnes.${c.cle}`)}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {lignes.map((ligne, i) => (
                      <TableRow key={i}>
                        {volet.colonnes.map((c) => (
                          <TableCell key={c.cle} align={c.nombre ? 'right' : 'left'} sx={c.nombre ? { fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' } : undefined}>
                            {c.valeur(ligne, outils)}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
            {lignes && volet.plafond && lignes.length >= volet.plafond && (
              <Typography sx={{ mt: 1.5, color: 'text.secondary', fontSize: '0.875rem' }}>{t('tableauDeBord.notes.plafond', { count: volet.plafond })}</Typography>
            )}
            {lignes && volet.note && <Typography sx={{ mt: 1.5, color: 'text.secondary', fontSize: '0.875rem' }}>{t(`tableauDeBord.notes.${volet.note}`)}</Typography>}
          </Box>

          <Box sx={{ px: 2, py: 1.5, borderTop: '1px solid', borderColor: 'divider' }}>
            <Button variant="outlined" endIcon={<ArrowForward />} onClick={toutVoir}>
              {t('tableauDeBord.toutVoir')}
            </Button>
          </Box>
        </Box>
      )}
    </Drawer>
  );
}
