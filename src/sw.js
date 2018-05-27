const {assets} = global.serviceWorkerOption;
let assetsToCache = [...assets, './'].map(path => new URL(path, global.location).toString());
const CACHE_NAME = new Date().toISOString();

// Install event for the service worker
// Opens the cache and adds all of the assets
// If there is new content that is installed, the service worker usually get into a waiting phase
// But we want to use the new cache immediately so we call skipWaiting()
self.addEventListener('install', event => {
  event.waitUntil(global.caches.open(CACHE_NAME)
    .then(cache => cache.addAll(assetsToCache))
    .then(() => self.skipWaiting())
  );
});

// Deletes the old cache when the new service worker is installed
// clients.claim() take control of the client when the service worker is activated
// This is mostly for the first time service worker is installer og changed
self.addEventListener('activate', event => {
  event.waitUntil(global.caches.keys()
    .then(cacheNames => Promise.all(
      cacheNames.map(cacheName => {
        if (cacheName.indexOf(CACHE_NAME) === 0) {return null;}
        return global.caches.delete(cacheName);
      })
    ))
    .then(() => self.clients.claim())
  );
});

// Fetches the cache that if the service worker is active
// We only want GET requests and the same origin
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') {
    return;
  }
  const requestUrl = new URL(request.url);
  if (requestUrl.origin !== location.origin) {
    return;
  }
  event.respondWith(global.caches.match(request)
    .then(response => {
      if (response) {return response;}
      return fetch(request)
        .then(responseNetwork => {
          if (!responseNetwork || !responseNetwork.ok) {return responseNetwork;}
          const responseCache = responseNetwork.clone();
          global.caches.open(CACHE_NAME).then(cache => cache.put(request, responseCache));
          return responseNetwork;
        });
    })
  );
});
