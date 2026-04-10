const CACHE = 'brainspark-v5';
const FILES = [
  './index.html',
  './style.css',
  './special-users.js',
  './config.js',
  './questions.js',
  './game.js',
  './lessons.js',
  './ui.js',
  './firebase.js',
  './profile-fields.js',
  './manifest.json',
  './minigame-chef.js',
  './minigame-builder.js',
  './minigames.js',
  './minigame-fishing.js',
  './minigame-dungeon.js',
  './minigame-rocket.js',
  './grade1.js',
  './grade2.js',
  './grade3.js',
  './grade4.js',
  './grade5.js',
  './grade6.js',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Network-first: try network, fall back to cache
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request)
      .then(res => {
        // Update cache with fresh response
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
