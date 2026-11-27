/** Chargement et actions de la page Comptes ; sélection et protections existantes conservées. */
import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { userAPI } from '../../services/api';
import { useSortableTable } from '../../hooks/useSortableTable';
import useActionsComptes from './useActionsComptes';
export default function useComptes() {
    const { t } = useTranslation();
    const { user: moi } = useAuth();
    const [utilisateurs, setUtilisateurs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erreurChargement, setErreurChargement] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [total, setTotal] = useState(0);
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [confirmDialog, setConfirmDialog] = useState({ open: false, id: null });
    const [invitation, setInvitation] = useState(null);
    const [mfaAReinitialiser, setMfaAReinitialiser] = useState(null);
    const { sorted: sortedUsers, requestSort, getSortDir } = useSortableTable(utilisateurs);

    const loadUtilisateurs = useCallback(async () => {
        setLoading(true);
        setErreurChargement('');
        try {
            const data = await userAPI.getAll({ page: page + 1, limit: rowsPerPage });
            setUtilisateurs(data.data || []);
            setTotal(data.pagination?.total || 0);
        } catch (err) {
            console.error('Erreur:', err);
            setErreurChargement(t('utilisateurs.erreurChargement'));
        } finally {
            setLoading(false);
        }
    }, [page, rowsPerPage, t]);

    useEffect(() => {
        loadUtilisateurs();
    }, [loadUtilisateurs]);

    const actions = useActionsComptes({ comptes: utilisateurs, recharger: loadUtilisateurs, onSucces: setSuccess, onErreur: setError });
    const visibles = sortedUsers.filter((u) => {
        const q = search.toLowerCase();
        return u.nom?.toLowerCase().includes(q) || u.prenom?.toLowerCase().includes(q) || u.identifiant?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q);
    });
    // Un compte déjà désactivé, ou le sien, n'entre pas dans une sélection
    const cochables = visibles.filter((u) => u.actif && u.id_user !== moi?.id_user).map((u) => u.id_user);

    const ouvrirFormulaire = (user = null) => {
        setEditing(user);
        setError('');
        setSuccess('');
        setOpen(true);
    };

    const compteEnregistre = (reponse, valeurs) => {
        if (editing) {
            setSuccess(t('utilisateurs.modifie'));
        } else {
            if (reponse.invitation) setInvitation({ email: valeurs.identifiant || valeurs.email, ...reponse.invitation });
            setSuccess(t(reponse.invitation ? 'utilisateurs.creeInvitation' : 'utilisateurs.creeProvisoire'));
        }
        setOpen(false);
        setEditing(null);
        loadUtilisateurs();
    };

    // Double authentification : téléphone perdu → retirée, sessions fermées, à reconfigurer
    const reinitialiserMfa = async () => {
        const cible = mfaAReinitialiser;
        setMfaAReinitialiser(null);
        try {
            await userAPI.reinitialiserMfa(cible.id_user);
            setSuccess(t('utilisateurs.mfaReinitialisee', { nom: `${cible.prenom} ${cible.nom}` }));
            loadUtilisateurs();
        } catch (err) {
            setError(err.response?.data?.error || err.message || t('utilisateurs.mfaErreur'));
        }
    };

    const handleDeleteConfirm = async () => {
        const { id } = confirmDialog;
        setConfirmDialog({ open: false, id: null });
        try {
            await userAPI.delete(id);
            setSuccess(t('utilisateurs.supprime'));
            loadUtilisateurs();
        } catch (err) {
            console.error('Erreur:', err);
            // Un compte qui a un historique ne se supprime pas : le serveur dit de le désactiver
            setError(err.response?.data?.code === 'A_UN_HISTORIQUE' ? t('comptes.supprimerImpossible') : t('utilisateurs.erreurSuppression'));
        }
    };


    return { t, moi, utilisateurs, loading, erreurChargement, page, setPage, rowsPerPage, setRowsPerPage, total, open, setOpen, editing, search, setSearch, error, setError, success, setSuccess, confirmDialog, setConfirmDialog, invitation, setInvitation, mfaAReinitialiser, setMfaAReinitialiser, requestSort, getSortDir, loadUtilisateurs, actions, visibles, cochables, ouvrirFormulaire, compteEnregistre, reinitialiserMfa, handleDeleteConfirm };
}
