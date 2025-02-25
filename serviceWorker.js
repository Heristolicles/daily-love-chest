self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('daily-love-chest-cache').then((cache) => {
            return cache.addAll([
                './', // Changed from '/'
                './index.html',
                './css/main.css',
                './css/animations.css',
                './css/responsive.css',
                './js/app.js',
                './js/chest.js',
                './js/messages.js',
                './js/storage.js',
                './assets/chest-closed.svg',
                './assets/chest-open.svg',
                './assets/sparkles.svg',
                './favicon.svg',
                './public/manifest.json' // Changed path to match your actual manifest location
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('activate', (event) => {
    const cacheWhitelist = ['daily-love-chest-cache'];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});