/**
 * Assemble les grilles horaires (UIX-06c, lot 3) : une grille par régime et par variante (la variante ramadan reprend
 * les mêmes rangs à horaires réduits). Grille sur ordinateur, liste par jour sur téléphone ; données et droits inchangés.
 */
import { Button, MenuItem, TextField, useMediaQuery } from '@mui/material';
import { Add } from '@mui/icons-material';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import EnteteGestion from '../../components/gestion/EnteteGestion';
import EtatsGestion from '../../components/gestion/EtatsGestion';
import RechercheGestion from '../../components/gestion/RechercheGestion';
import CreneauDialog from '../../components/creneaux/CreneauDialog';
import GrilleCreneaux from '../../components/creneaux/GrilleCreneaux';
import JoursCreneaux from '../../components/creneaux/JoursCreneaux';
import useCreneaux from '../../components/creneaux/useCreneaux';
import { REGIMES, VARIANTES } from '../../components/creneaux/grille';

export default function Creneaux() {
  const m = useCreneaux();
  const { t } = m;
  const telephone = useMediaQuery('(max-width:699px)');
  const choix = (libelle, valeur, changer, options, cle) => (
    <TextField select label={t(libelle)} value={valeur} onChange={(e) => changer(e.target.value)} sx={{ minWidth: { sm: 220 } }}>
      {options.map((o) => (
        <MenuItem key={o} value={o}>
          {t(cle + o)}
        </MenuItem>
      ))}
    </TextField>
  );
  const vide = !m.loading && !m.erreurChargement && m.creneaux.length === 0;
  return (
    <DashboardLayout>
      <EnteteGestion contexte={t('ref.grids.intro')}>
        <Button variant="contained" startIcon={<Add />} onClick={() => m.ouvrir()}>
          {t('ref.grids.addSlot')}
        </Button>
      </EnteteGestion>
      <RechercheGestion nombre={m.creneaux.length}>
        {choix('ref.grids.regimeLabel', m.regime, m.setRegime, REGIMES, 'ref.regimes.')}
        {choix('ref.grids.variantLabel', m.variante, m.setVariante, VARIANTES, 'ref.grids.variants.')}
      </RechercheGestion>
      {m.loading || m.erreurChargement || vide ? (
        <EtatsGestion
          chargement={m.loading}
          erreur={m.erreurChargement}
          recharger={m.charger}
          vide
          titreVide={t('ref.grids.emptyTitle')}
          aideVide={t('ref.grids.emptyBody')}
          creer={() => m.ouvrir()}
        />
      ) : telephone ? (
        <JoursCreneaux modele={m} />
      ) : (
        <GrilleCreneaux modele={m} />
      )}
      <CreneauDialog modele={m} />
    </DashboardLayout>
  );
}
