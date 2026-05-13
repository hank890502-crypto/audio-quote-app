const CACHE_NAME = 'audio-quote-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon.png'
];

// 安裝階段：快取指定檔案
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// 攔截請求：優先從快取讀取
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 如果快取裡有，就回傳快取的，否則透過網路去抓
        return response || fetch(event.request);
      })
  );
});