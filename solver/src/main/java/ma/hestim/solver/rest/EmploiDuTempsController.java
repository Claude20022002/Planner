package ma.hestim.solver.rest;

import java.time.Duration;
import java.time.Instant;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import ai.timefold.solver.core.api.score.buildin.hardmediumsoft.HardMediumSoftScore;
import ai.timefold.solver.core.api.solver.SolutionManager;
import ai.timefold.solver.core.api.solver.SolverConfigOverride;
import ai.timefold.solver.core.api.solver.SolverManager;
import ai.timefold.solver.core.api.solver.SolverStatus;
import ai.timefold.solver.core.config.solver.termination.TerminationConfig;
import ma.hestim.solver.domain.EmploiDuTemps;

/**
 * API du solveur, appelée uniquement par Planner (réseau interne) :
 * POST /timetables lance un calcul en tâche de fond et renvoie son identifiant,
 * GET /timetables/{id} renvoie l'état et la meilleure solution connue,
 * DELETE /timetables/{id} arrête le calcul (la meilleure solution reste lisible).
 * Le contrôle et la préparation du problème sont dans ProblemeRecu, l'analyse dans AnalyseDesRegles.
 */
@RestController
public class EmploiDuTempsController {

    private static final int DUREE_DEFAUT_SECONDES = 60;
    private static final int DUREE_MAX_SECONDES = 600;
    private static final Duration CONSERVATION = Duration.ofHours(1);

    @Value("${solver.calculs-simultanes-max:2}")
    private int calculsSimultanesMax;

    private final SolverManager<EmploiDuTemps, String> solverManager;
    private final SolutionManager<EmploiDuTemps, HardMediumSoftScore> solutionManager;
    private final Map<String, Travail> travaux = new ConcurrentHashMap<>();

    /** Un calcul en cours ou terminé. */
    static final class Travail {
        volatile EmploiDuTemps meilleure;
        volatile String erreur;
        final Instant debut = Instant.now();
    }

    public EmploiDuTempsController(SolverManager<EmploiDuTemps, String> solverManager,
            SolutionManager<EmploiDuTemps, HardMediumSoftScore> solutionManager) {
        this.solverManager = solverManager;
        this.solutionManager = solutionManager;
    }

    @GetMapping("/health")
    public Map<String, String> sante() {
        return Map.of("status", "UP");
    }

    @PostMapping("/timetables")
    public ResponseEntity<Map<String, Object>> lancer(@RequestBody EmploiDuTemps probleme) {
        purger();
        String refus = ProblemeRecu.verifier(probleme);
        if (refus != null) {
            return ResponseEntity.badRequest().body(Map.of("erreur", refus));
        }
        long actifs = travaux.keySet().stream().map(solverManager::getSolverStatus).filter(s -> s != SolverStatus.NOT_SOLVING).count();
        if (actifs >= calculsSimultanesMax) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body(Map.of("erreur", "Trop de calculs en cours : réessayez dans quelques minutes"));
        }
        ProblemeRecu.relier(probleme);
        String id = UUID.randomUUID().toString();
        Travail travail = new Travail();
        travail.meilleure = probleme;
        travaux.put(id, travail);

        int duree = Math.min(DUREE_MAX_SECONDES, probleme.getDureeSecondes() == null ? DUREE_DEFAUT_SECONDES : Math.max(5, probleme.getDureeSecondes()));
        TerminationConfig arret = new TerminationConfig()
                .withSpentLimit(Duration.ofSeconds(duree))
                // On s'arrête plus tôt quand la solution ne progresse plus
                .withUnimprovedSpentLimit(Duration.ofSeconds(Math.max(5, Math.min(20, duree / 3))));

        solverManager.solveBuilder()
                .withProblemId(id)
                .withProblemFinder(cle -> probleme)
                .withBestSolutionEventConsumer(evenement -> travail.meilleure = evenement.solution())
                .withExceptionHandler((cle, exception) -> travail.erreur = exception.getMessage())
                .withConfigOverride(new SolverConfigOverride<EmploiDuTemps>().withTerminationConfig(arret))
                .run();

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(Map.of("id", id, "dureeSecondes", duree));
    }

    @GetMapping("/timetables/{id}")
    public ResponseEntity<Map<String, Object>> etat(@PathVariable String id) {
        Travail travail = travaux.get(id);
        if (travail == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("erreur", "Calcul inconnu ou expiré"));
        }
        SolverStatus statut = solverManager.getSolverStatus(id);
        EmploiDuTemps solution = travail.meilleure;
        Map<String, Object> reponse = new java.util.LinkedHashMap<>();
        reponse.put("id", id);
        reponse.put("statut", travail.erreur != null ? "ECHEC" : statut.name());
        reponse.put("secondes", Duration.between(travail.debut, Instant.now()).toSeconds());
        if (travail.erreur != null) {
            reponse.put("erreur", travail.erreur);
        }
        HardMediumSoftScore score = solution.getScore();
        if (score != null) {
            reponse.put("score", score.toString());
            reponse.put("dur", score.hardScore());
            reponse.put("moyen", score.mediumScore());
            reponse.put("souple", score.softScore());
        }
        reponse.put("lecons", solution.getLecons().stream()
                .map(l -> {
                    Map<String, Object> ligne = new java.util.HashMap<>();
                    ligne.put("id", l.getId());
                    ligne.put("creneauId", l.getCreneau() == null ? null : l.getCreneau().getId());
                    ligne.put("salleId", l.getSalle() == null ? null : l.getSalle().getId());
                    return ligne;
                })
                .collect(Collectors.toList()));
        // Analyse des règles enfreintes, une fois le calcul terminé (coûteuse)
        if (statut == SolverStatus.NOT_SOLVING && score != null) {
            AnalyseDesRegles.analyser(solutionManager, solution, reponse);
        }
        return ResponseEntity.ok(reponse);
    }

    @DeleteMapping("/timetables/{id}")
    public ResponseEntity<Map<String, Object>> arreter(@PathVariable String id) {
        if (!travaux.containsKey(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("erreur", "Calcul inconnu ou expiré"));
        }
        solverManager.terminateEarly(id);
        return ResponseEntity.ok(Map.of("id", id, "statut", "ARRET_DEMANDE"));
    }

    private void purger() {
        Instant limite = Instant.now().minus(CONSERVATION);
        travaux.entrySet().removeIf(e -> e.getValue().debut.isBefore(limite) && solverManager.getSolverStatus(e.getKey()) == SolverStatus.NOT_SOLVING);
    }
}
