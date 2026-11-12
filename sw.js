const CACHE = 'maopomi-6ffa8916de4e258a';
const PRECACHE = ["./","./assets/bed-v2.webp","./assets/bowl-empty-v2.webp","./assets/bowl-full-v2.webp","./assets/house-v2.webp","./assets/icon-180.png","./assets/icon-192.png","./assets/icon-512.png","./assets/icon.webp","./assets/index-Cp3C8rM3.js","./assets/index-DW62SEDL.css","./assets/nunito.ttf","./assets/pomi-groom-v2.webp","./assets/pomi-idle-v2.webp","./assets/pomi-pet-v2.webp","./assets/pomi-portrait-happy-v1.webp","./assets/pomi-portrait-sleepy-v1.webp","./assets/pomi-portrait-space-v1.webp","./assets/pomi-pounce-v2.webp","./assets/pomi-sleep-v2.webp","./assets/pomi-stalk-v2.webp","./assets/pomi-walk-a-v2.webp","./assets/pomi-walk-b-v2.webp","./assets/rug-v2.webp","./assets/sofa-colour-v1.webp","./assets/yarn-v2.webp","./index.html","./licenses/fonts/Nunito-OFL.txt","./manifest.webmanifest"];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(PRECACHE)));
  // Wait for all old clients to close; never replace code midway through play/save.
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys
    .filter(key => key.startsWith('maopomi-') && key !== CACHE).map(key => caches.delete(key)))));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(caches.open(CACHE).then(async cache => {
    const cached = await cache.match(event.request);
    if (cached) return cached;
    try { return await fetch(event.request); }
    catch (error) {
      if (event.request.mode === 'navigate') return cache.match('./index.html');
      throw error;
    }
  }));
});
