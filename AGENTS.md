# Repository workflow

## Working approach

- Finish the requested outcome through the next authorized step; do not stop at a plan, an offer to continue, or a routine implementation choice. Make reasonable, reversible assumptions and state consequential ones.
- Ask only when missing information materially changes the outcome, access is blocked, or a consequential action lacks authorization. Reuse authorization already given in the current task; preserve production, privacy, signing and release boundaries.
- Read the relevant source and scoped instructions, inspect the checkout and existing changes, and use current `beta`. Temporary branches/worktrees are optional for concurrent writers; manage integration and cleanup yourself. Preserve other work and coordinate overlapping files.
- Prefer the authorized Coco Dev workflow. Preserve the user's chosen model and reasoning effort; do not switch hosts, create duplicate sessions, or introduce paid model/API work merely to follow a generic recommendation.
- Reuse existing logic and conventions while preserving caller behavior. Prefer readable names and direct control flow; add abstractions only when they simplify the change. Follow the existing product's visual direction and keep interface copy useful for understanding or action.
- Apply relevant available skills; do not make unrelated skill loading or historical audits a prerequisite for routine work. Follow the testing policy below and record actual evidence without implying skipped checks passed.
- Finish with what changed, what was verified, the branch/commit or PR, and concrete remaining gaps. Keep the result understandable without earlier progress updates.

Preserve the requested scope, existing security controls, business facts, and unrelated work.

## Build and release workflow

Follow [TESTING.md](TESTING.md). Build and review source without authoring or
running tests, then finish integration into `beta` and clean up the task's merged
temporary branches/worktrees. Use beta directly when one writer can safely own
the checkout. Wait for the owner's **prepare beta** request to test and polish
the accumulated batch. **Push to production** promotes that prepared candidate to
`main` and completes web/database delivery and native internal distribution where
applicable. Public store submission is a separate request. Honor approval already
given and report actual delivery results; an unmerged PR is not a finished task.
