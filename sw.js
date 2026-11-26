/* Service Worker：PWA 離線支援
   策略：同源資源 network-first（略過 HTTP 快取），離線時回退 Cache Storage；Google Fonts 採 cache-first。
   CACHE 名稱於每次發版遞增，activate 時清除舊版快取。 */
const CACHE="tohoku26-v59";
/* 預快取清單：首頁、資料檔、manifest、圖示與主視覺（install 階段寫入） */
const CORE=["./","index.html","content.json","manifest.webmanifest","icon-192.png","icon-512.png","apple-touch-icon.png","favicon.svg","favicon-32.png","hero-800.jpg","hero-1200.jpg"];
/* install：預快取 CORE 後 skipWaiting，新版 SW 立即進入 activate */
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
/* activate：刪除非目前版本的快取，clients.claim 讓已開啟頁面改由新 SW 控制 */
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
/* fetch：僅處理 GET；跨網域 API（Open-Meteo）不攔截，交由瀏覽器直連 */
self.addEventListener("fetch",e=>{
 const r=e.request;if(r.method!=="GET")return;
 const u=new URL(r.url);
 if(u.origin===location.origin){
  /* 同源：network-first。以 URL 重新發出請求並指定 cache:"no-cache"，強制向 GitHub Pages 驗證（避開 max-age=600 的 HTTP 快取）；
     成功即更新 Cache Storage，失敗（離線）時以 ignoreSearch 比對快取，最後回退 index.html */
  e.respondWith(fetch(r.url,{cache:"no-cache",credentials:"same-origin"}).then(res=>{if(res.ok){const cp=res.clone();caches.open(CACHE).then(c=>c.put(r,cp))}return res}).catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||caches.match("index.html"))));
 }else if(/fonts\.(googleapis|gstatic)\.com$/.test(u.hostname)){
  /* Google Fonts：cache-first，首次取得後寫入快取 */
  e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{const cp=res.clone();caches.open(CACHE).then(c=>c.put(r,cp));return res})));
 }
});
