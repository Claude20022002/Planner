/** Gère les formulaires, les écritures et l’import/export des groupes. */
import { useState } from 'react';
import { groupeAPI } from '../../services/api';
import { useToast } from '../../contexts/ToastContext';
import { fetchAll } from '../../utils/fetchAll';
import { exportToExcelLazy } from '../../utils/lazyExports';
import { COLS_GROUPES } from '../../utils/exportColumns';
import { ENFANT_DE, GROUPE_VIDE } from './fiche';

export default function useActionsGroupes({ t, filiere, filieres, filtre, anneeScolaire, relire }) {
  const toast = useToast();
    const [dialog, setDialog] = useState({ open: false, editing: null, form: GROUPE_VIDE });
    const [aSupprimer, setASupprimer] = useState(null);
    const [importOuvert, setImportOuvert] = useState(false);

    const erreur = (error) => toast.error(error.response?.data?.error || error.response?.data?.errors?.[0]?.message || error.message);

    const ouvrir = ({ groupe = null, parent = null } = {}) => {
        if (groupe) {
            setDialog({ open: true, editing: groupe, form: { ...GROUPE_VIDE, ...groupe, annee: groupe.annee ?? '' } });
            return;
        }
        setDialog({
            open: true,
            editing: null,
            form: parent
                ? {
                      ...GROUPE_VIDE,
                      id_filiere: parent.id_filiere,
                      niveau: parent.niveau,
                      annee: parent.annee ?? '',
                      annee_scolaire: parent.annee_scolaire,
                      type_groupe: ENFANT_DE[parent.type_groupe],
                      id_groupe_parent: parent.id_groupe,
                      nom_groupe: `${parent.nom_groupe}-`,
                  }
                : { ...GROUPE_VIDE, id_filiere: filiere, annee_scolaire: anneeScolaire },
        });
    };

    const enregistrer = async (event) => {
        event.preventDefault();
        const f = dialog.form;
        const data = {
            nom_groupe: f.nom_groupe.trim(),
            niveau: f.niveau.trim(),
            effectif: Number(f.effectif) || 0,
            annee_scolaire: f.annee_scolaire.trim(),
            id_filiere: Number(f.id_filiere),
            type_groupe: f.type_groupe,
            id_groupe_parent: f.id_groupe_parent || null,
            annee: f.annee === '' ? null : Number(f.annee),
        };
        try {
            if (dialog.editing) await groupeAPI.update(dialog.editing.id_groupe, data);
            else await groupeAPI.create(data);
            toast.success(t('ref.groups.saved'));
            setDialog({ open: false, editing: null, form: GROUPE_VIDE });
            relire();
        } catch (error) {
            erreur(error);
        }
    };

    const supprimer = async () => {
        const groupe = aSupprimer;
        setASupprimer(null);
        try {
            await groupeAPI.delete(groupe.id_groupe);
            toast.success(t('ref.groups.deleted'));
            relire();
        } catch (error) {
            erreur(error);
        }
    };

    const importer = async (lignesFichier) => {
        const parCode = new Map(filieres.map((f) => [f.code_filiere.toLowerCase(), f.id_filiere]));
        const crees = new Map();
        const erreurs = [];
        let reussies = 0;
        for (const [index, ligne] of lignesFichier.entries()) {
            try {
                const idFiliere = parCode.get(String(ligne.code_filiere || '').trim().toLowerCase());
                if (!idFiliere) throw new Error(t('ref.curriculum.unknownProgram', { code: ligne.code_filiere || '' }));
                const nomParent = String(ligne.parent || '').trim();
                const idParent = nomParent ? crees.get(nomParent) : null;
                if (nomParent && !idParent) throw new Error(t('ref.groups.parentNotFound', { name: nomParent }));
                const reponse = await groupeAPI.create({
                    nom_groupe: String(ligne.nom_groupe || '').trim(),
                    id_filiere: idFiliere,
                    niveau: String(ligne.niveau || '').trim(),
                    annee: ligne.annee ? Number(ligne.annee) : null,
                    effectif: Number(ligne.effectif) || 0,
                    annee_scolaire: String(ligne.annee_scolaire || anneeScolaire).trim(),
                    type_groupe: String(ligne.type_groupe || 'td').trim().toLowerCase(),
                    id_groupe_parent: idParent,
                });
                crees.set(reponse.groupe.nom_groupe, reponse.groupe.id_groupe);
                reussies += 1;
            } catch (error) {
                erreurs.push({
                    ligne: index + 2,
                    libelle: ligne.nom_groupe,
                    message: error.response?.data?.error || error.response?.data?.errors?.[0]?.message || error.message,
                });
            }
        }
        if (reussies) relire();
        return { reussies, erreurs };
    };


  const exporter = async () => {
    const groupes = await fetchAll(groupeAPI.getAll, { id_filiere: filiere, ...filtre });
    return exportToExcelLazy(groupes, COLS_GROUPES, 'Groupes', 'Groupes');
  };

  return {
    dialog, setDialog, aSupprimer, setASupprimer, importOuvert, setImportOuvert,
    ouvrir, enregistrer, supprimer, importer, exporter,
  };
}
