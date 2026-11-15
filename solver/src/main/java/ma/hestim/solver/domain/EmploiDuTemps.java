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
 * {@code contraintesDeclarees} porte les contraintes de l'école, déjà compilées en séances ;
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

    /** Contraintes déclarées par l'école, compilées par Planner (MOT-13b). */
    private List<ContrainteDeclaree> contraintesDeclarees = new ArrayList<>();

    /** Une visée par séance (ou salle) de chaque contrainte : construites à la réception, jamais lues du JSON. */
    @ProblemFactCollectionProperty
    @JsonIgnore
    private List<Visee> visees = new ArrayList<>();

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

    /** Après lecture : une visée par séance de chaque paquet (côtés A et B), ou par salle d'une plage. */
    public void construireVisees() {
        List<Visee> faits = new ArrayList<>();
        for (ContrainteDeclaree c : contraintesDeclarees) {
            if (c.getFamille() == ContrainteDeclaree.Famille.PLAGE) {
                if (!c.getSalles().isEmpty()) {
                    c.getSalles().forEach(s -> faits.add(Visee.deSalle(s, c)));
                } else {
                    c.getLecons().forEach(l -> faits.add(Visee.deLecon(l, c, 0, 'A')));
                }
                continue;
            }
            for (int i = 0; i < c.getPaquets().size(); i++) {
                ContrainteDeclaree.Paquet paquet = c.getPaquets().get(i);
                for (String l : paquet.a()) {
                    faits.add(Visee.deLecon(l, c, i, 'A'));
                }
                for (String l : paquet.b()) {
                    faits.add(Visee.deLecon(l, c, i, 'B'));
                }
            }
        }
        visees = faits;
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
    public List<ContrainteDeclaree> getContraintesDeclarees() { return contraintesDeclarees; }
    public void setContraintesDeclarees(List<ContrainteDeclaree> contraintes) { this.contraintesDeclarees = contraintes == null ? new ArrayList<>() : contraintes; }
    @JsonIgnore
    public List<Visee> getVisees() { return visees; }
    @JsonIgnore
    public void setVisees(List<Visee> visees) { this.visees = visees; }
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
