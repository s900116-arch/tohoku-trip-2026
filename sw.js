const CACHE="tohoku26-v16";
const CORE=["./","index.html","content.json","manifest.webmanifest","icon-192.png","icon-512.png","apple-touch-icon.png","favicon.svg","favicon-32.png","hero-800.jpg","hero-1200.jpg"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
 const r=e.request;if(r.method!=="GET")return;
 const u=new URL(r.url);
 if(u.origin===location.origin){
  // network first, fall back to cache (so edits show up when online, page still opens offline)
  e.respondWith(fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(CACHE).then(c=>c.put(r,cp))}return res}).catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||caches.match("index.html"))));
 }else if(/fonts\.(googleapis|gstatic)\.com$/.test(u.hostname)){
  e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{const cp=res.clone();caches.open(CACHE).then(c=>c.put(r,cp));return res})));
 }
});
