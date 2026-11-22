/** Fenêtres du calendrier ouvertes depuis la page : année, semestre, événement, confirmation de date et suppression. */
import ConfirmDialog from '../common/ConfirmDialog';
import AnneeDialog from './AnneeDialog';
import ConfirmationDialog from './ConfirmationDialog';
import EvenementDialog from './EvenementDialog';
import PeriodeDialog from './PeriodeDialog';

export default function DialogsCalendrier({ modele: m }) {
  const { t, aSupprimer } = m;
  return (
    <>
      <AnneeDialog etat={m.anneeDialog} setEtat={m.setAnneeDialog} onSubmit={m.enregistrerAnnee} />
      <PeriodeDialog etat={m.periodeDialog} setEtat={m.setPeriodeDialog} onSubmit={m.enregistrerPeriode} />
      <EvenementDialog etat={m.evenementDialog} setEtat={m.setEvenementDialog} cibles={m.cibles} onSubmit={m.enregistrerEvenement} />
      <ConfirmationDialog etat={m.confirmation} setEtat={m.setConfirmation} onSubmit={m.confirmer} />
      <ConfirmDialog
        open={Boolean(aSupprimer)}
        title={t('ref.calendar.deleteTitle')}
        message={
          aSupprimer?.type === 'annee'
            ? t('ref.calendar.deleteYearBody', { name: aSupprimer.item.libelle })
            : t('ref.calendar.deleteBody', { name: aSupprimer?.item?.titre || aSupprimer?.item?.code })
        }
        onConfirm={m.supprimer}
        onCancel={() => m.setASupprimer(null)}
      />
    </>
  );
}
