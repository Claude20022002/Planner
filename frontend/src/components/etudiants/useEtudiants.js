/** Chargement, formulaire et import étudiants existants, indépendants de la présentation. */
import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { etudiantAPI, userAPI, groupeAPI } from '../../services/api';
import useAnneeChoisie from '../../hooks/useAnneeChoisie';
import { groupesParNom, nomEtAnnee } from '../../utils/annees';
import { exportToExcelLazy } from '../../utils/lazyExports';
import { COLS_ETUDIANTS } from '../../utils/exportColumns';
import { useConfirmation } from '../../contexts/ConfirmationContext';
import { validationSchema } from './fiche';
export default function useEtudiants() {
    const { t } = useTranslation();
    const confirmer = useConfirmation();
    const [etudiants, setEtudiants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erreurChargement, setErreurChargement] = useState('');
    const [users, setUsers] = useState([]);
    const [groupes, setGroupes] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [total, setTotal] = useState(0);
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [importOuvert, setImportOuvert] = useState(false);
    const { annees, valeur: valeurAnnee, annee, filtre, choisir: choisirAnnee } = useAnneeChoisie();



    // Groupes de l'année choisie (lot ME-18) : le formulaire et l'import ne confondent plus
    // « 4A IIIA » de deux années différentes
    useEffect(() => {
        if (valeurAnnee === null) return;
        groupeAPI.getTous(filtre).then(setGroupes).catch((error) => console.error('Erreur:', error));
    }, [valeurAnnee, filtre]);

    const loadUsers = useCallback(async () => {
        try {
            const data = await userAPI.getTous();
            const etudiantsUsers = data.filter((u) => u.role === 'etudiant');
            setUsers(etudiantsUsers);
        } catch (error) {
            console.error('Erreur:', error);
        }
    }, []);

    const loadEtudiants = useCallback(async () => {
        setLoading(true);
        setErreurChargement('');
        try {
            const data = await etudiantAPI.getAll({
                page: page + 1,
                limit: rowsPerPage,
            });
            setEtudiants(data.data || []);
            setTotal(data.pagination?.total || 0);
        } catch (error) {
            console.error('Erreur:', error);
            setErreurChargement(t('etudiants.erreurChargement'));
        } finally {
            setLoading(false);
        }
    }, [page, rowsPerPage, t]);

    useEffect(() => { loadEtudiants(); loadUsers(); }, [loadEtudiants, loadUsers]);

    const formik = useFormik({
        initialValues: {
            id_user: '',
            numero_etudiant: '',
            niveau: '',
            id_groupe: '',
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                setError('');
                setSuccess('');
                if (editing) {
                    await etudiantAPI.update(editing.id_user, values);
                    setSuccess(t('etudiants.modifie'));
                } else {
                    await etudiantAPI.create(values);
                    setSuccess(t('etudiants.cree'));
                }
                formik.resetForm();
                setOpen(false);
                setEditing(null);
                loadEtudiants();
                loadUsers();
            } catch (error) {
                console.error('Erreur:', error);
                setError(error.message || t('etudiants.erreurSauvegarde'));
            } finally {
                setSubmitting(false);
            }
        },
    });

    const handleEdit = (etudiant) => {
        setEditing(etudiant);
        formik.setValues({
            id_user: etudiant.id_user,
            numero_etudiant: etudiant.numero_etudiant,
            niveau: etudiant.niveau,
            id_groupe: etudiant.id_groupe,
        });
        setOpen(true);
    };

    const handleDelete = async (id) => {
        if (!(await confirmer(t('etudiants.confirmerSuppression')))) return;
        try {
            await etudiantAPI.delete(id);
            setSuccess(t('etudiants.supprime'));
            loadEtudiants();
        } catch (error) {
            console.error('Erreur:', error);
            setError(t('etudiants.erreurSuppression'));
        }
    };

    // Ligne refusée quand son nom ne désigne pas un seul groupe : inconnu, ou porté par plusieurs
    // groupes (avec « Toutes les années », « 4A IIIA » de deux années : on ne choisit pas au hasard)
    const erreurGroupe = (groupe, trouves) => {
        if (!trouves.length) return annee ? t('etudiants.groupeInconnuAnnee', { groupe, annee: annee.libelle }) : t('etudiants.groupeInconnu', { groupe });
        const annees = [...new Set(trouves.map((g) => g.annee_scolaire))];
        return annees.length > 1 ? t('etudiants.groupePlusieursAnnees', { groupe, annees: annees.join(', ') }) : t('etudiants.groupeHomonyme', { groupe });
    };

    // Groupe désigné par son nom (casse et espaces ignorés) ; l'import serveur traite le reste du
    // fichier et ses erreurs (par email) sont ramenées aux lignes
    const importer = async (lignes) => {
        const parNom = groupesParNom(groupes);
        const erreurs = [];
        const valides = [];
        lignes.forEach((l, index) => {
            const propre = Object.fromEntries(Object.entries(l).map(([k, v]) => [k, typeof v === 'string' ? v.trim() : v]));
            const nomGroupe = String(propre.groupe ?? '').toLowerCase();
            const trouves = parNom.get(nomGroupe) ?? [];
            if (nomGroupe && trouves.length !== 1) {
                erreurs.push({ ligne: index + 2, libelle: propre.email, message: erreurGroupe(propre.groupe, trouves) });
                return;
            }
            valides.push({ ...propre, email: String(propre.email ?? '').toLowerCase(), id_groupe: nomGroupe ? trouves[0].id_groupe : null });
        });
        if (valides.length) {
            const reponse = await etudiantAPI.importEtudiants(valides);
            const ligneDe = (email) => lignes.findIndex((l) => String(l.email || '').trim().toLowerCase() === String(email || '').toLowerCase()) + 2;
            erreurs.push(...(reponse.errors || []).map((e) => ({ ligne: ligneDe(e.email), libelle: e.email, message: e.error || e.message })));
            loadEtudiants();
            loadUsers();
            return { reussies: reponse.successCount ?? reponse.success?.length ?? 0, erreurs };
        }
        return { reussies: 0, erreurs };
    };

    const handleExport = async () => {
        try {
            const data = await etudiantAPI.getTous();
            await exportToExcelLazy(data, COLS_ETUDIANTS, 'Etudiants', t('etudiants.fichierExport'));
        } catch { setError(t('etudiants.erreurExport')); }
    };


    // Fiche d'un étudiant d'une autre année : son groupe reste proposé, pour ne pas l'effacer
    const groupesProposes =
        editing?.groupe && !groupes.some((g) => g.id_groupe === editing.id_groupe)
            ? [...groupes, { ...editing.groupe, id_groupe: editing.id_groupe }]
            : groupes;
    // L'année à côté du nom dès qu'elle n'est pas celle choisie : avec « Toutes les années », deux
    // « 4A IIIA » restent distincts dans le menu
    const libelleGroupe = (g) => (String(g.id_annee) === String(valeurAnnee) ? g.nom_groupe : nomEtAnnee(g));

    const filteredEtudiants = etudiants.filter(
        (etu) =>
            etu.user?.nom?.toLowerCase().includes(search.toLowerCase()) ||
            etu.user?.prenom?.toLowerCase().includes(search.toLowerCase()) ||
            etu.numero_etudiant?.toLowerCase().includes(search.toLowerCase())
    );

    return { t, loading, erreurChargement, loadEtudiants, etudiants, users, page, setPage, rowsPerPage, setRowsPerPage, total, open, setOpen, editing, setEditing, search, setSearch, error, setError, success, setSuccess, importOuvert, setImportOuvert, annees, valeurAnnee, choisirAnnee, formik, handleEdit, handleDelete, importer, handleExport, groupesProposes, libelleGroupe, filteredEtudiants };
}
