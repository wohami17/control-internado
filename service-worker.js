self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('control-internado').then(cache => {
      return cache.addAll(['./index.html', './style.css', './script.js', './logo.jpg']);
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});