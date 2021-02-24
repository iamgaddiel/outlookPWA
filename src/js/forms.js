$(() => {
    //collections
    // -> measurements
    // -> users
    const db = new Localbase('clientDB');

    const addMeasurement = (collection, params) => {
        db.collection(collection).get()
        .then( clientDb => {

            let id = clientDb.length + 1;
            let timestamp = new Date().getDate();

            db.collection('measurements').add({id, ...params, timestamp})
            .then( () => alert('Client Measurement added successfully '))
            .catch(err => console.err(err));
        })
    }

    const displayMeasurement = (collection) => {

        let clientList = document.getElementById('clientsList');
        let displayData = '';
        clientList.innerHTML = '';

        db.collection(collection).orderBy('id', 'desc').get()
        .then( measurements => {
            if ( measurements.length > 0){

                measurements.forEach( data => {
                    
                    if (!!clientList){
    
                        switch(data.category){
        
                            case "trouser":
                                displayData = `
                                    <a href="./client-detail.html" data-id="${data.id}">
                                        <div class="shadow d-flex justify-content-between align-items-center px-2">
                                            <div class="recent-item">
                                                <div class="recent-image">
                                                    <img src="../assets/svg/trousers.svg" alt="">
                                                </div>
                                                <div class="recent-text">
                                                    <h6 class="text-muted">${data.name}</h6>
                                                    <span class="text-muted">${data.email}</span>
                                                </div>
                                            </div>
                                            <div class="del-contact">
                                                <i class="fa fa-times text-danger id="deleteBtn" data-id="${data.id}"></i>
                                            </div>
                                        </div>
                                    </a>
                                `
                                clientList.innerHTML += displayData;
                                break;
        
                            case "shirt":
                                displayData = `
                                    <a href="./client-detail.html" data-id="${data.id}">
                                        <div class="shadow d-flex justify-content-between align-items-center px-2">
                                            <div class="recent-item">
                                                <div class="recent-image">
                                                    <img src="../assets/svg/shirt.svg" alt="">
                                                </div>
                                                <div class="recent-text">
                                                    <h6 class="text-muted">${data.name}</h6>
                                                    <span class="text-muted">${data.email}</span>
                                                </div>
                                            </div>
                                            <div class="del-contact">
                                                <i class="fa fa-times text-danger id="deleteBtn" data-id="${data.id}"></i>
                                            </div>
                                        </div>
                                    </a>
                                `
                                clientList.innerHTML += displayData;
                                break;
        
                            case "waistcoat":
                                displayData = `
                                    <a href="./client-detail.html" data-id="${data.id}">
                                        <div class="shadow d-flex justify-content-between align-items-center px-2">
                                            <div class="recent-item">
                                                <div class="recent-image">
                                                    <img src="../assets/svg/waistcoat.svg" alt="">
                                                </div>
                                                <div class="recent-text">
                                                    <h6 class="text-muted">${data.name}</h6>
                                                    <span class="text-muted">${data.email}</span>
                                                </div>
                                            </div>
                                            <div class="del-contact">
                                                <i class="fa fa-times text-danger id="deleteBtn" data-id="${data.id}"></i>
                                            </div>
                                        </div>
                                    </a>
                                `
                                clientList.innerHTML += displayData;
                                break;
        
                            case "suite":
                                displayData = `
                                    <a href="./client-detail.html" data-id="${data.id}">
                                        <div class="shadow d-flex justify-content-between align-items-center px-2">
                                            <div class="recent-item">
                                                <div class="recent-image">
                                                    <img src="../assets/svg/suit.svg" alt="">
                                                </div>
                                                <div class="recent-text">
                                                    <h6 class="text-muted">${data.name}</h6>
                                                    <span class="text-muted">${data.email}</span>
                                                </div>
                                            </div>
                                            <div class="del-contact">
                                                <i class="fa fa-times text-danger id="deleteBtn" data-id="${data.id}"></i>
                                            </div>
                                        </div>
                                    </a>
                                `
                                clientList.innerHTML += displayData;
                                break;
        
                            default:
                                displayData = `
                                <p class="text-muted text-center">
                                    Opps ! 
                                    No client data could be found
                                </p>`
                                clientList.innerHTML += displayData;
                        }
                    }
    
                    
                })

            } else {
                displayData = `
                    <div style="width: 30px; margin: auto;">
                        <i class="fa fa-frown fa-3x text-muted text-center"></i>
                    </div>
                    <p class="text-muted text-center mt-4">
                    Opps ! 
                    </p>
                    <p class="text-muted text-center mt-4">
                        No client data could be found
                    </p>`
                clientList.innerHTML += displayData;
            }
        })
    }

    const getFormData = (event, formID) => {
            event.preventDefault();
            
            let formData = {};
            $(`#${formID}`).serializeArray().forEach(field => {
                formData[field.name] = field.value;
            })
            
            addMeasurement('measurements', formData);
    }

    const clientList = document.getElementById('clientsList');
    if(!!clientList){ displayMeasurement('measurements')};

    // Get form data
    $('#trouserForm').on('submit', (event) => getFormData(event, 'trouserForm'));
    $('#waistcoatForm').on('submit',(event) => getFormData(event, 'waistcoatForm'));
    $('#suiteForm').on('submit',(event) => getFormData(event, 'suiteForm'));
    $('#shirtForm').on('submit',(event) => getFormData(event, 'shirtForm'));

})
