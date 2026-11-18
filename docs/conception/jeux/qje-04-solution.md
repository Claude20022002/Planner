# QJE-04 · Simulation solutions — design

| | |
|---|---|
| Module | QJE · exception opened November 10, 2026 |
| Branch | `jeux-pedagogique` |
| Prepared | November 13, 2026 |
| Approved | User approved the implementation plan in this session |

## 1. Objective
Apply B-1 (neutral curriculum), B-2 (Big-O mobile regression), I-1 (explicit, server-tracked solutions), and scoped cleanup to the ten simulations and thirty challenges. Terminal Linux and collective gameplay remain unchanged. Existing earned points and first-success records remain unchanged.

## 2. Existing implementation
The shared engines evaluate bounded answers; the server checks module access and records first success. Failed results currently disclose expected classifications/positions. The shared session drives both platforms. `JeuxProgressions.reussi_le` is mandatory, so unsuccessful attempts and viewed solutions need separate storage. Models are resolved through the current establishment.

## 3. Confirmed decisions
- Only the ten simulations are in scope.
- Viewing a solution before first success permanently prevents points; viewing it after success preserves that outcome.
- The stable first Big-O ID is `complexite-01`, not `big-o-01`.
- Curriculum contains bilingual discipline metadata and existing challenge levels, not invented academic grades or school URLs.
- Solutions require an explicit action, even after three failures. Existing free hints remain available.

## 4. Solution
```mermaid
sequenceDiagram
    participant Student
    participant API
    participant DB
    Student->>API: POST challenge/solution
    API->>API: Validate identity, module, challenge, empty body
    API->>DB: Ensure state row; lock in transaction
    API->>DB: Record first solution viewing
    DB-->>API: Commit
    API-->>Student: Reference answer and server state
    Student->>API: POST challenge/essais
    API->>API: Evaluate canonical input
    API->>DB: Lock same state row
    API->>DB: First success: zero points if solution viewed
    DB-->>API: Commit
    API-->>Student: Persisted result and progress
```

## 5. Files and responsibilities
- `shared/simulations/catalogue/`, `i18n.js`: neutral metadata and bilingual feedback.
- Shared engines/presentations: no expected answer in failed feedback; no expected-answer column after failure.
- `backend/services/jeux/`: state transactions, backend-only reference solutions, evaluation and tracking.
- `backend/models/`, migration 0080: persistent state and first-success assistance snapshot.
- `backend/routes/jeuxRoutes.js`, `backend/app.js`: authenticated solution POST with CSRF intact.
- Shared session and web/mobile hooks/screens: explicit solution action, persisted failure count, read-only solution panel, no premature takeaway.
- Extracted teacher dialog and individual-session summary: assisted completions identified without awarding points.
- Existing unit, integration, native, and Playwright suites: regressions.

## 6. Data and migration
Migration `0082-jeux-solutions.js` creates `JeuxEtatsDefis`, uniquely keyed by user/game/challenge, with failure count and nullable first-view timestamp. It adds `avec_solution` (default false) to `JeuxProgressions`. All writes for one challenge serialize using the state row. Existing data is preserved. Module owner: QJE. Use the current establishment's model connection for transactions.

## 7. API and security
`POST /api/jeux/:code/defis/:idDefi/solution` accepts an empty body and returns `{ reponse, echecs, solution_vue, sans_points }`. Reference answers stay in a backend-only registry and are tested against the engines. No answer is returned before persistence succeeds. Anonymous solution requests return 401 via a narrowly scoped pre-CSRF authentication guard; cookie authentication still requires CSRF. Revoked module access returns 403. Invalid fields return 400; unknown game/challenge returns 404.

Attempts return the same state fields plus `avec_solution` for successful results. Progress includes a separate `etats` array; `defis` contains successes only. Counts change only for valid, server-evaluated failures. Client reloads cannot reset server state. Requests are idempotent; first success remains authoritative.

## 8. Tests
Test every engine's failed feedback and all thirty reference solutions. Cover API access/CSRF, malformed requests, database failure, concurrent writes, replay, zero-point assistance, preserved old scores, state isolation and reload. Exercise the actual mobile hook, shared request cancellation, and web/native solution displays. Run backend/frontend/mobile tests and lint, frontend build, neutrality check, disposable-database integration, and dedicated Playwright tests. Report infrastructure limitations honestly.

## 9. Delivery
Implement on the existing branch without commits, publication, deployment, or application-database migrations. Update QJE-04 tracking and the module record, and write a session handoff with actual results. Keep merge status pending.

## 10. Risks and rollback
Apply the additive migration before deploying updated applications. Reverting code does not require deleting the new data; preserve state for reapplication. Do not claim secrecy of public source code or tamper-proof exercises. Concurrent operations are ordered by the database lock; a success committed before viewing retains its earned points.

## 11. Out of scope
Terminal Linux, collective gameplay, public-source obfuscation, academic-grade policy, unrelated formatting, production changes, Git commits and publication.
