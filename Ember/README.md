# Ember — a focus timer PWA

A small installable Pomodoro-style timer for tracking deep work. Everything
is stored locally on your phone; there's no server and no account.

## What it does

**Timer tab** — pick a label (what you're working on) and a duration: the
premade options are 15, 25, 50, and 90 minutes, or tap **Custom** to set any
length up to 6 hours. Start the timer and a ring counts down. You can pause
and resume freely — the timer keeps accurate time even if you close the app
and come back, since it's anchored to the clock rather than a simple
countdown. When it finishes (or you end it early), the session is logged
automatically under whatever label was selected.

**Progress tab**:
- **All-time total** — every focused minute you've ever logged.
- **Week / Month toggle with back-and-forward navigation** — browse any past
  week or month, not just the current one.
- **A chart** — hours per day in week view, hours per week in month view.
- **By label** — a breakdown of the selected period showing exactly where
  your hours went, color-coded to match your labels.
- **Recent sessions** — everything logged in the selected period; tap one to
  fix the label, adjust the minutes, or delete it.

**Labels** — tap the `+` icon above the label row on the Timer tab to add,
rename, recolor, or delete labels. You start with three (Deep Work, Study,
Admin) but they're entirely yours to change.

## Put it on your phone (via GitHub Pages)

1. **Create a repository.** On GitHub, click *New repository*, give it a name
   (e.g. `ember`), and create it — public is required for free GitHub Pages.

2. **Upload the files.** Drag all the files in this folder (`index.html`,
   `manifest.json`, `service-worker.js`, `icon-192.png`, `icon-512.png`,
   `apple-touch-icon.png`) into the repository using *Add file → Upload
   files*, then commit.

3. **Turn on Pages.** In the repo, go to *Settings → Pages*. Under *Build and
   deployment*, set *Source* to **Deploy from a branch**, pick the `main`
   branch and the `/ (root)` folder, then save.

4. **Wait a minute**, then visit `https://<your-username>.github.io/<repo-name>/`.

5. **Install it on your phone.**
   - **iPhone (Safari):** open the URL, tap the Share icon, then *Add to Home
     Screen*.
   - **Android (Chrome):** open the URL, tap the ⋮ menu, then *Add to Home
     screen* / *Install app*.

## Notes

- If you end a session in the first 30 seconds, it's treated as accidental
  and isn't logged — everything past that is saved.
- Sessions shorter than a full planned duration (ended early) log the actual
  time you focused, not the time you originally set.
- Data lives in the browser's local storage on whichever device you use it
  on — it won't sync between your phone and a computer.
