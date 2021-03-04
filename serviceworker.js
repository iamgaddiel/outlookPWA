
let staticCacheName = "shell-cache-v3"
let cachedFiles = [
    // pages
    '/',
    '/index.html',
    '/manifest.json',
    '/src/pages/category.html',
    '/src/pages/clents.html',
    '/src/pages/client_edit.html',
    '/src/pages/client-detail.html',
    '/src/pages/dashboard.html',
    '/src/pages/shirt_form.html',
    '/src/pages/suite_form.html',
    '/src/pages/trouser_form.html',
    '/src/pages/waistcoat_form.html',
    // js
    '/src/js/app.js',
    '/src/js/auth.js',
    '/src/js/notification.js',
    '/src/js/render.js',
    // css
    '/src/css/forms.css',
    '/src/css/style.css',
    // img
    '/src/assets/img/A1 black.png',
    '/src/assets/img/A1 white.png',
    '/src/assets/img/null.png',
    '/src/assets/img/shirt-fashion-pngrepo-com.png',
    '/src/assets/img/suit.png',
    // favicons
    "/src/assets/img/favicons/apple-icon-57x57.png",
    "/src/assets/img/favicons/apple-icon-60x60.png",
    "/src/assets/img/favicons/apple-icon-72x72.png",
    "/src/assets/img/favicons/apple-icon-76x76.png",
    "/src/assets/img/favicons/apple-icon-114x114.png",
    "/src/assets/img/favicons/apple-icon-120x120.png",
    "/src/assets/img/favicons/apple-icon-144x144.png",
    "/src/assets/img/favicons/apple-icon-152x152.png",
    "/src/assets/img/favicons/apple-icon-180x180.png",
    "/src/assets/img/favicons/android-icon-192x192.png",
    "/src/assets/img/favicons/favicon-32x32.png",
    "/src/assets/img/favicons/favicon-96x96.png",
    "/src/assets/img/favicons/favicon-16x16.png",
    "/src/assets/img/favicons/favicon.ico",
    // 3rd party css
    "/lib/css/aos.css",
    "/lib/css/bootstrap.min.css",
    "/lib/css/splide.min.css",
    "/lib/css/fontawesome-free-5.12.0-web/css/all.css",
    // 3rd party js
    "/lib/js/aos.js",
    "/lib/js/bootstrap.min.js",
    "/lib/js/jquery-3.4.1.min.js",
    "/lib/js/jquery.placeholder.label.min.js",
    "/lib/js/splide.min.js",
    // icons
    "/lib/css/fontawesome-free-5.12.0-web/webfonts/fa-solid-900.woff2",
]

let dynamicCache = [];


self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(staticCacheName)
        .then( cache => cache.addAll(cachedFiles))
        .then( self.skipWaiting())
        .catch( err => console.log('[sw] err', err))
    )
    console.log('installed') 
})

self.addEventListener('active', (event) => {
    event.waitUntil(
        caches.keys()
        .then( keys => {
            return Promise.all(
                keys
                .filter( key => key !== staticCacheName)
                .map( key => caches.delete(key))
            )
        })
    )
})

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(res => {
            console.log('found', res);
            return res || fetch(event.request).then(fetchRes => {
                console.log('fetch response', fetchRes);
                
                // caches.open(dynamicCache)
                // .then(cache => {
                //     cache.put(event.request.url, fetchRes.clone());
                //     return fetchRes;
                // })
            })
        })
    )
})