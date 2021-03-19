
const staticCacheName = "shell-cache-v2"
const dynamicCacheName = 'dynamic-cache-v1';
const dynamicCache = [];

const cachedFiles = [
    '/',
    '/index.html',
    '/manifest.json',
    '/src/pages/dashboard.html',
    '/src/pages/category.html',
    '/src/pages/notes.html',
    '/src/pages/note_form.html',
    '/src/pages/note_edit.html',
    '/src/pages/trouser_form.html',
    '/src/pages/waistcoat_form.html',
    '/src/pages/suite_form.html',
    '/src/pages/shirt_from.html',
    '/src/pages/client-detail.html',
    'src/pages/clents.html',
    '/src/css/style.css',
    '/src/css/forms.css',
    '/src/js/auth.js',
    '/src/js/app.js',
    '/src/js/register.js',
    '/src/assets/img/logo.png',
    '/src/assets/svg/suit.svg',
    '/src/assets/svg/tshirt.svg',
    '/src/assets/svg/waistcoat.svg',
    '/src/assets/svg/trousers.svg',
    '/src/assets/svg/blue-jeans.svg',
    '/src/assets/svg/2161210.svg',
    '/src/assets/img/null.png',
    '/src/assets/img/favicons/favicon.ico',
    '/src/assets/img/favicons/favicon-32x32.png',
    '/src/assets/img/favicons/android-icon-144x144.png',
    '/src/assets/img/favicons/favicon-96x96.png',
    '/src/assets/img/favicons/favicon-16x16.png',
    '/lib/css/aos.css',
    '/lib/css/splide.min.css',
    '/lib/css/bootstrap.min.css',
    '/lib/js/jquery-3.4.1.min.js',
    '/lib/js/splide.min.js',
    '/lib/js/jquery.placeholder.label.min.js',
    '/lib/js/localbase.min.js',
    '/lib/fontawesome/css/all.css',
    '/lib/fontawesome/webfonts/fa-solid-900.woff2',
    '/lib/fontawesome/webfonts/fa-solid-900.ttf',
    '/lib/fontawesome/webfonts/fa-solid-900.woff',
    '/lib//fontawesome/webfonts/fa-brands-400.woff2',

    
    // 'https://use.fontawesome.com/4ebebce28d.js',
    // 'https://use.fontawesome.com/4ebebce28d.css',
    // 'https://use.fontawesome.com/releases/v4.7.0/css/font-awesome-css.min.css',
    // 'https://use.fontawesome.com/releases/v4.7.0/fonts/fontawesome-webfont.woff2',


    // 'https://use.fontawesome.com/4ebebce28d.js',
]


self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(staticCacheName)
        .then( cache => cache.addAll(cachedFiles))
        .then( self.skipWaiting())//
        .catch( err => console.error('error caching files', err))
    )
    console.log('installed')
})

self.addEventListener('active', event => {
    event.waitUntil(
        caches.keys()
        .then( keys => {
            console.log(keys); //
            return Promise.all(
                keys.filter( key !== staticCacheName ) 
                .map( key => caches.delete(key))
            )
        })
    )
})

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then( cacheRes => {
            return cacheRes || fetch(event.request)
            // .then( fetchRes => console.log(fetchRes.url))
        })
    )
    // console.log('fetching', event.request);
})
