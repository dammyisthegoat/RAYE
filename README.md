# DAYFRAME

DAYFRAME is a lightweight, offline-capable personal execution PWA built with HTML, CSS, and vanilla JavaScript. It stores your goals, projects, tasks, notes, weekly rotation, and history in this browser's LocalStorage. No account or backend is used.

## Features

- Today mission, next-task recommendation, instructions, and completion criteria
- Editable weekly rotation, with days shown without clock-time scheduling
- Goals and projects with task counts and next actions
- Task create/edit, dependencies, start/resume, complete, defer, skip, and notes
- Progress history and weekly review
- JSON export/import and confirmed local-data reset
- Responsive desktop/mobile navigation
- PWA manifest, install icons, and versioned service-worker shell cache

## Deploy to a new GitHub repository

1. Download and extract `DAYFRAME.zip` on your computer.
2. Sign in to GitHub and choose **New repository**. Name it `DAYFRAME` (or another name), choose Public or Private as you prefer, and create it.
3. Open the empty repository, choose **Add file → Upload files**.
4. Open the extracted `DAYFRAME` folder on your computer and upload the *contents* of that folder: `index.html`, `styles.css`, `app.js`, `manifest.json`, `service-worker.js`, `README.md`, and the `icons` folder. Do not upload the ZIP as the only file.
5. Commit the upload to the `main` branch.
6. Open **Settings → Pages**. Under Build and deployment, choose **Deploy from a branch**, select `main` and `/(root)`, then Save.
7. Wait for GitHub Pages to publish. Your URL will usually be `https://YOUR-USERNAME.github.io/DAYFRAME/` (replace the username and repository name). This app uses relative asset paths, so a repository subpath is supported.
8. Open the published URL once while online so the app shell can cache.

## Install on Windows

1. Open the published URL in current Chrome or Edge.
2. Use the install icon in the address bar, or browser menu → **Install DAYFRAME** / **Apps → Install this site as an app**.
3. Launch it from the Start menu and pin it to the taskbar if desired.
4. Open it online occasionally to receive app updates. If an update is waiting, DAYFRAME will offer a refresh prompt.

## Back up and restore

- Go to **Settings → Export backup** and save the JSON file somewhere safe.
- To restore, open Settings on the device/browser where you want the data, choose **Import backup**, and select that JSON file.
- Import validates the backup before replacing the current DAYFRAME data. Export your current data first if you want a rollback point.
- LocalStorage is scoped to the browser and site origin. Clearing browser data or changing the site origin can make the app's data unavailable, so keep regular exports.

## Updating

Upload changed files to the same repository and commit them. When making a new release, update `CACHE_VERSION` in `service-worker.js` (for example, `dayframe-shell-v2`) so the old app shell can be replaced. User data is stored separately in LocalStorage and is not cleared by app updates. On a new service-worker update, DAYFRAME displays a prompt to reload when the new worker is ready.

## Notes

- The app does not synchronize between browsers or devices.
- Service workers require HTTPS or localhost; GitHub Pages provides HTTPS.
- PWA installation availability varies by browser and platform.
