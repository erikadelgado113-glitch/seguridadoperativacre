// Nombre del almacenamiento interno
const CACHE_NAME = 'safeops-pichincha-v1';

// Archivos que se guardarán para uso sin internet
const assets = [
  './',
  './seguridad_crc.html',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
];

// Instalar el Service Worker y guardar la app en el teléfono
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Guardando archivos en caché para modo offline...');
      return cache.addAll(assets);
    })
  );
});

// Cargar la app desde el teléfono si no hay internet
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});