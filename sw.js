const CACHE_NAME = 'udgir-biryani-v8'; // Increment the version when updating

const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js', // if you have a separate JS
  '/logo.png',
  '/biryani.jpg',
  '/cold_drink.jpg',
  '/Mutton-Biryani.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => 
      Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache); // Delete old caches
          }
        })
      )
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
