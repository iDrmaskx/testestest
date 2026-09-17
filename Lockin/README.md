# Lock In — Focus Timer PWA

A installable, offline-capable focus timer:

- **Timer** — pick a preset (Pomodoro 25/5, Deep Work 50/10, Short Burst 15/5, Extended 90/20) or set a custom focus length. A chime + vibration marks the end of each phase.
- **Labels** — create custom labels (e.g. "Deep work", "Client calls", "Writing") with a color, and pick the active one before you start a session.
- **Stats** — automatic totals for this week, this month, and all-time, plus a per-label breakdown bar chart for the week and month, and a recent-sessions log.
- **PWA** — installable to your home screen/desktop, works offline via a service worker, all data stored locally in your browser (`localStorage`) — nothing leaves your device.

## Deploy to GitHub Pages

1. Create a new GitHub repo and add all files in this folder (`index.html`, `manifest.json`, `sw.js`, `icons/`) to the repo root.
2. Push to GitHub.
3. In the repo, go to **Settings → Pages**, set **Source** to your main branch, root folder.
4. Visit the published URL (e.g. `https://yourname.github.io/repo-name/`) — your browser should offer to install it as an app.

## Notes

- Data lives in `localStorage`, scoped to the exact URL you load the app from — same device/browser only, no sync across devices.
- To reset all data, clear site data for the page in your browser, or run `localStorage.clear()` in the console while on the page.
- Icons are placeholder — swap `icons/icon-192.png`, `icons/icon-512.png`, and `icons/icon.svg` for your own art if you want a different look; keep the same filenames or update `manifest.json`/`index.html` to match.
