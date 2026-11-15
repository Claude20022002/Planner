package ma.hestim.solver.rest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

import ai.timefold.solver.core.api.domain.solution.ConstraintWeightOverrides;
import ai.timefold.solver.core.api.score.buildin.hardmediumsoft.HardMediumSoftScore;
import ma.hestim.solver.contraintes.PreferencesEmploiDuTemps;
import ma.hestim.solver.domain.ContrainteDeclaree;
import ma.hestim.solver.domain.ContrainteDeclaree.Famille;
import ma.hestim.solver.domain.ContrainteDeclaree.Niveau;
import ma.hestim.solver.domain.Creneau;
import ma.hestim.solver.domain.EmploiDuTemps;
import ma.hestim.solver.domain.Lecon;
import ma.hestim.solver.domain.Salle;

/**
 * Un problème reçu de Planner, avant le calcul : contrôle de sa taille et de ses champs (le
 * solveur ne croit pas le serveur sans borne), puis liaison des leçons à leurs créneaux et à
 * leurs salles, visées des contraintes déclarées, et poids des règles du profil changés en
 * ConstraintWeightOverrides.
 */
public final class ProblemeRecu {

    // Bornes d'un problème : HESTIM entier tient très en dessous (≈ 250 leçons par semestre)
    static final int LECONS_MAX = 5000;
    static final int CRENEAUX_MAX = 500;
    static final int SALLES_MAX = 2000;
    static final int VOEUX_MAX = 200_000;
    static final int POIDS_MAX = 1000;
    static final int CONTRAINTES_MAX = 2000;

    private ProblemeRecu() {
    }

    /** Le refus à renvoyer (400), ou null si le problème est recevable. */
    public static String verifier(EmploiDuTemps p) {
        if (p.getLecons() == null || p.getCreneaux() == null || p.getSalles() == null) {
            return "Problème incomplet : leçons, créneaux et salles sont requis";
        }
        if (p.getLecons().size() > LECONS_MAX || p.getCreneaux().size() > CRENEAUX_MAX || p.getSalles().size() > SALLES_MAX
                || (p.getVoeux() != null && p.getVoeux().size() > VOEUX_MAX)) {
            return "Problème trop grand";
        }
        if (p.getLecons().stream().anyMatch(l -> l.getId() == null || l.getLongueur() < 1 || l.getLongueur() > 2)) {
            return "Leçon invalide (identifiant manquant ou longueur hors de 1-2)";
        }
        String refus = verifierPoids(p.getPoidsDesRegles());
        return refus != null ? refus : verifierContraintes(p);
    }

    /**
     * Contraintes déclarées : 2 000 au plus, champs de leur famille présents, poids d'un souhait
     * entre 0 et 1 000, et aucune séance inconnue (comptées dans le refus).
     */
    static String verifierContraintes(EmploiDuTemps p) {
        List<ContrainteDeclaree> contraintes = p.getContraintesDeclarees();
        if (contraintes.size() > CONTRAINTES_MAX) {
            return "Trop de contraintes déclarées (" + CONTRAINTES_MAX + " au plus)";
        }
        Set<String> connues = p.getLecons().stream().map(Lecon::getId).collect(Collectors.toSet());
        long inconnues = 0;
        for (ContrainteDeclaree c : contraintes) {
            String champ = champManquant(c);
            if (champ != null) {
                return "Contrainte déclarée " + c.getId() + " invalide : " + champ;
            }
            inconnues += c.getLecons().stream().filter(l -> !connues.contains(l)).count();
            inconnues += c.getPaquets().stream().flatMap(q -> java.util.stream.Stream.concat(q.a().stream(), q.b().stream()))
                    .filter(l -> !connues.contains(l)).count();
        }
        return inconnues > 0 ? "Contraintes déclarées : " + inconnues + " séance(s) visée(s) inconnue(s)" : null;
    }

    private static String champManquant(ContrainteDeclaree c) {
        if (c.getId() == null || c.getFamille() == null || c.getNiveau() == null) {
            return "identifiant, famille et niveau sont requis";
        }
        if (c.getNiveau() == Niveau.SOUPLE && (c.getPoids() < 0 || c.getPoids() > POIDS_MAX)) {
            return "poids hors de 0-" + POIDS_MAX;
        }
        if (c.getFamille() == Famille.PLAFOND && (c.getQuoi() == null || c.getSeuil() < 0)) {
            return "quoi et seuil sont requis";
        }
        if (c.getFamille() == Famille.REPARTITION && c.getEcart() < 1) {
            return "écart d'au moins un jour";
        }
        if (c.getFamille() == Famille.ENSEMBLE && c.getRelation() == null) {
            return "relation requise";
        }
        return null;
    }

    /** Un nom de règle inconnu est refusé, pour ne jamais perdre un poids sans bruit. */
    static String verifierPoids(Map<String, Integer> poids) {
        for (Map.Entry<String, Integer> regle : poids.entrySet()) {
            if (!PreferencesEmploiDuTemps.POIDS_PAR_DEFAUT.containsKey(regle.getKey())) {
                return "Poids d'une règle inconnue : « " + regle.getKey() + " »";
            }
            Integer valeur = regle.getValue();
            if (valeur == null || valeur < 0 || valeur > POIDS_MAX) {
                return "Poids hors de 0-" + POIDS_MAX + " pour la règle « " + regle.getKey() + " »";
            }
        }
        return null;
    }

    /**
     * Les leçons arrivent en JSON avec des copies de créneaux et de salles (leçons épinglées) :
     * on les remplace par les instances des listes, que le solveur reconnaît. Puis les valeurs
     * possibles de chaque leçon, et les poids des règles.
     */
    public static void relier(EmploiDuTemps probleme) {
        Map<Long, Creneau> creneaux = probleme.getCreneaux().stream().collect(Collectors.toMap(Creneau::getId, Function.identity()));
        Map<Long, Salle> salles = probleme.getSalles().stream().collect(Collectors.toMap(Salle::getId, Function.identity()));
        for (Lecon lecon : probleme.getLecons()) {
            if (lecon.getCreneau() != null) {
                lecon.setCreneau(creneaux.get(lecon.getCreneau().getId()));
            }
            if (lecon.getSalle() != null) {
                lecon.setSalle(salles.get(lecon.getSalle().getId()));
            }
            // Une leçon épinglée sans créneau connu ne peut pas l'être
            if (lecon.isEpinglee() && lecon.getCreneau() == null) {
                lecon.setEpinglee(false);
            }
        }
        probleme.preparerValeursPossibles();
        probleme.construireVisees();
        appliquerPoids(probleme);
    }

    /** Poids reçus → ConstraintWeightOverrides ; une règle absente garde son poids par défaut, 0 la coupe. */
    static void appliquerPoids(EmploiDuTemps probleme) {
        Map<String, HardMediumSoftScore> poids = new HashMap<>();
        probleme.getPoidsDesRegles().forEach((regle, valeur) -> poids.put(regle, HardMediumSoftScore.ofSoft(valeur)));
        probleme.setPoidsAppliques(poids.isEmpty() ? ConstraintWeightOverrides.none() : ConstraintWeightOverrides.of(poids));
    }
}
