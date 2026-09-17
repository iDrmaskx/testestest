# Waypoint — a running log PWA

A small installable app for logging runs — styled like you're actually hiking
a trail with your accumulated mileage. Everything is stored locally on your
phone; there's no server and no account.

## What it does

**Log tab** — tap the `+` button and enter a date, a distance (in miles), and
a time. Pace is calculated automatically and shown live as you type. Tap any
past run to edit or delete it.

**Progress tab** — your all-time total distance and total time, your current
and best day-streaks, and the main event: **your journey**. Pick a real
long-distance trail (John Muir Trail, Wonderland Trail, or the Appalachian
Trail) and your total mileage places a marker along it. Cross a named
waypoint and you'll get a small notification; finish the trail and it loops
into the next lap. Below that, a bar chart shows miles run each day this
week.

## Put it on your phone (via GitHub Pages)

1. **Create a repository.** On GitHub, click *New repository*, give it a name
   (e.g. `waypoint`), and create it — public is required for free GitHub Pages.

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

- Distance is entered in miles. If you'd rather log in kilometers, say the
  word and it's a small change.
- Trail lengths are the real distances; the named mile markers along each
  trail are approximate, for flavor rather than precision.
- Data lives in the browser's local storage on whichever device you use it
  on — it won't sync between your phone and a computer.
