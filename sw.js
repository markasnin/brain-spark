const RELEASE = '20';
const CACHE_PREFIX = 'brainspark-v';
const CACHE = CACHE_PREFIX + RELEASE;
const OFFLINE_PAGE = './index.html';
const ASSETS = [
  'manifest.json',
  'style.css',
  'special-users.js',
  'i18n.js',
  'translations.js',
  'Flags/il.svg',
  'Flags/us.svg',
  'Flags/sa.svg',
  'Flags/ru.svg',
  'Flags/fr.svg',
  'Flags/ua.svg',
  'config.js',
  'question-visuals.js',
  'curriculum.js',
  'questions.js',
  'game.js',
  'lessons.js',
  'ui.js',
  'firebase.js',
  'profile-fields.js',
  'minigame-fishing.js',
  'minigame-dungeon.js',
  'minigame-rocket.js',
  'minigame-chef.js',
  'minigame-builder.js',
  'minigames.js',
  'minigame-puzzles.js',
  'geometry.js',
  'grade1.js',
  'grade2.js',
  'grade3.js',
  'grade4.js',
  'grade5.js',
  'grade6.js',
  'grade7.js',
].map(name => './' + name + '?v=' + RELEASE);

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    const requests = [OFFLINE_PAGE, ...ASSETS].map(path =>
      new Request(new URL(path, self.registration.scope), {cache:'reload'}));
    await cache.addAll(requests);
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE)
      .map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request, {cache:'no-cache'}).catch(async () => {
      const cache = await caches.open(CACHE);
      return await cache.match(OFFLINE_PAGE) || Response.error();
    }));
    return;
  }
  if (!ASSETS.some(path => new URL(path, self.registration.scope).href === request.url)) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    return await cache.match(request) || fetch(request);
  })());
});
