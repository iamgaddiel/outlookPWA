
if ('serviceWorker' in navigator){
    navigator.serviceWorker.register('/serviceworker.js')
    .then( (reg) => {
        console.log('service worker registered', reg.scope);
    })
    .catch( err => console.log('Service worker could not be registered', err))
}