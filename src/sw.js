// TODO: Add comments about the code
const {assets} = global.serviceWorkerOption;
let assetsToCache = [...assets, './'].map(path => new URL(path, global.location).toString());
const CACHE_NAME = new Date().toISOString();

self.addEventListener('install', event => {
  event.waitUntil(global.caches.open(CACHE_NAME)
    .then(cache => cache.addAll(assetsToCache))
    .then(() => self.skipWaiting())
  );
});

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
