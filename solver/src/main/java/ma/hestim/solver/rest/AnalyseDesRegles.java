package ma.hestim.solver.rest;

import java.util.ArrayList;
import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Stream;

import ai.timefold.solver.core.api.score.analysis.ConstraintAnalysis;
import ai.timefold.solver.core.api.score.analysis.ScoreAnalysis;
import ai.timefold.solver.core.api.score.buildin.hardmediumsoft.HardMediumSoftScore;
import ai.timefold.solver.core.api.score.stream.DefaultConstraintJustification;
import ai.timefold.solver.core.api.solver.SolutionManager;
import ma.hestim.solver.domain.EmploiDuTemps;
import ma.hestim.solver.domain.Lecon;

/**
 * Analyse d'une solution terminée : les règles enfreintes (dures, intermédiaires et souples),
 * et les leçons en cause dans une règle dure. Le bilan des contraintes déclarées n'en dépend
 * pas : il est calculé par Planner (MOT-13b).
 */
final class AnalyseDesRegles {

    private AnalyseDesRegles() {
    }

    /** Ajoute {@code violations} et {@code leconsEnConflit} à la réponse. */
    static void analyser(SolutionManager<EmploiDuTemps, HardMediumSoftScore> solutionManager, EmploiDuTemps solution,
            Map<String, Object> reponse) {
        ScoreAnalysis<HardMediumSoftScore> analyse = solutionManager.analyze(solution);
        List<Map<String, Object>> violations = new ArrayList<>();
        Set<String> leconsEnConflit = new LinkedHashSet<>();
        for (ConstraintAnalysis<HardMediumSoftScore> contrainte : analyse.constraintMap().values()) {
            HardMediumSoftScore s = contrainte.score();
            if (s.hardScore() == 0 && s.mediumScore() == 0 && s.softScore() >= 0) {
                continue;
            }
            int nombre = contrainte.matches() == null ? 0 : contrainte.matches().size();
            Map<String, Object> violation = new LinkedHashMap<>();
            violation.put("contrainte", contrainte.constraintRef().constraintName());
            violation.put("dur", s.hardScore());
            violation.put("moyen", s.mediumScore());
            violation.put("souple", s.softScore());
            violation.put("nombre", nombre);
            violations.add(violation);
            if (s.hardScore() < 0 && contrainte.matches() != null) {
                contrainte.matches().forEach(m -> {
                    if (m.justification() instanceof DefaultConstraintJustification justification) {
                        // Faits de la correspondance : des leçons, ou une liste de leçons (conflits regroupés)
                        justification.getFacts().stream()
                                .flatMap(f -> f instanceof Collection<?> liste ? liste.stream() : Stream.of(f))
                                .filter(Lecon.class::isInstance).map(f -> ((Lecon) f).getId()).forEach(leconsEnConflit::add);
                    }
                });
            }
        }
        violations.sort((a, b) -> Integer.compare((int) a.get("dur"), (int) b.get("dur")));
        reponse.put("violations", violations);
        reponse.put("leconsEnConflit", leconsEnConflit);
    }
}
