const CACHE_NAME = 'hike-v2-2';
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    'https://unpkg.com/maplibre-gl@latest/dist/maplibre-gl.js',
    'https://unpkg.com/maplibre-gl@latest/dist/maplibre-gl.css'
];

self.addEventListener('install', (e) => {
    e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then(res => {
            return res || fetch(e.request).then(netRes => {
                return caches.open(CACHE_NAME).then(cache => {
                    if (e.request.url.includes('tile.openstreetmap.org')) {
                        cache.put(e.request, netRes.clone());
                    }
                    return netRes;
                });
            });
        })
    );
});
