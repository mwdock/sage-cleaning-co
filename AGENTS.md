# Repository workflow

## Working approach

- Finish the requested outcome through the next authorized step; do not stop at a plan, an offer to continue, or a routine implementation choice. Make reasonable, reversible assumptions and state consequential ones.
- Ask only when missing information materially changes the outcome, access is blocked, or a consequential action lacks authorization. Reuse authorization already given in the current task; preserve production, privacy, signing and release boundaries.
- Read the relevant source and scoped instructions, inspect the current branch and changes, and work in an isolated branch or worktree from the designated integration line. Preserve other work. Parallelize independent scopes when useful and check existing ownership before assigning overlapping work.
- Prefer the authorized Coco Dev workflow. Preserve the user's chosen model and reasoning effort; do not switch hosts, create duplicate sessions, or introduce paid model/API work merely to follow a generic recommendation.
- Reuse existing logic and conventions while preserving caller behavior. Prefer readable names and direct control flow; add abstractions only when they simplify the change. Follow the existing product's visual direction and keep interface copy useful for understanding or action.
- Apply relevant available skills; do not make unrelated skill loading or historical audits a prerequisite for routine work. Follow the testing policy below and record actual evidence without implying skipped checks passed.
- Finish with what changed, what was verified, the branch/commit or PR, and concrete remaining gaps. Keep the result understandable without earlier progress updates.

Preserve the requested scope, existing security controls, business facts, and unrelated work.

## Testing and promotion

Follow [TESTING.md](TESTING.md). Develop on isolated branches without running test
suites. Integrate the intended batch into `beta`, then let one validation owner
run the smallest relevant set once and record the exact commit and results.
Reuse that evidence for an unchanged release to `main`; do not repeat suites on
feature branches, PR refs, or main. Preserve existing tests and release safeguards.
Required artifact builds are allowed; do not hide repeated validation in builds.
