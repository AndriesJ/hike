const CACHE_NAME = 'hike-cache-v1';
const ASSETS = [
    'index.html',
    'manifest.json',
    'https://unpkg.com/maplibre-gl@latest/dist/maplibre-gl.js',
    'https://unpkg.com/maplibre-gl@latest/dist/maplibre-gl.css'
];

self.addEventListener('install', (e) => {
    e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then(res => {
            return res || fetch(e.request).then(networkRes => {
                return caches.open(CACHE_NAME).then(cache => {
                    // Cache map tiles as they are requested
                    if (e.request.url.includes('tile.openstreetmap.org')) {
                        cache.put(e.request, networkRes.clone());
                    }
                    return networkRes;
                });
            });
        })
    );
});