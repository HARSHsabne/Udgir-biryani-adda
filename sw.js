const CACHE_NAME = "biryani-app-v1";
const urlsToCache = [
  "./index.html",
  "./style.css",
  "./biryani.jpg",
  "./cold_drink.jpg",
  "./logo.png",
  "./manifest.json"
];

// Install Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch cached files
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
