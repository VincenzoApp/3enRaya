const cacheName = 'tris-game-v1';
const assets = [
    '/',
    '/index.html',
    '/sw.js',
    '/icon.png',  // Add your app icon here
    '/styles.css',  // If you have external CSS files, add them here
    '/game.js',  // Include the JS file if it's separate from sw.js
    // Add any other resources needed for the game here
];

// Install service worker and cache assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            return cache.addAll(assets);
        })
    );
});

// Fetch from cache first, then network if not found
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

// Clean up old caches when a new service worker is activated
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [cacheName];  // Only keep the current cache version
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (!cacheWhitelist.includes(cache)) {
                        return caches.delete(cache);  // Delete old caches
                    }
                })
            );
        })
    );
});
