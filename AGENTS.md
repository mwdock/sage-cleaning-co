# Repository workflow

Preserve the requested scope, existing security controls, business facts, and unrelated work.

## Testing and promotion

Follow [TESTING.md](TESTING.md). Develop on isolated branches without running test
suites. Integrate the intended batch into `beta`, then let one validation owner
run the smallest relevant set once and record the exact commit and results.
Reuse that evidence for an unchanged release to `main`; do not repeat suites on
feature branches, PR refs, or main. Preserve existing tests and release safeguards.
Required artifact builds are allowed; do not hide repeated validation in builds.
