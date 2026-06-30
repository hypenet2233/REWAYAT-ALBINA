/* روايات البناء — Service Worker (تثبيت + عمل دون اتصال) */
const CACHE = "rb-cache-v2";
const ASSETS = [
  "./", "./index.html", "./admin-core.js", "./seed-data.js",
  "./contracting.html", "./portables.html", "./warehouses.html", "./hr.html",
  "./workers.html", "./finance.html", "./it.html", "./documents.html",
  "./نموذج المتابعة الميدانية.html",
  "./manifest.webmanifest", "./manifest-field.webmanifest", "./icon-192.png", "./icon-512.png",
  "./صور/5911057288288472436.jpg"
];

// التثبيت: تخزين هيكل التطبيق (يتجاهل أي ملف يفشل دون كسر التثبيت)
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => Promise.all(ASSETS.map(a => c.add(a).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

// التفعيل: حذف النسخ القديمة
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// الجلب: شبكة أولًا (لأحدث بيانات) مع الرجوع للكاش عند انقطاع الاتصال
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  e.respondWith(
    fetch(req)
      .then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(req).then(r => r || caches.match("./index.html")))
  );
});
