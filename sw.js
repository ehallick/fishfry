const CACHE_NAME = 'fishfry-cashier-v3';
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './icons/favicon.ico',
    './icons/apple-touch-icon.png',
    './icons/android-chrome-192x192.png',
    './icons/android-chrome-512x512.png'
];

// Install: cache the app
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS))
            .then(() => self.skipWaiting())
    );
});

// Activate: clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => 
            Promise.all(
                keys.filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            )
        ).then(() => self.clients.claim())
    );
});

// Fetch: serve from cache, fall back to network
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(cached => cached || fetch(event.request))
    );
});
