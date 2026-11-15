package ma.hestim.solver.domain;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * Une contrainte déclarée par l'école, compilée par Planner en séances concernées (MOT-13b,
 * mot-13b-solveur.md § 4.2). Le solveur ne connaît ni les filières ni les matières par leur nom :
 * il reçoit des identifiants de séances, de créneaux et de salles.
 *
 * <ul>
 * <li>PLAGE : séances visées ({@code lecons}) ou salles visées ({@code salles}, jamais les deux),
 * et créneaux de la grille qui touchent la plage ;</li>
 * <li>PLAFOND : paquets de séances comptés jour par jour, {@code quoi} et {@code seuil} ;</li>
 * <li>REPARTITION : paquets de séances, écart minimal en jours ({@code ecart}) ;</li>
 * <li>ENSEMBLE : paquets à deux côtés A et B, et la {@code relation}.</li>
 * </ul>
 */
public class ContrainteDeclaree {

    public enum Famille { PLAGE, PLAFOND, REPARTITION, ENSEMBLE }

    /** DUR : impossibilité ; MOYEN : souhait indispensable ; SOUPLE : souhait, à son poids. */
    public enum Niveau { DUR, MOYEN, SOUPLE }

    public enum Quoi { HEURES, SEANCES, SEANCES_A_LA_SUITE }

    public enum Relation { EN_MEME_TEMPS, JAMAIS_LE_MEME_JOUR, JAMAIS_A_LA_SUITE }

    /** Un paquet de séances ; le côté B ne sert qu'à ENSEMBLE. */
    public record Paquet(List<String> a, List<String> b) {
        public Paquet {
            a = a == null ? List.of() : a;
            b = b == null ? List.of() : b;
        }
    }

    private Long id;
    private Famille famille;
    private Niveau niveau;
    /** Poids d'un souhait (poids de départ × insistance) ; ignoré aux niveaux DUR et MOYEN. */
    private int poids;
    private List<String> lecons = new ArrayList<>();
    private List<Long> creneaux = new ArrayList<>();
    private List<Long> salles = new ArrayList<>();
    private Quoi quoi;
    private int seuil;
    private int ecart = 1;
    private Relation relation;
    private List<Paquet> paquets = new ArrayList<>();

    /** Les mêmes créneaux en ensemble, pour un test en temps constant. */
    @JsonIgnore
    private Set<Long> creneauxVises = new HashSet<>();

    public ContrainteDeclaree() {
    }

    @JsonIgnore
    public boolean viseCreneau(Long creneauId) {
        return creneauxVises.contains(creneauId);
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Famille getFamille() { return famille; }
    public void setFamille(Famille famille) { this.famille = famille; }
    public Niveau getNiveau() { return niveau; }
    public void setNiveau(Niveau niveau) { this.niveau = niveau; }
    public int getPoids() { return poids; }
    public void setPoids(int poids) { this.poids = poids; }
    public List<String> getLecons() { return lecons; }
    public void setLecons(List<String> lecons) { this.lecons = lecons == null ? new ArrayList<>() : lecons; }
    public List<Long> getCreneaux() { return creneaux; }
    public void setCreneaux(List<Long> creneaux) {
        this.creneaux = creneaux == null ? new ArrayList<>() : creneaux;
        this.creneauxVises = new HashSet<>(this.creneaux);
    }
    public List<Long> getSalles() { return salles; }
    public void setSalles(List<Long> salles) { this.salles = salles == null ? new ArrayList<>() : salles; }
    public Quoi getQuoi() { return quoi; }
    public void setQuoi(Quoi quoi) { this.quoi = quoi; }
    public int getSeuil() { return seuil; }
    public void setSeuil(int seuil) { this.seuil = seuil; }
    public int getEcart() { return ecart; }
    public void setEcart(int ecart) { this.ecart = ecart; }
    public Relation getRelation() { return relation; }
    public void setRelation(Relation relation) { this.relation = relation; }
    public List<Paquet> getPaquets() { return paquets; }
    public void setPaquets(List<Paquet> paquets) { this.paquets = paquets == null ? new ArrayList<>() : paquets; }

    @Override
    public String toString() {
        return "Contrainte déclarée " + id + " (" + famille + ", " + niveau + ")";
    }
}
