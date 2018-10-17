//Cache all site assets
let hr = new Date().getHours().toString();
let min = new Date().getMinutes().toString();
let sec = new Date().getSeconds().toString();
let year = new Date().getFullYear();
//const cacheName = 'restaurant-app-v' + hr + min + year;
const cacheName = 'restaurant-app-v1';

const cacheAssets = [
    '/',
    '/index.html',
    '/restaurant.html', 
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/css/styles.css',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js', 
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
    '/data/restaurants.json',
    '/manifest.json'
];

self.addEventListener('install', (event) => {
    console.log('Service worker installed');
    
    event.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            console.log('Caching files')
            cache.addAll(cacheAssets);
        })
        .then(() => { self.skipWaiting() })
    );
});


self.addEventListener('activate', (event) => {
    console.log('Service worker activated');
    
    event.waitUntil(
//        caches.keys().then(cacheNames => {
//            return Promise.all(
//                cacheNames.map(cache => {
//                    if (cache !== cacheName){
//                        console.log('Clearing old cache')
//                        caches.delete(cache);
//                    }
//                })
//            );
//        })
        caches.keys().then(function(cacheNames) {
            self.caches.keys().then(keys => { keys.forEach(key => console.log(key)) })
          return Promise.all(
            cacheNames.filter(function(cache) {
              // Return true if you want to remove this cache,
              // but remember that caches are shared across
              // the whole origin
                return cache !== cacheName && cache.startsWith('restaurant');
            }).map(function(cache) {
              return caches.delete(cache);
            })
          );
        })
    );
});


self.addEventListener('fetch', (event) => {
    console.log('Service worker fetching');
    
//    event.respondWith(
//        fetch(event.request)
//        .then(response => {
//            const responseClone = response.clone();
//            caches
//                .open(cacheName)
//                .then(cache => {
//                    cache.put(event.request, responseClone)
//                });
//            return response;
//        })
//        .catch((error) => caches.match(event.request))
//        .then((response) => {
//            return response
//        })
//    );
    
     event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});