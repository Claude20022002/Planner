/** Préparation d’enseignements existante, lecture des options et réponses de filtres protégées. */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { calendrierAPI, enseignementAPI, filiereAPI } from '../../services/api';
import { useToast } from '../../contexts/ToastContext';
import { useAuth } from '../../contexts/AuthContext';
import { filieresGerables } from '../../utils/droits';
import { fetchAll } from '../../utils/fetchAll';
import { aujourdhui } from '../../../../shared/dates.js';
import { localeEcran } from '../../utils/dates';
import { creerControleLecture } from '../gestion/controleLecture';
export default function useEnseignements() {
    const { t, i18n } = useTranslation();
    const toast = useToast();
    const { user } = useAuth();
    const [periodes, setPeriodes] = useState([]);
    const [idPeriode, setIdPeriode] = useState('');
    const [filieres, setFilieres] = useState([]);
    const [filiere, setFiliere] = useState('toutes');
    const [enseignements, setEnseignements] = useState([]);
    const [selection, setSelection] = useState(() => new Set());
    const [loading, setLoading] = useState(true);
    const [initialisation, setInitialisation] = useState(true);
    const [erreurInitiale, setErreurInitiale] = useState(false);
    const [erreurChargement, setErreurChargement] = useState('');
    const controle = useMemo(creerControleLecture, []);
    const options = useMemo(creerControleLecture, []);
    const [lecture, setLecture] = useState(0);
    const relire = () => setLecture((n) => n + 1);
    const [rapport, setRapport] = useState(null);
    const [edition, setEdition] = useState(null);
    const [aSupprimer, setASupprimer] = useState(null);
    const [idEquipe, setIdEquipe] = useState(null);

    const nombre = useMemo(() => new Intl.NumberFormat(localeEcran(i18n.language), { maximumFractionDigits: 1 }), [i18n.language]);

    const chargerOptions = useCallback(async () => {
        const active = options.commencer();
        setInitialisation(true);
        setErreurInitiale(false);
            try {
                const [annees, toutes] = await Promise.all([calendrierAPI.getAnnees(), fetchAll(filiereAPI.getAll)]);
                if (!active()) return;
                const listeFilieres = filieresGerables(toutes, user);
                // Un responsable génère filière par filière : la sienne est choisie d'office
                if (user?.role !== 'admin' && listeFilieres.length) setFiliere(listeFilieres[0].id_filiere);
                const liste = annees.flatMap((a) => a.periodes.map((p) => ({ ...p, libelle_annee: a.libelle, active: a.active })));
                setPeriodes(liste);
                setFilieres(listeFilieres);
                const parDefaut = liste.find((p) => p.active && p.date_debut <= aujourdhui() && p.date_fin >= aujourdhui()) || liste.find((p) => p.active) || liste[0];
                setIdPeriode(parDefaut?.id_periode ?? '');
                if (!parDefaut) setLoading(false);
            } catch {
                if (active()) { setErreurInitiale(true); setLoading(false); }
            } finally { if (active()) setInitialisation(false); }
    }, [user, options]);

    useEffect(() => { chargerOptions(); return () => options.invalider(); }, [chargerOptions, options]);

    const charger = useCallback(async () => {
        const active = controle.commencer();
        if (!idPeriode) return;
        setLoading(true);
        setSelection(new Set());
        setErreurChargement('');
        try {
            const params = { id_periode: idPeriode };
            if (filiere !== 'toutes') params.id_filiere = filiere;
            const liste = await enseignementAPI.getAll(params);
            if (!active()) return;
            setEnseignements(liste);
            setSelection(new Set());
        } catch {
            if (active()) setErreurChargement(t('common.errorLoad'));
        } finally {
            if (active()) setLoading(false);
        }
    }, [idPeriode, filiere, t, controle]);

    useEffect(() => {
        charger();
        return () => controle.invalider();
    }, [charger, controle, lecture]);

    const changerFiltre = (appliquer, actuel) => (suivant) => {
        if (suivant === actuel) return;
        controle.invalider();
        setEnseignements([]);
        setSelection(new Set());
        setLoading(true);
        appliquer(suivant);
    };

    const erreur = (error) => toast.error(error.response?.data?.error || error.response?.data?.errors?.[0]?.message || error.message);

    const generer = async () => {
        try {
            const resultat = await enseignementAPI.generer({ id_periode: idPeriode, ...(filiere !== 'toutes' && { id_filiere: filiere }) });
            setRapport(resultat);
            relire();
        } catch (error) {
            erreur(error);
        }
    };

    const basculer = (id) =>
        setSelection((s) => {
            const suivant = new Set(s);
            if (suivant.has(id)) suivant.delete(id);
            else suivant.add(id);
            return suivant;
        });

    const mutualiser = async () => {
        try {
            await enseignementAPI.fusionner([...selection]);
            toast.success(t('ref.teaching.merged'));
            relire();
        } catch (error) {
            erreur(error);
        }
    };

    const scinder = async (enseignement) => {
        try {
            await enseignementAPI.scinder(enseignement.id_enseignement);
            toast.success(t('ref.teaching.split'));
            relire();
        } catch (error) {
            erreur(error);
        }
    };

    const enregistrerEdition = async (event) => {
        event.preventDefault();
        try {
            await enseignementAPI.update(edition.id_enseignement, { heures_prevues: Number(edition.heures_prevues), libelle: edition.libelle || null });
            toast.success(t('ref.teaching.saved'));
            setEdition(null);
            relire();
        } catch (error) {
            erreur(error);
        }
    };

    const supprimer = async () => {
        const enseignement = aSupprimer;
        setASupprimer(null);
        try {
            await enseignementAPI.delete(enseignement.id_enseignement);
            toast.success(t('ref.teaching.deleted'));
            relire();
        } catch (error) {
            erreur(error);
        }
    };

    const tries = useMemo(
        () =>
            [...enseignements].sort(
                (a, b) =>
                    (a.composante.cours.filiere?.code_filiere || '').localeCompare(b.composante.cours.filiere?.code_filiere || '') ||
                    a.composante.cours.nom_cours.localeCompare(b.composante.cours.nom_cours, 'fr') ||
                    a.composante.type.localeCompare(b.composante.type)
            ),
        [enseignements]
    );

 return { t, user, periodes, idPeriode, setIdPeriode: changerFiltre(setIdPeriode, idPeriode), filieres, filiere, setFiliere: changerFiltre(setFiliere, filiere), selection, loading, initialisation, erreurInitiale, erreurChargement, charger: relire, chargerOptions, rapport, setRapport, edition, setEdition, aSupprimer, setASupprimer, idEquipe, setIdEquipe, nombre, generer, basculer, mutualiser, scinder, enregistrerEdition, supprimer, tries };
}
