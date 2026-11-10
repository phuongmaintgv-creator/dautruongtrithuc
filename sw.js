// Đấu trường Tri thức — lưu trang ứng dụng để mở được cả khi mạng yếu (bài học vẫn cần mạng để vào Đấu trường)
const BAN = 'dttt-app-v1', TEP = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './apple-touch-icon.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(BAN).then(c => c.addAll(TEP))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== BAN).map(x => caches.delete(x))))); self.clients.claim(); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (u.origin !== location.origin) return;            // trang Đấu trường (Google) không qua bộ nhớ đệm
  e.respondWith(fetch(e.request).then(r => { const c = r.clone(); caches.open(BAN).then(x => x.put(e.request, c)); return r; })
    .catch(() => caches.match(e.request).then(r => r || caches.match('./index.html'))));
});
