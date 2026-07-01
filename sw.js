/* روايات البناء — Service Worker (تثبيت + عمل دون اتصال) */
const CACHE = "rb-cache-v4";
const ASSETS = [
  "./", "./index.html", "./admin-core.js", "./seed-data.js",
  "./contracting.html", "./portables.html", "./warehouses.html", "./hr.html",
  "./workers.html", "./finance.html", "./it.html", "./documents.html", "./install.html",
  "./نموذج المتابعة الميدانية.html",
  "./manifest.webmanifest", "./manifest-field.webmanifest", "./m-contracting.webmanifest", "./m-portables.webmanifest", "./m-warehouses.webmanifest", "./m-hr.webmanifest", "./m-workers.webmanifest", "./m-finance.webmanifest", "./m-it.webmanifest", "./m-documents.webmanifest", "./icon-192.png", "./icon-512.png",
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

// الجلب: شبكة أولًا مع تجاوز كاش المتصفح لملفات الموقع (ضمان أحدث نسخة دائمًا)،
// والرجوع للكاش المخزّن فقط عند انقطاع الاتصال.
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const sameOrigin = new URL(req.url).origin === self.location.origin;
  const fresh = sameOrigin ? fetch(req, { cache: "reload" }) : fetch(req);
  e.respondWith(
    fresh
      .then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(req).then(r => r || caches.match("./index.html")))
  );
});
