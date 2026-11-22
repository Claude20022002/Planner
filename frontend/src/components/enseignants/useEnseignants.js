/** Charge et actions existantes des enseignants, séparées de la présentation. */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { campusAPI, coursAPI, enseignantAPI, userAPI } from '../../services/api';
import { useToast } from '../../contexts/ToastContext';
import { fetchAll } from '../../utils/fetchAll';
import { exportToExcelLazy } from '../../utils/lazyExports';
import { COLS_ENSEIGNANTS } from '../../utils/exportColumns';
import { localeEcran } from '../../utils/dates';
import { FICHE_VIDE, nombreOuNull } from './fiche';
export default function useEnseignants() {
    const { t, i18n } = useTranslation();
    const toast = useToast();
    const [enseignants, setEnseignants] = useState([]);
    const [charges, setCharges] = useState({ annee: null, parId: new Map() });
    const [comptesSansFiche, setComptesSansFiche] = useState([]);
    const [campus, setCampus] = useState([]);
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erreurChargement, setErreurChargement] = useState('');
    const [search, setSearch] = useState('');
    const [statut, setStatut] = useState('tous');
    const [dialog, setDialog] = useState({ open: false, editing: null, form: FICHE_VIDE });
    const [enregistrement, setEnregistrement] = useState(false);
    const [competences, setCompetences] = useState(null);
    const [aSupprimer, setASupprimer] = useState(null);
    const [importOuvert, setImportOuvert] = useState(false);

    const nombre = useMemo(() => new Intl.NumberFormat(localeEcran(i18n.language), { maximumFractionDigits: 1 }), [i18n.language]);

    const charger = useCallback(async () => {
        setLoading(true);
        setErreurChargement('');
        try {
            const [liste, lesCharges, comptes] = await Promise.all([
                fetchAll(enseignantAPI.getAll),
                enseignantAPI.getCharges(),
                fetchAll(userAPI.getAll, { role: 'enseignant' }),
            ]);
            setEnseignants(liste);
            setCharges({ annee: lesCharges.annee, parId: new Map(lesCharges.charges.map((c) => [c.id_user, c])) });
            const avecFiche = new Set(liste.map((e) => e.id_user));
            setComptesSansFiche(comptes.filter((u) => u.role === 'enseignant' && !avecFiche.has(u.id_user)));
        } catch {
            setErreurChargement(t('common.errorLoad'));
            toast.error(t('common.errorLoad'));
        } finally {
            setLoading(false);
        }
    }, [t, toast]);

    useEffect(() => {
        charger();
        Promise.all([campusAPI.getAll(), fetchAll(coursAPI.getAll)])
            .then(([listeCampus, listeModules]) => {
                setCampus(listeCampus.data ?? listeCampus);
                setModules(listeModules);
            })
            .catch(() => {});
    }, [charger]);

    const erreur = (error) => toast.error(error.response?.data?.error || error.response?.data?.errors?.[0]?.message || error.message);

    const affiches = useMemo(() => {
        const terme = search.trim().toLowerCase();
        return enseignants
            .filter((e) => statut === 'tous' || e.statut === statut)
            .filter((e) => !terme || [e.user?.nom, e.user?.prenom, e.user?.email, e.specialite, e.departement].some((v) => v?.toLowerCase().includes(terme)))
            .sort((a, b) => (a.user?.nom || '').localeCompare(b.user?.nom || '', 'fr') || (a.user?.prenom || '').localeCompare(b.user?.prenom || '', 'fr'));
    }, [enseignants, search, statut]);

    const ouvrir = (enseignant = null) =>
        setDialog({
            open: true,
            editing: enseignant,
            form: enseignant
                ? Object.fromEntries(Object.keys(FICHE_VIDE).map((k) => [k, enseignant[k] ?? '']))
                : FICHE_VIDE,
        });

    const champ = (nom) => (e) => setDialog((d) => ({ ...d, form: { ...d.form, [nom]: e.target.value } }));

    const enregistrer = async (event) => {
        event.preventDefault();
        if (enregistrement) return;
        setEnregistrement(true);
        const f = dialog.form;
        const vacataire = f.statut === 'vacataire';
        const donnees = {
            specialite: f.specialite.trim(),
            departement: f.departement.trim(),
            grade: f.grade.trim() || null,
            bureau: f.bureau.trim() || null,
            statut: f.statut,
            service_annuel_heures: vacataire ? null : nombreOuNull(f.service_annuel_heures),
            max_heures_semaine: nombreOuNull(f.max_heures_semaine),
            id_campus_prefere: nombreOuNull(f.id_campus_prefere),
            entreprise: f.entreprise.trim() || null,
        };
        try {
            if (dialog.editing) {
                await enseignantAPI.update(dialog.editing.id_user, donnees);
                toast.success(t('ref.staff.saved'));
            } else {
                await enseignantAPI.create({ ...donnees, id_user: Number(f.id_user) });
                toast.success(t('ref.staff.created'));
            }
            setDialog((d) => ({ ...d, open: false }));
            charger();
        } catch (error) {
            erreur(error);
        } finally {
            setEnregistrement(false);
        }
    };

    const ouvrirCompetences = async (enseignant) => {
        try {
            const actuels = await enseignantAPI.getCompetences(enseignant.id_user);
            const ids = new Set(actuels.map((c) => c.id_cours));
            setCompetences({ enseignant, choix: modules.filter((m) => ids.has(m.id_cours)) });
        } catch (error) {
            erreur(error);
        }
    };

    const enregistrerCompetences = async () => {
        try {
            await enseignantAPI.setCompetences(competences.enseignant.id_user, competences.choix.map((m) => m.id_cours));
            toast.success(t('ref.staff.skillsSaved'));
            setCompetences(null);
        } catch (error) {
            erreur(error);
        }
    };

    const supprimer = async () => {
        const enseignant = aSupprimer;
        setASupprimer(null);
        try {
            await enseignantAPI.delete(enseignant.id_user);
            toast.success(t('ref.staff.deleted'));
            charger();
        } catch (error) {
            erreur(error);
        }
    };

    const exporter = async () => {
        try {
            await exportToExcelLazy(affiches, COLS_ENSEIGNANTS, 'Enseignants', 'Enseignants');
        } catch (error) {
            erreur(error);
        }
    };

    // L'import serveur traite tout le fichier ; ses erreurs (par email) sont ramenées aux lignes
    const importer = async (lignes) => {
        const reponse = await enseignantAPI.importEnseignants(
            lignes.map((l) => Object.fromEntries(Object.entries(l).map(([k, v]) => [k, typeof v === 'string' ? v.trim() : v])))
        );
        const ligneDe = (email) => lignes.findIndex((l) => String(l.email || '').trim().toLowerCase() === String(email || '').toLowerCase()) + 2;
        charger();
        return {
            reussies: reponse.successCount ?? reponse.success?.length ?? 0,
            erreurs: (reponse.errors || []).map((e) => ({ ligne: ligneDe(e.email), libelle: e.email, message: e.error })),
        };
    };

    return { enregistrement, t, enseignants, charges, comptesSansFiche, campus, modules, loading, erreurChargement, search, setSearch, statut, setStatut, dialog, setDialog, competences, setCompetences, aSupprimer, setASupprimer, importOuvert, setImportOuvert, nombre, charger, affiches, ouvrir, champ, enregistrer, ouvrirCompetences, enregistrerCompetences, supprimer, exporter, importer };
}
