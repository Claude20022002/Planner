import { useTranslation } from 'react-i18next';
import { Button, IconButton, Tooltip } from '@mui/material';
import { PrintOutlined } from '@mui/icons-material';
import { presenceAPI } from '../../services/api';
import { identiteEcole } from '../../services/etablissement';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { localeEcran } from '../../utils/dates';
import { feuilleAppelHtml } from './feuilleAppel';

const CLES_TEXTES = ['titre', 'matiere', 'groupe', 'date', 'horaire', 'salle', 'enseignant', 'numero', 'nom', 'prenom', 'present', 'retard', 'absent', 'motif', 'pied', 'imprimeLe', 'aucun'];

/**
 * « Imprimer la liste d'appel » d'une séance (M-1) : en bouton (page de l'appel) ou en icône (onglet
 * « Appel » d'une classe). La fenêtre s'ouvre au clic, avant la lecture de la liste, pour que le
 * navigateur ne la bloque pas, puis la feuille s'y écrit et l'impression se lance.
 * L'enseignant connecté signe la feuille de son nom ; pour l'administration, une ligne à remplir.
 */
export default function BoutonImprimer({ idAffectation, icone = false }) {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const toast = useToast();
  const libelle = t('appel.feuille.imprimer');

  const imprimer = async () => {
    const fenetre = window.open('', '_blank');
    if (!fenetre) {
      toast.error(t('appel.feuille.fenetreBloquee'));
      return;
    }
    try {
      const liste = await presenceAPI.liste(idAffectation);
      const locale = localeEcran(i18n.language);
      const textes = Object.fromEntries(CLES_TEXTES.map((cle) => [cle, t(`appel.feuille.${cle}`)]));
      const enseignant = user?.role === 'enseignant' ? [user.prenom, user.nom].filter(Boolean).join(' ') : null;
      const html = feuilleAppelHtml({ ecole: identiteEcole().nom, seance: liste.seance, etudiants: liste.etudiants, enseignant, textes, locale, imprimeLe: new Date().toLocaleDateString(locale) });
      fenetre.document.open();
      fenetre.document.write(html);
      fenetre.document.close();
      setTimeout(() => {
        try {
          fenetre.print();
        } catch {
          // la feuille reste affichée : l'impression se lance à la main
        }
      }, 300);
    } catch (e) {
      fenetre.close();
      toast.error(e?.message || t('appel.erreur'));
    }
  };

  if (icone) {
    return (
      <Tooltip title={libelle}>
        <IconButton size="small" onClick={imprimer} aria-label={libelle}>
          <PrintOutlined fontSize="small" />
        </IconButton>
      </Tooltip>
    );
  }
  return (
    <Button variant="outlined" startIcon={<PrintOutlined />} onClick={imprimer}>
      {libelle}
    </Button>
  );
}
