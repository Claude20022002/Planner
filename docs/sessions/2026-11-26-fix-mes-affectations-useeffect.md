# Session du 2026-11-26 · Mes affectations · `fix/mes-affectations-useeffect`

Fait par Codex, module QUA, dans `..\travaux-planner\mes-affectations-useeffect`.

## Travail et vérifications

Le [plan court](../conception/qualite/fix-mes-affectations-useeffect.md) décrit la dépendance à l’identifiant enseignant, la gestion d’une réponse tardive et le test du nombre d’appels. La page, la pagination, l’amorce React Strict Mode et la suite unitaire ont été relues. Étape de conception, tests applicatifs prévus après validation.

## État laissé

Le plan est proposé au coordinateur. VIT-21 attend en parallèle le visa du chef sur D1 à D7 de #262. VIT-20f est reporté jusqu’au choix des logos par le chef.

## Commandes pour le chef

```powershell
git -C "..\travaux-planner\mes-affectations-useeffect" push -u origin fix/mes-affectations-useeffect
gh pr create --base main --head fix/mes-affectations-useeffect --title "QUA : corriger le chargement de Mes affectations" --fill
```

## Prompt de reprise

```text
Reprends le correctif Mes affectations sur fix/mes-affectations-useeffect
dans ..\travaux-planner\mes-affectations-useeffect. Lis AGENTS.md, la fiche de
mission fix-mes-affectations-useeffect, le plan et cette fiche. Vérifie la
validation du coordinateur, puis applique le plan et vérifie le nombre d’appels.
Consigne les contrôles dans la fiche de session et dans la boîte de sortie.
```
