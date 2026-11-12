const CACHE = 'maopomi-3e01c237b8e2ecb6';
const PRECACHE = ["./","./assets/apricot-v2.png","./assets/bed-v2.webp","./assets/bed-yellow-v2.webp","./assets/blush-v2.png","./assets/bowl-empty-v2.webp","./assets/bowl-full-v2.webp","./assets/box-v2.webp","./assets/care_bowl.png","./assets/care_paw.png","./assets/care_sponge.png","./assets/care_yarn.png","./assets/dm_sans_variable.ttf","./assets/fraunces_variable.ttf","./assets/habitat_bathroom.webp","./assets/habitat_bed.webp","./assets/habitat_bowl.webp","./assets/habitat_kitchen.webp","./assets/habitat_living_room.webp","./assets/habitat_plant.webp","./assets/house-v2.webp","./assets/icon-180.png","./assets/icon-192.png","./assets/icon-512.png","./assets/icon.webp","./assets/index-DC0bpkYT.css","./assets/index-TbCX8iui.js","./assets/lavender-v2.png","./assets/paper_fibers.webp","./assets/paper_rounded.webp","./assets/paper_square.webp","./assets/pomi-groom-v2.webp","./assets/pomi-idle-v2.webp","./assets/pomi-pet-v2.webp","./assets/pomi-pounce-v2.webp","./assets/pomi-sleep-v2.webp","./assets/pomi-stalk-v2.webp","./assets/pomi-walk-a-v2.webp","./assets/pomi-walk-b-v2.webp","./assets/pomi_huh_00.webp","./assets/pomi_huh_01.webp","./assets/pomi_huh_02.webp","./assets/pomi_huh_03.webp","./assets/pomi_huh_04.webp","./assets/pomi_huh_05.webp","./assets/pomi_huh_06.webp","./assets/pomi_huh_07.webp","./assets/rug-v2.webp","./assets/sage-v2.png","./assets/sofa-colour-v1.webp","./assets/yarn-v2.webp","./index.html","./licenses/fonts/DM-Sans-OFL.txt","./licenses/fonts/Fraunces-OFL.txt","./manifest.webmanifest"];
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
