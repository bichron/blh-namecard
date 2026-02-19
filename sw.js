const CACHE_NAME = "chris-card-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./assets/logo.png",
  "./assets/CCOPham/avatar.png",
  "./assets/qr.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});