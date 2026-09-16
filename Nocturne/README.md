# Nocturne — a sleep tracker PWA

A small installable app for logging your sleep and seeing how you're resting.
Everything is stored locally on your phone (in the browser's storage) — there's
no server and no account, so your data never leaves your device.

## What it does

**Log tab** — tap the `+` button to record a night: bedtime, wake time, sleep
quality (Poor → Great), and how you felt waking up (Exhausted → Energized).
Tap any past entry to edit or delete it. Duration is calculated automatically.

**Insights tab** — your average sleep for the last 7 nights, a bar chart of
hours per night (shaded band shows the recommended 7–9 hour range), a quality
strip under the chart, and a bedtime calculator: enter when you want to wake
up and it suggests bedtimes for 4, 5, or 6 full 90-minute sleep cycles (plus
15 minutes to fall asleep), since waking between cycles tends to feel easier
than waking mid-cycle.

## Put it on your phone (via GitHub Pages)

1. **Create a repository.** On GitHub, click *New repository*, give it a name
   (e.g. `nocturne`), and create it — public is required for free GitHub Pages.

2. **Upload the files.** Drag all the files in this folder (`index.html`,
   `manifest.json`, `service-worker.js`, `icon-192.png`, `icon-512.png`,
   `apple-touch-icon.png`) into the repository using the *Add file → Upload
   files* button on GitHub, then commit.

3. **Turn on Pages.** In the repo, go to *Settings → Pages*. Under *Build and
   deployment*, set *Source* to **Deploy from a branch**, pick the `main`
   branch and the `/ (root)` folder, then save.

4. **Wait a minute**, then visit `https://<your-username>.github.io/<repo-name>/`.
   GitHub shows the live URL at the top of the Pages settings once it's ready.

5. **Install it on your phone.**
   - **iPhone (Safari):** open the URL, tap the Share icon, then *Add to Home
     Screen*.
   - **Android (Chrome):** open the URL, tap the ⋮ menu, then *Add to Home
     screen* / *Install app*.

   It'll open full-screen from your home screen, like a native app, and keeps
   working offline after the first load.

## Notes

- This is a static site — no build step, no dependencies to install.
- Data lives in the browser's local storage on whichever device you use it
  on. It doesn't sync between your phone and a computer; if you clear your
  browser data or switch phones, past entries won't carry over.
- The recommended bedtime is a simple 90-minute sleep-cycle formula, not
  medical advice.
