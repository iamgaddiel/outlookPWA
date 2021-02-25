
let shellCache = "shell-cache-v1"
let cachedFiles = [
    // pages
    '/',
    '/index.html',
    '/src/pages/category.html',
    '/src/pages/clents.html',
    '/src/pages/client_edit.html',
    '/src/pages/client_detail.html',
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
    '/src/assets/img/shirt-fashion-pngrepo-com.png',
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
    //3rd party js
    "/lib/js/aos.js",
    "bootstrap.min.js",
    "jquery-3.4.1.min.js",
    "jquery.placeholder.label.min.js",
    "jquery.placeholder.label.min.js",
    "splidem.min.js",

]


self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(shellCache)
        .then( (cache) => {
            console.log('caching files ');
            return cache.addAll(cachedFiles);
        })
    )
    console.log('installed')
})

self.addEventListener('active', (event) => {
    console.log('active')
})

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            if (response) return response;
            return fetch(event.request)
        })
    )
})