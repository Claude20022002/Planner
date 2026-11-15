package ma.hestim.solver.contraintes;

import static ai.timefold.solver.core.api.score.stream.ConstraintCollectors.toList;
import static ai.timefold.solver.core.api.score.stream.Joiners.equal;

import java.util.ArrayList;
import java.util.List;

import ai.timefold.solver.core.api.score.buildin.hardmediumsoft.HardMediumSoftScore;
import ai.timefold.solver.core.api.score.stream.Constraint;
import ai.timefold.solver.core.api.score.stream.ConstraintFactory;
import ai.timefold.solver.core.api.score.stream.ConstraintJustification;
import ai.timefold.solver.core.api.score.stream.bi.BiConstraintStream;
import ma.hestim.solver.domain.ContrainteDeclaree;
import ma.hestim.solver.domain.ContrainteDeclaree.Famille;
import ma.hestim.solver.domain.ContrainteDeclaree.Niveau;
import ma.hestim.solver.domain.Lecon;
import ma.hestim.solver.domain.Visee;

/**
 * Les contraintes déclarées par l'école (MOT-13b, mot-13b-solveur.md § 4.3) : une règle par
 * famille (plage, plafond, répartition, ensemble) et par niveau (impossible → dur, indispensable
 * → intermédiaire, souhait → souple au poids de la contrainte), soit 12 règles aux noms stables.
 *
 * Les faits Visee sont joints à la leçon par son identifiant : un coup ne revoit que les
 * contraintes de la leçon déplacée. Chaque pénalité porte l'identifiant de sa contrainte et ses
 * leçons (JustificationDeclaree). Une occurrence pèse 1 dur, 1 moyen, ou le poids du souhait ;
 * les calculs sont dans CalculsDeclares, reproduits par Planner pour le bilan.
 */
public final class ContraintesDeclarees {

    /** Justification d'une pénalité : la contrainte en cause et les leçons concernées. */
    public record JustificationDeclaree(Long contrainte, List<String> lecons) implements ConstraintJustification {
    }

    record CleDuPaquet(ContrainteDeclaree contrainte, int paquet) {
    }

    record CleDuJour(ContrainteDeclaree contrainte, int paquet, int jour) {
    }

    /** Une leçon posée et son côté dans le paquet (ENSEMBLE). */
    record Placee(Lecon lecon, char cote) {
    }

    private ContraintesDeclarees() {
    }

    static Constraint[] regles(ConstraintFactory factory) {
        List<Constraint> regles = new ArrayList<>();
        for (Niveau niveau : Niveau.values()) {
            for (Famille famille : Famille.values()) {
                regles.add(regle(factory, famille, niveau));
            }
        }
        return regles.toArray(Constraint[]::new);
    }

    /** La règle d'une famille et d'un niveau. */
    public static Constraint regle(ConstraintFactory factory, Famille famille, Niveau niveau) {
        return switch (famille) {
            case PLAGE -> plage(factory, niveau);
            case PLAFOND -> plafond(factory, niveau);
            case REPARTITION -> repartition(factory, niveau);
            case ENSEMBLE -> ensemble(factory, niveau);
        };
    }

    /** Nom stable d'une règle : « Contrainte déclarée : plage (impossible) ». */
    public static String nom(Famille famille, Niveau niveau) {
        String f = switch (famille) {
            case PLAGE -> "plage";
            case PLAFOND -> "plafond par jour";
            case REPARTITION -> "répartition";
            case ENSEMBLE -> "ensemble ou séparé";
        };
        String n = switch (niveau) {
            case DUR -> "impossible";
            case MOYEN -> "indispensable";
            case SOUPLE -> "souhait";
        };
        return "Contrainte déclarée : " + f + " (" + n + ")";
    }

    private static HardMediumSoftScore unite(Niveau niveau) {
        return switch (niveau) {
            case DUR -> HardMediumSoftScore.ONE_HARD;
            case MOYEN -> HardMediumSoftScore.ONE_MEDIUM;
            case SOUPLE -> HardMediumSoftScore.ONE_SOFT;
        };
    }

    /** Pénalité de {@code occurrences} : × le poids pour un souhait, 1 par occurrence sinon. */
    static int penalite(ContrainteDeclaree c, int occurrences) {
        return c.getNiveau() == Niveau.SOUPLE ? occurrences * c.getPoids() : occurrences;
    }

    private static List<String> ids(List<Lecon> lecons) {
        return lecons.stream().map(Lecon::getId).toList();
    }

    /** Visées d'une famille et d'un niveau, jointes à leur leçon posée (jointure indexée par identifiant). */
    private static BiConstraintStream<Visee, Lecon> visees(ConstraintFactory factory, Famille famille, Niveau niveau) {
        return factory.forEach(Visee.class)
                .filter(v -> v.lecon() != null && v.de(famille, niveau))
                .join(ContraintesEmploiDuTemps.posees(factory), equal(Visee::lecon, Lecon::getId));
    }

    static Constraint plage(ConstraintFactory factory, Niveau niveau) {
        // Par séance visée, ou par salle visée (une contrainte qui cite une salle ne vise aucune séance)
        BiConstraintStream<Visee, Lecon> parSalle = factory.forEach(Visee.class)
                .filter(v -> v.salle() != null && v.de(Famille.PLAGE, niveau))
                .join(Lecon.class, equal(Visee::salle, l -> l.getSalle().getId()));
        return visees(factory, Famille.PLAGE, niveau)
                .concat(parSalle)
                .filter((v, l) -> CalculsDeclares.creneauxVisesOccupes(v.contrainte(), l) > 0)
                .penalize(unite(niveau), (v, l) -> penalite(v.contrainte(), CalculsDeclares.creneauxVisesOccupes(v.contrainte(), l)))
                .justifyWith((v, l, score) -> new JustificationDeclaree(v.contrainte().getId(), List.of(l.getId())))
                .asConstraint(nom(Famille.PLAGE, niveau));
    }

    static Constraint plafond(ConstraintFactory factory, Niveau niveau) {
        return visees(factory, Famille.PLAFOND, niveau)
                .groupBy((v, l) -> new CleDuJour(v.contrainte(), v.paquet(), l.getJour()), toList((v, l) -> l))
                .filter((cle, lecons) -> excesDuJour(cle, lecons) > 0)
                .penalize(unite(niveau), (cle, lecons) -> penalite(cle.contrainte(), excesDuJour(cle, lecons)))
                .justifyWith((cle, lecons, score) -> new JustificationDeclaree(cle.contrainte().getId(), ids(lecons)))
                .asConstraint(nom(Famille.PLAFOND, niveau));
    }

    private static int excesDuJour(CleDuJour cle, List<Lecon> lecons) {
        return CalculsDeclares.excesPlafond(cle.contrainte().getQuoi(), cle.contrainte().getSeuil(), lecons);
    }

    static Constraint repartition(ConstraintFactory factory, Niveau niveau) {
        return visees(factory, Famille.REPARTITION, niveau)
                .groupBy((v, l) -> new CleDuPaquet(v.contrainte(), v.paquet()), toList((v, l) -> l))
                .filter((cle, lecons) -> trop(cle, lecons) > 0)
                .penalize(unite(niveau), (cle, lecons) -> penalite(cle.contrainte(), trop(cle, lecons)))
                .justifyWith((cle, lecons, score) -> new JustificationDeclaree(cle.contrainte().getId(), ids(lecons)))
                .asConstraint(nom(Famille.REPARTITION, niveau));
    }

    private static int trop(CleDuPaquet cle, List<Lecon> lecons) {
        return CalculsDeclares.pairesTropProches(lecons, cle.contrainte().getEcart());
    }

    static Constraint ensemble(ConstraintFactory factory, Niveau niveau) {
        return visees(factory, Famille.ENSEMBLE, niveau)
                .groupBy((v, l) -> new CleDuPaquet(v.contrainte(), v.paquet()), toList((v, l) -> new Placee(l, v.cote())))
                .filter((cle, placees) -> ecarts(cle, placees) > 0)
                .penalize(unite(niveau), (cle, placees) -> penalite(cle.contrainte(), ecarts(cle, placees)))
                .justifyWith((cle, placees, score) -> new JustificationDeclaree(cle.contrainte().getId(),
                        placees.stream().map(p -> p.lecon().getId()).toList()))
                .asConstraint(nom(Famille.ENSEMBLE, niveau));
    }

    private static int ecarts(CleDuPaquet cle, List<Placee> placees) {
        List<Lecon> a = placees.stream().filter(p -> p.cote() == 'A').map(Placee::lecon).toList();
        List<Lecon> b = placees.stream().filter(p -> p.cote() == 'B').map(Placee::lecon).toList();
        return CalculsDeclares.ensemble(cle.contrainte().getRelation(), a, b);
    }
}
