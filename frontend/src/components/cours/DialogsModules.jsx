/** Formulaires et import de modules/composantes existants, assemblés sans changement métier. */
import ModuleDialog from './ModuleDialog';
import ComposanteDialog from './ComposanteDialog';
import ImportCsvDialog from '../common/ImportCsvDialog';
import ConfirmDialog from '../common/ConfirmDialog';
import { MODELE_CSV } from './constantes';
export default function DialogsModules({ modele }) {
  const {
    t,
    moduleDialog,
    setModuleDialog,
    filieres,
    enseignants,
    enregistrerModule,
    composanteDialog,
    setComposanteDialog,
    typesSalle,
    enregistrerComposante,
    importOuvert,
    setImportOuvert,
    importer,
    aSupprimer,
    setASupprimer,
    supprimer,
  } = modele;
  return (
    <>
      {' '}
      <ModuleDialog
        etat={moduleDialog}
        setEtat={setModuleDialog}
        filieres={filieres}
        enseignants={enseignants}
        onSubmit={enregistrerModule}
      />
      <ComposanteDialog
        etat={composanteDialog}
        setEtat={setComposanteDialog}
        typesSalle={typesSalle}
        onSubmit={enregistrerComposante}
      />
      <ImportCsvDialog
        open={importOuvert}
        onClose={() => setImportOuvert(false)}
        titre={t('ref.curriculum.importTitle')}
        intro={t('ref.curriculum.importIntro')}
        modele={MODELE_CSV}
        nomModele="modele-maquette.csv"
        onImport={importer}
      />
      <ConfirmDialog
        open={Boolean(aSupprimer)}
        title={t('ref.curriculum.deleteTitle')}
        message={
          aSupprimer?.type === 'module'
            ? t('ref.curriculum.deleteModuleBody', { name: aSupprimer.item.nom_cours })
            : t('ref.curriculum.deleteComponentBody', { type: aSupprimer?.item?.type, name: aSupprimer?.module?.nom_cours })
        }
        onConfirm={supprimer}
        onCancel={() => setASupprimer(null)}
      />
    </>
  );
}
