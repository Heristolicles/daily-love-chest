const CACHE_NAME = 'love-chest-v1';

// Assets to cache
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './css/main.css',
    './css/animations.css',
    './css/responsive.css',
    './js/storage.js',
    './js/messages.js',
    './js/chest.js',
    './js/background.js',
    './assets/chest-closed.svg',
    './assets/chest-open.svg',
    './assets/sparkles.svg'
];

// Install event - cache assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Caching app assets');
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .catch(error => console.log('Cache error:', error))
    );
});

// Activate event - clean old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== CACHE_NAME) {
                            console.log('Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => self.clients.claim())
    );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse;
                }
                
                return fetch(event.request)
                    .then(response => {
                        // Don't cache if not a valid response or if it's not a GET request
                        if (!response || response.status !== 200 || response.type !== 'basic' || event.request.method !== 'GET') {
                            return response;
                        }

                        // Clone the response because it's a stream that can only be consumed once
                        let responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    })
                    .catch(() => {
                        // Return a fallback for page requests if offline
                        if (event.request.mode === 'navigate') {
                            return caches.match('./index.html');
                        }
                    });
            })
    );
});