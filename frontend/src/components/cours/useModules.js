/** Charge et modifie la maquette existante, sans modifier les contrats d’API. */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { composanteAPI, coursAPI, enseignantAPI, filiereAPI, salleAPI } from '../../services/api';
import { useToast } from '../../contexts/ToastContext';
import { useAuth } from '../../contexts/AuthContext';
import { filieresGerables } from '../../utils/droits';
import { fetchAll } from '../../utils/fetchAll';
import { COMPOSANTE_VIDE, MODULE_VIDE, TYPES, nombreOuNull, periodeDe } from './constantes';
import { importerModules } from './importerModules';
import { creerControleLecture } from '../gestion/controleLecture';
export default function useModules() {
    const { t, i18n } = useTranslation();
    const toast = useToast();
    const { user } = useAuth();
    const [modules, setModules] = useState([]);
    const [filieres, setFilieres] = useState([]);
    const [enseignants, setEnseignants] = useState([]);
    const [typesSalle, setTypesSalle] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erreurChargement, setErreurChargement] = useState('');
    const controle = useMemo(creerControleLecture, []);
    const [filiere, setFiliere] = useState('toutes');
    const [periode, setPeriode] = useState('toutes');
    const [search, setSearch] = useState('');
    const [ouverts, setOuverts] = useState(() => new Set());
    const [moduleDialog, setModuleDialog] = useState({ open: false, editing: null, form: MODULE_VIDE });
    const [composanteDialog, setComposanteDialog] = useState({ open: false, module: null, editing: null, form: COMPOSANTE_VIDE });
    const [aSupprimer, setASupprimer] = useState(null);
    const [importOuvert, setImportOuvert] = useState(false);

    const nombre = useMemo(() => new Intl.NumberFormat(i18n.language === 'en' ? 'en-GB' : 'fr-FR', { maximumFractionDigits: 1 }), [i18n.language]);

    const charger = useCallback(async () => {
        const active = controle.commencer();
        setLoading(true);
        setErreurChargement('');
        try {
            const [liste, listeFilieres, listeEnseignants, referentiel] = await Promise.all([
                fetchAll(coursAPI.getAll),
                fetchAll(filiereAPI.getAll),
                fetchAll(enseignantAPI.getAll),
                salleAPI.getReferentiel(),
            ]);
            if (!active()) return;
            setModules(liste);
            setFilieres(filieresGerables(listeFilieres, user));
            setEnseignants(listeEnseignants);
            setTypesSalle(referentiel.types_salle || []);
        } catch {
            if (active()) setErreurChargement(t('common.errorLoad'));
        } finally {
            if (active()) setLoading(false);
        }
    }, [t, user, controle]);

    useEffect(() => {
        charger();
        return () => controle.invalider();
    }, [charger, controle]);

    const idsGerables = useMemo(() => new Set(filieres.map((f) => f.id_filiere)), [filieres]);

    const modulesGerables = useMemo(() => modules.filter((m) => idsGerables.has(m.id_filiere)), [modules, idsGerables]);
    const modulesAffiches = useMemo(() => {
        const terme = search.trim().toLowerCase();
        return modulesGerables
            .filter((m) => filiere === 'toutes' || m.id_filiere === filiere)
            .filter((m) => periode === 'toutes' || periodeDe(m.semestre) === periode)
            .filter((m) => !terme || [m.code_cours, m.nom_cours].some((v) => v?.toLowerCase().includes(terme)))
            .sort((a, b) => (a.filiere?.code_filiere || '').localeCompare(b.filiere?.code_filiere || '') || a.semestre.localeCompare(b.semestre, 'fr', { numeric: true }) || a.code_cours.localeCompare(b.code_cours));
    }, [modulesGerables, filiere, periode, search]);

    const erreur = (error) => toast.error(error.response?.data?.error || error.response?.data?.errors?.[0]?.message || error.message);

    const basculer = (id) =>
        setOuverts((s) => {
            const suivant = new Set(s);
            if (suivant.has(id)) suivant.delete(id);
            else suivant.add(id);
            return suivant;
        });

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

    const nomEnseignant = (id) => {
        const e = enseignants.find((x) => x.id_user === id);
        return e ? `${e.user?.prenom || ''} ${e.user?.nom || ''}`.trim() : '-';
    };

 return { t, modulesGerables, filieres, enseignants, typesSalle, loading, erreurChargement, charger, filiere, setFiliere, periode, setPeriode, search, setSearch, ouverts, moduleDialog, setModuleDialog, composanteDialog, setComposanteDialog, aSupprimer, setASupprimer, importOuvert, setImportOuvert, nombre, modulesAffiches, basculer, ouvrirModule, enregistrerModule, ouvrirComposante, enregistrerComposante, supprimer, importer, nomEnseignant };
}
