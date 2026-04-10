# Traitors Birthday — Player Handbook Site

Single-file HTML site with 6-phase cumulative reveal for the Traitors Birthday party game.

## Deploy to GitHub Pages

```bash
cd ~/dev/traitors-birthday
git init
git add .
git commit -m "Initial commit: Traitors Birthday player handbook"
gh repo create traitors-birthday --public --source=. --push
```

Then enable Pages:

```bash
gh api -X POST repos/:owner/traitors-birthday/pages -f source.branch=main -f source.path=/
```

Or manually: go to the repo on GitHub → Settings → Pages → Source: `main` / `(root)` → Save.

Your site will be live at:
`https://<your-username>.github.io/traitors-birthday/`

## Phase URLs

- Phase 1 (Welcome): `?phase=1`
- Phase 2 (Roundtable): `?phase=2`
- Phase 3 (Ghosts): `?phase=3`
- Phase 4 (Movie Challenge): `?phase=4`
- Phase 5 (Color Box): `?phase=5`
- Phase 6 (Endgame): `?phase=6`

Phases are cumulative — scanning `?phase=3` shows content from phases 1, 2, and 3.
