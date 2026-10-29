// Netzwerk zuerst, Cache als Fallback (offline nutzbar, Updates kommen sofort an)
const C = "fisi-ap2-v1";
self.addEventListener("install", e => { self.skipWaiting(); e.waitUntil(caches.open(C).then(c => c.addAll(["./", "index.html", "style.css", "app.js", "data/fisi1.js", "data/fisi2.js", "data/wiso.js", "icon.svg", "manifest.webmanifest"]))); });
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(fetch(e.request).then(r => { const copy = r.clone(); caches.open(C).then(c => c.put(e.request, copy)); return r; }).catch(() => caches.match(e.request, { ignoreSearch: true })));
});
