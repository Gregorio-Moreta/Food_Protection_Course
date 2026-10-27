# Git Workflow

Nothing is committed directly to `main`. Every change goes through a branch and a pull request (PR).

## Branch names

Use a short prefix and a kebab-case description:

- `feat/quiz-timer`
- `fix/audio-speed-slider`
- `content/module-3-lesson-2`
- `docs/readme-update`
- `chore/update-dependencies`

## Steps

1. Start from a fresh main: `git checkout main && git pull origin main`
2. Create a branch: `git checkout -b feat/your-change`
3. Make small, focused commits with clear messages written in the imperative, for example "Add slower speech rate options".
4. Run `npm run lint` and `npm run build` before pushing. Both must pass.
5. Push the branch: `git push -u origin feat/your-change`
6. Open a PR into `main` with a short summary and a note on how it was checked.
7. Merge with "Squash and merge" so `main` keeps one commit per change, then delete the branch.
8. Return to main and pull: `git checkout main && git pull origin main`

## Rules

- One topic per branch and per PR.
- Never force push to `main`.
- Never commit secrets. The token file lives in `.git/credentials` and is never tracked.
- Claude sessions follow this same workflow: create a branch, push it, open a PR, and leave the merge to Gregorio unless he asks for it.
