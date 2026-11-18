/** Charge l’arbre et conserve les actions groupes existantes, avec garde des réponses périmées. */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { filiereAPI, groupeAPI } from '../../services/api';
import { useToast } from '../../contexts/ToastContext';
import { useAuth } from '../../contexts/AuthContext';
import useAnneeChoisie from '../../hooks/useAnneeChoisie';
import { TOUTES, anneeEnCours } from '../../utils/annees';
import { filieresGerables } from '../../utils/droits';
import { fetchAll } from '../../utils/fetchAll';
import { ENFANT_DE, GROUPE_VIDE, aplatir, anneeScolaireCourante } from './fiche';
import { creerControleLecture } from '../gestion/controleLecture';
export default function useGroupes() {
    const { t } = useTranslation();
    const toast = useToast();
    const { user } = useAuth();
    const { annees, valeur: valeurAnnee, annee, filtre, choisir: appliquerAnnee } = useAnneeChoisie();
    const [filieres, setFilieres] = useState([]);
    const [filiere, setFiliere] = useState('');
    const [arbre, setArbre] = useState([]);
    const [sansAnnee, setSansAnnee] = useState(0);
    const [filtreVide, setFiltreVide] = useState(false);
    const [loading, setLoading] = useState(true);
    const [initialisation, setInitialisation] = useState(true);
    const [erreurChargement, setErreurChargement] = useState('');
    const controle = useMemo(creerControleLecture, []);
    const options = useMemo(creerControleLecture, []);
    const [lecture, setLecture] = useState(0);
    const relire = () => setLecture((n) => n + 1);
    const [dialog, setDialog] = useState({ open: false, editing: null, form: GROUPE_VIDE });
    const [aSupprimer, setASupprimer] = useState(null);
    const [importOuvert, setImportOuvert] = useState(false);

    const anneeScolaire = annee?.libelle ?? anneeEnCours(annees)?.libelle ?? anneeScolaireCourante();

    const chargerFilieres = useCallback(async () => {
        const active = options.commencer();
        setInitialisation(true);
        setErreurChargement('');
        try {
            const liste = filieresGerables(await fetchAll(filiereAPI.getAll), user);
            if (!active()) return;
            setFilieres(liste);
            setFiliere((id) => liste.some((f) => f.id_filiere === id) ? id : liste[0]?.id_filiere ?? '');
        } catch {
            if (active()) setErreurChargement(t('common.errorLoad'));
        } finally {
            if (active()) setInitialisation(false);
        }
    }, [user, t, options]);
    useEffect(() => { chargerFilieres(); return () => options.invalider(); }, [chargerFilieres, options]);

    const chargerArbre = useCallback(async () => {
        const active = controle.commencer();
        if (!filiere || valeurAnnee === null) {
            setLoading(Boolean(filiere));
            return;
        }
        setLoading(true);
        setErreurChargement('');
        try {
            const [groupes, tous] = await Promise.all([
                groupeAPI.getArbre({ id_filiere: filiere, ...filtre }),
                valeurAnnee === TOUTES ? null : fetchAll(groupeAPI.getAll, { id_filiere: filiere }),
            ]);
            if (!active()) return;
            setArbre(groupes);
            setFiltreVide(Boolean(tous?.length) && !groupes.length);
            setSansAnnee(tous ? tous.filter((g) => g.id_annee == null).length : 0);
        } catch {
            if (active()) setErreurChargement(t('common.errorLoad'));
        } finally {
            if (active()) setLoading(false);
        }
    }, [filiere, valeurAnnee, filtre, t, controle]);

    useEffect(() => {
        chargerArbre();
        return () => controle.invalider();
    }, [chargerArbre, controle, lecture]);

    const changerFiltre = (appliquer, actuel) => (suivant) => {
        if (suivant === actuel) return;
        controle.invalider();
        setArbre([]);
        setSansAnnee(0);
        setLoading(true);
        appliquer(suivant);
    };

    const lignes = useMemo(() => aplatir(arbre), [arbre]);
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

    // Effectif d'un groupe face à la somme de ses sous-groupes : signale l'écart, sans bloquer
    const ecartEffectif = (groupe) => {
        if (!groupe.sous_groupes?.length) return null;
        const somme = groupe.sous_groupes.reduce((total, g) => total + (Number(g.effectif) || 0), 0);
        return somme === Number(groupe.effectif) ? null : somme;
    };

    const filiereCourante = filieres.find((f) => f.id_filiere === filiere);

 return { chargerFilieres, t, user, annees, valeurAnnee, choisirAnnee: changerFiltre(appliquerAnnee, valeurAnnee), anneeScolaire, filtre, filieres, filiere, setFiliere: changerFiltre(setFiliere, filiere), lignes, filiereCourante, loading, initialisation, erreurChargement, chargerArbre, sansAnnee, filtreVide, dialog, setDialog, aSupprimer, setASupprimer, importOuvert, setImportOuvert, ouvrir, enregistrer, supprimer, importer, ecartEffectif };
}
