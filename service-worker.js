/* Bandage Exams - tiny offline cache. Network first, falls back to the last copy. */
const CACHE = 'bandage-exams-v1';

self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE).then((cache) =>
            cache.addAll([
                './', 'index.html', 'css/style.css', 'js/app.js', 'js/exams-data.js',
                'manifest.webmanifest', 'images/logo-full.png', 'images/logo-mark.png'
            ]).catch(() => {})
        )
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    const request = event.request;
    if (request.method !== 'GET' || new URL(request.url).origin !== location.origin) {
        return;
    }

    event.respondWith(
        fetch(request)
            .then((response) => {
                const copy = response.clone();
                caches.open(CACHE).then((cache) => cache.put(request, copy));
                return response;
            })
            .catch(() => caches.match(request))
    );
});
