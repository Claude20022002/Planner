/** Gère les formulaires et les écritures de la maquette pédagogique. */
import { useState } from 'react';
import { composanteAPI, coursAPI } from '../../services/api';
import { useToast } from '../../contexts/ToastContext';
import { COMPOSANTE_VIDE, MODULE_VIDE, TYPES, nombreOuNull } from './constantes';
import { importerModules } from './importerModules';

export default function useActionsModules({ t, filiere, filieres, charger, setOuverts }) {
    const toast = useToast();
    const [moduleDialog, setModuleDialog] = useState({ open: false, editing: null, form: MODULE_VIDE });
    const [composanteDialog, setComposanteDialog] = useState({ open: false, module: null, editing: null, form: COMPOSANTE_VIDE });
    const [aSupprimer, setASupprimer] = useState(null);
    const [importOuvert, setImportOuvert] = useState(false);

    const erreur = (error) => toast.error(error.response?.data?.error || error.response?.data?.errors?.[0]?.message || error.message);

    // ── Modules ───────────────────────────────────────────────────────────
    const ouvrirModule = (module = null) =>
        setModuleDialog({
            open: true,
            editing: module,
            form: module
                ? {
                      ...MODULE_VIDE,
                      ...module,
                      ects: module.ects ?? '',
                      id_responsable: module.id_responsable ?? '',
                  }
                : { ...MODULE_VIDE, id_filiere: filiere === 'toutes' ? filieres[0]?.id_filiere ?? '' : filiere },
        });

    const enregistrerModule = async (event) => {
        event.preventDefault();
        const f = moduleDialog.form;
        const data = {
            code_cours: f.code_cours.trim(),
            nom_cours: f.nom_cours.trim(),
            id_filiere: Number(f.id_filiere),
            niveau: f.niveau.trim(),
            semestre: f.semestre,
            ects: nombreOuNull(f.ects),
            coefficient: Number(f.coefficient) || 1,
            id_responsable: nombreOuNull(f.id_responsable),
        };
        if (!moduleDialog.editing) {
            data.type_cours = f.type_cours;
            data.volume_horaire = Number(f.volume_horaire);
        }
        try {
            if (moduleDialog.editing) await coursAPI.update(moduleDialog.editing.id_cours, data);
            else await coursAPI.create(data);
            toast.success(t('ref.curriculum.moduleSaved'));
            setModuleDialog({ open: false, editing: null, form: MODULE_VIDE });
            charger();
        } catch (error) {
            erreur(error);
        }
    };

    // ── Composantes ───────────────────────────────────────────────────────
    const ouvrirComposante = (module, composante = null) =>
        setComposanteDialog({
            open: true,
            module,
            editing: composante,
            form: composante
                ? {
                      ...COMPOSANTE_VIDE,
                      ...composante,
                      mention: composante.mention || '',
                      type_salle_requis: composante.type_salle_requis || '',
                      semaine_debut: composante.semaine_debut ?? '',
                      semaine_fin: composante.semaine_fin ?? '',
                      seances_par_semaine: composante.seances_par_semaine ?? '',
                  }
                : { ...COMPOSANTE_VIDE, type: TYPES.find((type) => !module.composantes.some((c) => c.type === type)) || 'TD' },
        });

    const enregistrerComposante = async (event) => {
        event.preventDefault();
        const f = composanteDialog.form;
        const data = {
            type: f.type,
            volume_heures: Number(f.volume_heures),
            niveau_groupe: f.niveau_groupe,
            creneaux_par_seance: Number(f.creneaux_par_seance),
            modalite: f.modalite,
            mention: f.mention.trim() || null,
            type_salle_requis: f.modalite === 'distanciel' ? null : f.type_salle_requis || null,
            semaine_debut: nombreOuNull(f.semaine_debut),
            semaine_fin: nombreOuNull(f.semaine_fin),
            seances_par_semaine: nombreOuNull(f.seances_par_semaine),
        };
        try {
            if (composanteDialog.editing) await composanteAPI.update(composanteDialog.editing.id_composante, data);
            else await coursAPI.createComposante(composanteDialog.module.id_cours, data);
            toast.success(t('ref.curriculum.componentSaved'));
            setOuverts((s) => new Set(s).add(composanteDialog.module.id_cours));
            setComposanteDialog({ open: false, module: null, editing: null, form: COMPOSANTE_VIDE });
            charger();
        } catch (error) {
            erreur(error);
        }
    };

    const supprimer = async () => {
        const { type, item } = aSupprimer;
        setASupprimer(null);
        try {
            if (type === 'module') await coursAPI.delete(item.id_cours);
            else await composanteAPI.delete(item.id_composante);
            toast.success(t('ref.curriculum.deleted'));
            charger();
        } catch (error) {
            erreur(error);
        }
    };

    // ── Import ligne à ligne ──────────────────────────────────────────────
    const importer = async (lignes) => {
        const bilan = await importerModules(lignes, filieres, t);
        if (bilan.reussies) charger();
        return bilan;
    };


    return {
        moduleDialog, setModuleDialog, composanteDialog, setComposanteDialog,
        aSupprimer, setASupprimer, importOuvert, setImportOuvert,
        ouvrirModule, enregistrerModule, ouvrirComposante, enregistrerComposante, supprimer, importer,
    };
}
