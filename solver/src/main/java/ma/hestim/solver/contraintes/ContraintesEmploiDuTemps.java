package ma.hestim.solver.contraintes;

import static ai.timefold.solver.core.api.score.stream.ConstraintCollectors.sum;
import static ai.timefold.solver.core.api.score.stream.ConstraintCollectors.toList;
import static ai.timefold.solver.core.api.score.stream.Joiners.equal;
import static ai.timefold.solver.core.api.score.stream.Joiners.filtering;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.function.Function;
import java.util.stream.Stream;

import ai.timefold.solver.core.api.score.buildin.hardmediumsoft.HardMediumSoftScore;
import ai.timefold.solver.core.api.score.stream.Constraint;
import ai.timefold.solver.core.api.score.stream.ConstraintFactory;
import ai.timefold.solver.core.api.score.stream.ConstraintProvider;
import ai.timefold.solver.core.api.score.stream.tri.TriConstraintStream;
import ai.timefold.solver.core.api.score.stream.uni.UniConstraintStream;
import ma.hestim.solver.domain.Lecon;
import ma.hestim.solver.domain.Occupation;
import ma.hestim.solver.domain.Parametres;
import ma.hestim.solver.domain.Ressource;
import ma.hestim.solver.domain.Voeu;

/**
 * Fournisseur des règles du solveur, et ses règles impératives (dures) : salle, enseignant
 * (co-enseignants compris) et groupe (hiérarchie promotion > TD > TP comprise) jamais en double ;
 * capacité, type de salle et équipements ; salle obligatoire en présentiel ; grille du régime ;
 * séance de deux créneaux sur deux créneaux consécutifs ; enseignant disponible ; heures maximales
 * par jour ; temps de trajet entre campus.
 *
 * Les préférences (souples) du profil sont dans PreferencesEmploiDuTemps. Le score est un
 * HardMediumSoftScore : le niveau intermédiaire ne sert qu'aux souhaits « indispensables »
 * déclarés par l'école (MOT-13b).
 *
 * Une leçon sans salle (allowsUnassigned) reste visible des règles qui ne dépendent pas de la
 * salle : sinon, retirer la salle d'une leçon masquerait ses conflits d'enseignant ou de groupe
 * pour le prix d'une seule pénalité « salle requise ».
 */
public class ContraintesEmploiDuTemps implements ConstraintProvider {

    /** Clé « étudiants (ou enseignant) × jour » des règles par journée. */
    record Journee(Object qui, int jour) {
    }

    /** Paire non ordonnée comptée une fois (après les jointures indexées, moins coûteux qu'un lessThan). */
    static boolean avant(Lecon a, Lecon b) {
        return a.getId().compareTo(b.getId()) < 0;
    }

    /** Leçons dont le créneau est posé, avec ou sans salle. */
    static UniConstraintStream<Lecon> posees(ConstraintFactory factory) {
        return factory.forEachIncludingUnassigned(Lecon.class).filter(l -> l.getCreneau() != null);
    }

    @Override
    public Constraint[] defineConstraints(ConstraintFactory factory) {
        return Stream.of(imperatives(factory), PreferencesEmploiDuTemps.regles(factory))
                .flatMap(Arrays::stream)
                .toArray(Constraint[]::new);
    }

    private Constraint[] imperatives(ConstraintFactory factory) {
        return new Constraint[] {
                conflitSalle(factory),
                conflitEnseignant(factory),
                conflitGroupe(factory),
                capaciteSalle(factory),
                typeSalle(factory),
                equipementsSalle(factory),
                salleRequise(factory),
                grilleDuRegime(factory),
                longueurSeance(factory),
                enseignantIndisponible(factory),
                maxHeuresJour(factory),
                trajetEntreCampus(factory),
        };
    }

    // ── Impératives ─────────────────────────────────────────────────────

    /*
     * Conflits : une occupation (intervalle élémentaire × salle, enseignant ou étudiants) prise par
     * plusieurs leçons. Le regroupement est indexé par clé : chaque coup ne touche que les
     * occupations de la leçon déplacée, au lieu de la comparer à toutes celles du même jour.
     * Chaque paire de leçons qui se chevauchent compte une fois, à l'intervalle où commence la plus
     * tardive des deux (ou la commune, si elles commencent ensemble).
     */
    private static Constraint conflit(UniConstraintStream<Lecon> lecons, Function<Lecon, List<Occupation>> occupations, String nom) {
        return lecons
                .expand(occupations)
                .flattenLast(o -> o)
                .groupBy((l, o) -> o, toList((l, o) -> l))
                .filter((o, enConflit) -> enConflit.size() > 1 && pairesQuiCommencent(o, enConflit) > 0)
                .penalize(HardMediumSoftScore.ONE_HARD, ContraintesEmploiDuTemps::pairesQuiCommencent)
                .asConstraint(nom);
    }

    /** Paires en conflit nées sur cet intervalle : au moins l'une des deux leçons y commence. */
    static int pairesQuiCommencent(Occupation o, List<Lecon> enConflit) {
        int commencent = 0;
        for (Lecon l : enConflit) {
            if (l.getAtomes().get(0) == o.atome()) {
                commencent++;
            }
        }
        return commencent * (enConflit.size() - commencent) + commencent * (commencent - 1) / 2;
    }

    Constraint conflitSalle(ConstraintFactory factory) {
        return conflit(factory.forEach(Lecon.class), Lecon::getOccupationsSalle, "Salle déjà occupée");
    }

    Constraint conflitEnseignant(ConstraintFactory factory) {
        return conflit(posees(factory), Lecon::getOccupationsEnseignants, "Enseignant déjà pris");
    }

    Constraint conflitGroupe(ConstraintFactory factory) {
        return conflit(posees(factory), Lecon::getOccupationsEtudiants, "Groupe déjà pris");
    }

    Constraint capaciteSalle(ConstraintFactory factory) {
        return factory.forEach(Lecon.class)
                .filter(l -> l.getSalle() != null && l.getEffectif() > l.getSalle().getCapacite())
                .penalize(HardMediumSoftScore.ONE_HARD, l -> 1 + (l.getEffectif() - l.getSalle().getCapacite()) / 10)
                .asConstraint("Capacité de la salle");
    }

    Constraint typeSalle(ConstraintFactory factory) {
        return factory.forEach(Lecon.class)
                .filter(l -> l.getSalle() != null && l.getTypeSalleRequis() != null && !l.getTypeSalleRequis().equals(l.getSalle().getType()))
                .penalize(HardMediumSoftScore.ONE_HARD)
                .asConstraint("Type de salle");
    }

    Constraint equipementsSalle(ConstraintFactory factory) {
        return factory.forEach(Lecon.class)
                .filter(l -> l.getSalle() != null && !l.getSalle().getEquipements().containsAll(l.getEquipementsRequis()))
                .penalize(HardMediumSoftScore.ONE_HARD)
                .asConstraint("Équipements de la salle");
    }

    Constraint salleRequise(ConstraintFactory factory) {
        // forEachIncludingUnassigned : une leçon sans salle n'est pas vue par forEach
        return factory.forEachIncludingUnassigned(Lecon.class)
                .filter(l -> l.getCreneau() != null && !l.isDistanciel() && l.getSalle() == null)
                .penalize(HardMediumSoftScore.ONE_HARD)
                .asConstraint("Salle requise en présentiel");
    }

    Constraint grilleDuRegime(ConstraintFactory factory) {
        return posees(factory)
                .filter(l -> l.getRegime() != null && !l.getRegime().equals(l.getCreneau().getRegime()))
                .penalize(HardMediumSoftScore.ONE_HARD)
                .asConstraint("Grille du régime");
    }

    Constraint longueurSeance(ConstraintFactory factory) {
        return posees(factory)
                .filter(l -> l.getLongueur() == 2 && l.getCreneau().getSuivantId() == null)
                .penalize(HardMediumSoftScore.ONE_HARD)
                .asConstraint("Deux créneaux consécutifs");
    }

    Constraint enseignantIndisponible(ConstraintFactory factory) {
        return voeuxTouches(factory, Voeu.Type.INDISPONIBLE)
                .penalize(HardMediumSoftScore.ONE_HARD)
                .asConstraint("Enseignant indisponible");
    }

    /** Leçon × créneau qu'elle occupe × vœu d'un de ses enseignants sur ce créneau (jointure indexée par créneau). */
    static TriConstraintStream<Lecon, Long, Voeu> voeuxTouches(ConstraintFactory factory, Voeu.Type type) {
        return posees(factory)
                .expand(Lecon::getCreneauxOccupes)
                .flattenLast(ids -> ids)
                .join(Voeu.class,
                        equal((l, creneauId) -> creneauId, Voeu::getCreneauId),
                        equal((l, creneauId) -> type, Voeu::getType),
                        filtering((l, creneauId, v) -> l.getEnseignants().contains(v.getEnseignantId())));
    }

    Constraint maxHeuresJour(ConstraintFactory factory) {
        // Par étudiants (groupe le plus fin, séances des groupes parents comprises) et par enseignant
        return posees(factory)
                .expand(Lecon::getRessources)
                .flattenLast(ressources -> ressources)
                .groupBy((l, r) -> r, (l, r) -> l.getJour(), sum((l, r) -> l.getDuree()))
                .join(Parametres.class)
                .filter((r, jour, minutes, p) -> minutes > maxMinutes(r, p))
                .penalize(HardMediumSoftScore.ONE_HARD, (r, jour, minutes, p) -> 1 + (minutes - maxMinutes(r, p)) / 60)
                .asConstraint("Heures maximales par jour");
    }

    private static int maxMinutes(Ressource r, Parametres p) {
        return r.getNature() == Ressource.Nature.GROUPE ? p.getMaxMinutesJourGroupe() : p.getMaxMinutesJourEnseignant();
    }

    Constraint trajetEntreCampus(ConstraintFactory factory) {
        // Journée de chaque enseignant et des étudiants de chaque groupe le plus fin : deux séances
        // qui se suivent sur deux campus doivent laisser le temps du trajet
        return factory.forEach(Lecon.class)
                .expand(Lecon::getRessources)
                .flattenLast(ressources -> ressources)
                .groupBy((l, r) -> new Journee(r, l.getJour()), toList((l, r) -> l))
                .filter((journee, lecons) -> lecons.size() > 1)
                .join(Parametres.class)
                .filter((journee, lecons, p) -> trajetsTropCourts(lecons, p) > 0)
                .penalize(HardMediumSoftScore.ONE_HARD, (journee, lecons, p) -> trajetsTropCourts(lecons, p))
                .asConstraint("Temps de trajet entre campus");
    }

    static int trajetsTropCourts(List<Lecon> lecons, Parametres p) {
        List<Lecon> journee = lecons.stream().sorted(Comparator.comparingInt(Lecon::getDebut)).toList();
        int manques = 0;
        for (int i = 1; i < journee.size(); i++) {
            Lecon a = journee.get(i - 1);
            Lecon b = journee.get(i);
            if (!a.chevauche(b) && !Objects.equals(a.getCampusId(), b.getCampusId())
                    && b.getDebut() - a.getFin() < p.trajet(a.getCampusId(), b.getCampusId())) {
                manques++;
            }
        }
        return manques;
    }
}
