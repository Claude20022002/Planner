/** Fiche, import et suppression d'une salle, ouverts depuis la page. */
import ConfirmDialog from '../common/ConfirmDialog';
import ImportSallesDialog from './ImportSallesDialog';
import SalleDialog from './SalleDialog';

export default function DialogsSalles({ modele: m }) {
  return (
    <>
      <SalleDialog modele={m} />
      <ImportSallesDialog modele={m} />
      <ConfirmDialog
        open={Boolean(m.aSupprimer)}
        title={m.t('ref.rooms.deleteTitle')}
        message={m.t('ref.rooms.deleteBody', { name: m.aSupprimer?.nom_salle })}
        onConfirm={m.supprimer}
        onCancel={() => m.setASupprimer(null)}
      />
    </>
  );
}
