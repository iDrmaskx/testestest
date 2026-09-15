// Daybreak service worker — caches the whole app on first load so every
// screen after that works with zero network connection.
var CACHE = "daybreak-v1";
var FILES = [
  "./",
  "./index.html",
  "./app.js",
  "./quotes-data.js",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", function(event){
  event.waitUntil(
    caches.open(CACHE).then(function(cache){
      return cache.addAll(FILES);
    }).then(function(){ return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function(event){
  event.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(
        keys.filter(function(k){ return k !== CACHE; })
            .map(function(k){ return caches.delete(k); })
      );
    }).then(function(){ return self.clients.claim(); })
  );
});

// Cache-first: instant + offline. Falls back to network, then re-caches.
self.addEventListener("fetch", function(event){
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then(function(cached){
      if (cached) return cached;
      return fetch(event.request).then(function(response){
        var copy = response.clone();
        caches.open(CACHE).then(function(cache){ cache.put(event.request, copy); });
        return response;
      }).catch(function(){
        if (event.request.mode === "navigate") return caches.match("./index.html");
      });
    })
  );
});
