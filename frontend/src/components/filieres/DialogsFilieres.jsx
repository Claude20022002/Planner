/** Formulaires, import, responsables et suppression de filière existants. */
import FiliereDialog from './FiliereDialog';
import ResponsablesDialog from './ResponsablesDialog';
import ImportCsvDialog from '../common/ImportCsvDialog';
import ConfirmDialog from '../common/ConfirmDialog';
import { FILIERE_VIDE, MODELE_CSV } from './fiche';
export default function DialogsFilieres({ modele }) {
 const { t, dialog, setDialog, champ, enregistrer, importOuvert, setImportOuvert, importer, filieres, idResponsables, setIdResponsables, charger, aSupprimer, setASupprimer, supprimer } = modele;
 return <>            <FiliereDialog
                ouvert={dialog.open}
                modification={Boolean(dialog.editing)}
                form={dialog.form}
                onChamp={champ}
                onFermer={() => setDialog({ open: false, editing: null, form: FILIERE_VIDE })}
                onEnregistrer={enregistrer}
            />

            <ImportCsvDialog
                open={importOuvert}
                onClose={() => setImportOuvert(false)}
                titre={t('ref.programs.importTitle')}
                intro={t('ref.programs.importIntro')}
                modele={MODELE_CSV}
                nomModele="modele-filieres.csv"
                onImport={importer}
            />

            <ResponsablesDialog filiere={filieres.find((f) => f.id_filiere === idResponsables) ?? null} onClose={() => setIdResponsables(null)} onChange={charger} />

            <ConfirmDialog
                open={Boolean(aSupprimer)}
                title={t('ref.programs.deleteTitle')}
                message={t('ref.programs.deleteBody', { name: aSupprimer?.nom_filiere })}
                onConfirm={supprimer}
                onCancel={() => setASupprimer(null)}
            /></>;
}
