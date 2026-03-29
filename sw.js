const CACHE = 'brainspark-v2';
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
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
