package ma.hestim.solver.domain;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonIgnore;

import ai.timefold.solver.core.api.domain.solution.ConstraintWeightOverrides;
import ai.timefold.solver.core.api.domain.solution.PlanningEntityCollectionProperty;
import ai.timefold.solver.core.api.domain.solution.PlanningScore;
import ai.timefold.solver.core.api.domain.solution.PlanningSolution;
import ai.timefold.solver.core.api.domain.solution.ProblemFactCollectionProperty;
import ai.timefold.solver.core.api.domain.solution.ProblemFactProperty;
import ai.timefold.solver.core.api.score.buildin.hardmediumsoft.HardMediumSoftScore;
import ai.timefold.solver.core.api.solver.SolverStatus;

/**
 * Problème et solution : la semaine type des enseignements à placer, avec les créneaux de la
 * grille, les salles, les disponibilités des enseignants et les paramètres de Planner.
 * {@code poidsDesRegles} porte le poids que l'école donne à chaque règle souple du profil (nom de
 * la règle → poids) ; ProblemeRecu le change en ConstraintWeightOverrides à la réception.
 */
@PlanningSolution
public class EmploiDuTemps {

    @ProblemFactCollectionProperty
    private List<Creneau> creneaux = new ArrayList<>();

    @ProblemFactCollectionProperty
    private List<Salle> salles = new ArrayList<>();

    @ProblemFactCollectionProperty
    private List<Voeu> voeux = new ArrayList<>();

    @ProblemFactCollectionProperty
    private List<Ressource> ressources = new ArrayList<>();

    @ProblemFactProperty
    private Parametres parametres = new Parametres();

    @PlanningEntityCollectionProperty
    private List<Lecon> lecons = new ArrayList<>();

    @PlanningScore
    private HardMediumSoftScore score;

    /** Poids des règles souples envoyés par Planner ; une règle absente garde son poids par défaut. */
    private Map<String, Integer> poidsDesRegles = new HashMap<>();

    /** Les mêmes poids, lus par Timefold (rempli à la réception, jamais par le JSON). */
    @JsonIgnore
    private ConstraintWeightOverrides<HardMediumSoftScore> poidsAppliques = ConstraintWeightOverrides.none();

    /** Durée maximale du calcul demandée par Planner (secondes) */
    private Integer dureeSecondes;

    private SolverStatus statut;

    public EmploiDuTemps() {
    }

    /** Après lecture du problème : valeurs que chaque leçon peut prendre (créneaux, salles). */
    public void preparerValeursPossibles() {
        Creneau.calculerAtomes(creneaux);
        lecons.forEach(l -> l.calculerValeursPossibles(creneaux, salles));
    }

    public List<Creneau> getCreneaux() { return creneaux; }
    public void setCreneaux(List<Creneau> creneaux) { this.creneaux = creneaux; }
    public List<Salle> getSalles() { return salles; }
    public void setSalles(List<Salle> salles) { this.salles = salles; }
    public List<Voeu> getVoeux() { return voeux; }
    public void setVoeux(List<Voeu> voeux) { this.voeux = voeux; }
    public List<Ressource> getRessources() { return ressources; }
    public void setRessources(List<Ressource> ressources) { this.ressources = ressources; }
    public Parametres getParametres() { return parametres; }
    public void setParametres(Parametres parametres) { this.parametres = parametres == null ? new Parametres() : parametres; }
    public List<Lecon> getLecons() { return lecons; }
    public void setLecons(List<Lecon> lecons) { this.lecons = lecons; }
    public HardMediumSoftScore getScore() { return score; }
    public void setScore(HardMediumSoftScore score) { this.score = score; }
    public Map<String, Integer> getPoidsDesRegles() { return poidsDesRegles; }
    public void setPoidsDesRegles(Map<String, Integer> poids) { this.poidsDesRegles = poids == null ? new HashMap<>() : poids; }
    @JsonIgnore
    public ConstraintWeightOverrides<HardMediumSoftScore> getPoidsAppliques() { return poidsAppliques; }
    @JsonIgnore
    public void setPoidsAppliques(ConstraintWeightOverrides<HardMediumSoftScore> poids) { this.poidsAppliques = poids; }
    public Integer getDureeSecondes() { return dureeSecondes; }
    public void setDureeSecondes(Integer dureeSecondes) { this.dureeSecondes = dureeSecondes; }
    public SolverStatus getStatut() { return statut; }
    public void setStatut(SolverStatus statut) { this.statut = statut; }
}
