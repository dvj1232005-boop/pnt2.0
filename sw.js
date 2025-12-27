const CACHE_NAME = "partner-treat-v1";

const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

/* ===== INSTALL ===== */
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

/* ===== ACTIVATE ===== */
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

/* ===== FETCH ===== */
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(res =>
      res || fetch(event.request)
    )
  );
});
