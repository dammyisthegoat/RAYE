/* DAYFRAME offline shell. Bump CACHE_VERSION when deploying a new release. */
const CACHE_VERSION = "dayframe-shell-v1";
const APP_SHELL = ["./", "./index.html", "./styles.css", "./app.js", "./manifest.json", "./icons/icon.svg", "./icons/icon-192.png", "./icons/icon-512.png"];
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_VERSION).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith("dayframe-shell-") && key !== CACHE_VERSION).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener("message", event => { if (event.data === "SKIP_WAITING") self.skipWaiting(); });
self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET" || new URL(request.url).origin !== self.location.origin) return;
  if (request.mode === "navigate") {
    event.respondWith(fetch(request).then(response => {
      const copy = response.clone(); caches.open(CACHE_VERSION).then(cache => cache.put("./index.html", copy)); return response;
    }).catch(() => caches.match("./index.html").then(response => response || caches.match("./"))));
    return;
  }
  event.respondWith(caches.match(request).then(cached => {
    const network = fetch(request).then(response => {
      if (response && response.ok) { const copy = response.clone(); caches.open(CACHE_VERSION).then(cache => cache.put(request, copy)); }
      return response;
    }).catch(() => cached);
    return cached || network;
  }));
});