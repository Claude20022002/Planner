/** Fiche, import et suppression : dialogues groupes existants. */
import GroupeDialog from './GroupeDialog';
import ImportCsvDialog from '../common/ImportCsvDialog';
import ConfirmDialog from '../common/ConfirmDialog';
import { GROUPE_VIDE, MODELE_CSV } from './fiche';
export default function DialogsGroupes({ modele }) {
 const { t, dialog, setDialog, enregistrer, importOuvert, setImportOuvert, importer, aSupprimer, setASupprimer, supprimer } = modele;
 return <>            <GroupeDialog
                dialog={dialog}
                onChange={(nom, valeur) => setDialog((d) => ({ ...d, form: { ...d.form, [nom]: valeur } }))}
                onClose={() => setDialog({ open: false, editing: null, form: GROUPE_VIDE })}
                onSubmit={enregistrer}
            />

            <ImportCsvDialog
                open={importOuvert}
                onClose={() => setImportOuvert(false)}
                titre={t('ref.groups.importTitle')}
                intro={t('ref.groups.importIntro')}
                modele={MODELE_CSV}
                nomModele="modele-groupes.csv"
                onImport={importer}
            />

            <ConfirmDialog
                open={Boolean(aSupprimer)}
                title={t('ref.groups.deleteTitle')}
                message={t('ref.groups.deleteBody', { name: aSupprimer?.nom_groupe })}
                onConfirm={supprimer}
                onCancel={() => setASupprimer(null)}
            /></>;
}
