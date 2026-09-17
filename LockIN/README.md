# Daybreak — offline quotes app

## What's in here
- `index.html` — the app
- `app.js`, `quotes-data.js` — logic + the quote library (~85 quotes)
- `manifest.json`, `sw.js` — what makes it installable and offline
- `icon-192.png`, `icon-512.png` — home screen icon

## Hosting it
Upload the whole folder (keep all files together, same folder) to any static
host — GitHub Pages, Netlify, Cloudflare Pages, or your own server. No build
step, no backend. It must be served over **https** (or localhost) — Safari
won't register the offline service worker over plain http.

## Installing it on your iPhone
1. Open the site's URL in **Safari** (not Chrome — Add to Home Screen with
   offline support needs Safari on iOS).
2. Tap the **Share** icon (square with an arrow up) in the toolbar.
3. Tap **Add to Home Screen**, then **Add**.
4. Open it from your home screen from then on — it launches full-screen,
   with no browser bar, and works with airplane mode on.

The app shows a one-time banner reminding people to do this the first time
they visit in Safari (it won't show once it's already installed).

## Notes
- Everything — quotes, saved favorites, the offline cache — lives on-device
  in the browser's storage. Nothing is sent anywhere.
- The background tints slightly with the time of day (morning/day/evening/
  night), computed from the device clock.
- To add your own quotes, edit the `QUOTES` array in `quotes-data.js` —
  each entry is `{ t: "text", a: "author or null", c: "category" }`.
