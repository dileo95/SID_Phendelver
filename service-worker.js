const CACHE_NAME = "phendelver-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/style.css",
  "/style2.css",
  "/script.js",
  "/script2.js",
  "/manifest.json",
  "/icon-192x192.png",
  "/icon-512x512.png",
  "/1732548390648444.png",
  "/1732611316478019.png",
  "/1732615783594140.png",
  "/Ruben.png",
  "/Asriel-eyes.png",
  "/Auryn-eyes.png",
  "/Ravel-eyes.png",
  "/Ruben-eyes.png",
  "/ShatteredAltArt1.jpg",
  "/Asriel.html",
  "/Auryn.html",
  "/Ravel.html",
  "/Ruben.html",
  "/MorrisRoman-Black.ttf"
];

// Installazione del Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Recupero dei file dalla cache
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Pulizia della cache vecchia
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
