package ma.hestim.solver.contraintes;

import static ai.timefold.solver.core.api.score.stream.ConstraintCollectors.countDistinct;
import static ai.timefold.solver.core.api.score.stream.ConstraintCollectors.max;
import static ai.timefold.solver.core.api.score.stream.ConstraintCollectors.min;
import static ai.timefold.solver.core.api.score.stream.ConstraintCollectors.sum;
import static ai.timefold.solver.core.api.score.stream.ConstraintCollectors.toList;
import static ai.timefold.solver.core.api.score.stream.Joiners.equal;
import static ai.timefold.solver.core.api.score.stream.Joiners.filtering;

import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;

import ai.timefold.solver.core.api.score.buildin.hardmediumsoft.HardMediumSoftScore;
import ai.timefold.solver.core.api.score.stream.Constraint;
import ai.timefold.solver.core.api.score.stream.ConstraintFactory;
import ma.hestim.solver.contraintes.ContraintesEmploiDuTemps.Journee;
import ma.hestim.solver.domain.Lecon;
import ma.hestim.solver.domain.Voeu;

/**
 * Les 9 préférences (souples) du profil : un campus par jour, jours différents, CM avant TD,
 * journées sans trous, vœux des enseignants, pas de salle en distanciel, salle à la taille du
 * groupe, même salle pour deux cours qui se suivent.
 *
 * Leur poids par défaut est celui d'avant MOT-13b. Planner envoie le poids que l'école a réglé
 * ({@code poidsDesRegles}), appliqué par ConstraintWeightOverrides : 0 coupe la règle. Les noms
 * sont stables, puisque Planner et l'analyse les lisent.
 */
public final class PreferencesEmploiDuTemps {

    public static final String UN_SEUL_CAMPUS = "Un seul campus par jour pour un groupe";
    public static final String JOURS_DIFFERENTS = "Séances d'un enseignement sur des jours différents";
    public static final String CM_AVANT_TD = "CM avant TD et TP du même module";
    public static final String TROUS = "Journées sans trous";
    public static final String VOEU_EVITER = "Vœu : créneau à éviter";
    public static final String VOEU_PREFERE = "Vœu : créneau préféré";
    public static final String DISTANCIEL = "Pas de salle en distanciel";
    public static final String TAILLE_SALLE = "Salle à la taille du groupe";
    public static final String CHANGEMENT_SALLE = "Même salle pour deux cours qui se suivent";

    /** Nom de chaque règle souple → son poids par défaut. Seules ces règles acceptent un poids venu de Planner. */
    public static final Map<String, Integer> POIDS_PAR_DEFAUT;

    static {
        Map<String, Integer> poids = new LinkedHashMap<>();
        poids.put(UN_SEUL_CAMPUS, 10);
        poids.put(JOURS_DIFFERENTS, 20);
        poids.put(CM_AVANT_TD, 5);
        poids.put(TROUS, 5);
        poids.put(VOEU_EVITER, 3);
        poids.put(VOEU_PREFERE, 1);
        poids.put(DISTANCIEL, 5);
        poids.put(TAILLE_SALLE, 1);
        poids.put(CHANGEMENT_SALLE, 2);
        POIDS_PAR_DEFAUT = Collections.unmodifiableMap(poids);
    }

    private PreferencesEmploiDuTemps() {
    }

    /** Les 9 règles, dans l'ordre d'avant MOT-13b. */
    static Constraint[] regles(ConstraintFactory factory) {
        return new Constraint[] {
                unSeulCampusParJour(factory),
                memeEnseignementMemeJour(factory),
                cmAvantTd(factory),
                trousDansLaJournee(factory),
                voeuEviter(factory),
                voeuPrefere(factory),
                salleInutileEnDistanciel(factory),
                salleSurdimensionnee(factory),
                changementDeSalle(factory),
        };
    }

    private static HardMediumSoftScore poids(String regle) {
        return HardMediumSoftScore.ofSoft(POIDS_PAR_DEFAUT.get(regle));
    }

    static Constraint unSeulCampusParJour(ConstraintFactory factory) {
        // forEach : seules les leçons avec salle ont un campus
        return factory.forEach(Lecon.class)
                .expand(Lecon::getFeuillesEffectives)
                .flattenLast(feuilles -> feuilles)
                .groupBy((l, g) -> new Journee(g, l.getJour()), countDistinct((l, g) -> l.getCampusId()))
                .filter((journee, campus) -> campus > 1)
                .penalize(poids(UN_SEUL_CAMPUS), (journee, campus) -> campus - 1)
                .asConstraint(UN_SEUL_CAMPUS);
    }

    static Constraint memeEnseignementMemeJour(ConstraintFactory factory) {
        return ContraintesEmploiDuTemps.posees(factory)
                .join(ContraintesEmploiDuTemps.posees(factory), equal(Lecon::getEnseignementId), equal(Lecon::getJour))
                .filter(ContraintesEmploiDuTemps::avant)
                .penalize(poids(JOURS_DIFFERENTS))
                .asConstraint(JOURS_DIFFERENTS);
    }

    static Constraint cmAvantTd(ConstraintFactory factory) {
        return ContraintesEmploiDuTemps.posees(factory)
                .filter(l -> "CM".equals(l.getType()))
                .join(ContraintesEmploiDuTemps.posees(factory),
                        equal(Lecon::getCoursId),
                        filtering((cm, td) -> !"CM".equals(td.getType()) && cm.partageGroupe(td)
                                && td.getInstantSemaine() < cm.getInstantSemaine()))
                .penalize(poids(CM_AVANT_TD))
                .asConstraint(CM_AVANT_TD);
    }

    static Constraint trousDansLaJournee(ConstraintFactory factory) {
        // Trou = rang de la grille laissé vide entre le premier et le dernier cours des étudiants ;
        // la pause de midi n'en est pas un (les rangs 2 et 3 se suivent)
        return ContraintesEmploiDuTemps.posees(factory)
                .expand(Lecon::getFeuillesEffectives)
                .flattenLast(feuilles -> feuilles)
                .groupBy((l, g) -> new Journee(g, l.getJour()),
                        min((Lecon l, Long g) -> l.getRangDebut()),
                        max((Lecon l, Long g) -> l.getRangFin()),
                        sum((Lecon l, Long g) -> l.getRangFin() - l.getRangDebut() + 1))
                .filter((journee, premier, dernier, occupes) -> dernier - premier + 1 > occupes)
                .penalize(poids(TROUS), (journee, premier, dernier, occupes) -> dernier - premier + 1 - occupes)
                .asConstraint(TROUS);
    }

    static Constraint voeuEviter(ConstraintFactory factory) {
        return ContraintesEmploiDuTemps.voeuxTouches(factory, Voeu.Type.EVITER)
                .penalize(poids(VOEU_EVITER))
                .asConstraint(VOEU_EVITER);
    }

    static Constraint voeuPrefere(ConstraintFactory factory) {
        return ContraintesEmploiDuTemps.voeuxTouches(factory, Voeu.Type.PREFERE)
                .reward(poids(VOEU_PREFERE))
                .asConstraint(VOEU_PREFERE);
    }

    static Constraint salleInutileEnDistanciel(ConstraintFactory factory) {
        return factory.forEach(Lecon.class)
                .filter(l -> l.isDistanciel() && l.getSalle() != null)
                .penalize(poids(DISTANCIEL))
                .asConstraint(DISTANCIEL);
    }

    // Bon usage des salles : les calculs sont dans UsageDesSalles

    static Constraint salleSurdimensionnee(ConstraintFactory factory) {
        return factory.forEach(Lecon.class)
                .filter(l -> l.getSalle() != null && UsageDesSalles.placesPerdues(l) > 0)
                .penalize(poids(TAILLE_SALLE), UsageDesSalles::placesPerdues)
                .asConstraint(TAILLE_SALLE);
    }

    static Constraint changementDeSalle(ConstraintFactory factory) {
        // Journée des étudiants de chaque groupe le plus fin, comme pour les trous
        return factory.forEach(Lecon.class)
                .expand(Lecon::getFeuillesEffectives)
                .flattenLast(feuilles -> feuilles)
                .groupBy((l, g) -> new Journee(g, l.getJour()), toList((l, g) -> l))
                .filter((journee, lecons) -> lecons.size() > 1 && UsageDesSalles.changementsDeSalle(lecons) > 0)
                .penalize(poids(CHANGEMENT_SALLE), (journee, lecons) -> UsageDesSalles.changementsDeSalle(lecons))
                .asConstraint(CHANGEMENT_SALLE);
    }
}
