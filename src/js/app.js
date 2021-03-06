$(() => {
    //collections
    // -> measurements
    // -> users
    const db = new Localbase('clientDB');

    const addMeasurement = (collection, params) => {
        db.collection(collection).get()
        .then( clientDb => {

            let id = clientDb.length + 1;
            let timestamp = `${new Date().getDay()}/${new Date().getMonth()}/${new Date().getDay()} - ${new Date().getHours()}: ${new Date().getMinutes()}`

            db.collection('measurements').add({id, ...params, timestamp})
            .then( () => alert('Client Measurement added successfully '))
            .catch(err => console.err(err));
        })
    }


    const viewClientDetail = (clientId) => {
        console.log(clientId);
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
                                    <a href="./client-detail.html?id=${data.id}">
                                        <div class="shadow d-flex justify-content-between align-items-center px-2">
                                            <div class="recent-item clientDetailBtn" data-id="${data.id}">
                                                <div class="recent-image">
                                                    <img src="../assets/svg/trousers.svg" alt="">
                                                </div>
                                                <div class="recent-text">
                                                    <h6 class="text-muted">${data.name}</h6>
                                                    <span class="text-muted">${data.email}</span>
                                                </div>
                                            </div>
                                            <div class="del-contact">
                                                <i class="fa fa-times text-danger data-id="${data.id}"></i>
                                            </div>
                                        </div>
                                    </a>
                                `
                                clientList.innerHTML += displayData;
                                break;
        
                            case "shirt":
                                displayData = `
                                <a href="./client-detail.html?id=${data.id}">
                                        <div class="shadow d-flex justify-content-between align-items-center px-2">
                                            <div class="recent-item clientDetailBtn" data-id="${data.id}">
                                                <div class="recent-image">
                                                    <img src="../assets/svg/tshirt.svg" alt="">
                                                </div>
                                                <div class="recent-text">
                                                    <h6 class="text-muted">${data.name}</h6>
                                                    <span class="text-muted">${data.email}</span>
                                                </div>
                                            </div>
                                            <div class="del-contact">
                                                <i class="fa fa-times text-danger data-id="${data.id}"></i>
                                            </div>
                                        </div>
                                    </a>
                                `
                                clientList.innerHTML += displayData;
                                break;
        
                            case "waistcoat":
                                displayData = `
                                <a href="./client-detail.html?id=${data.id}">
                                        <div class="shadow d-flex justify-content-between align-items-center px-2">
                                            <div class="recent-item clientDetailBtn" data-id="${data.id}">
                                                <div class="recent-image">
                                                    <img src="../assets/svg/waistcoat.svg" alt="">
                                                </div>
                                                <div class="recent-text">
                                                    <h6 class="text-muted">${data.name}</h6>
                                                    <span class="text-muted">${data.email}</span>
                                                </div>
                                            </div>
                                            <div class="del-contact">
                                                <i class="fa fa-times text-danger data-id="${data.id}"></i>
                                            </div>
                                        </div>
                                    </a>
                                `
                                clientList.innerHTML += displayData;
                                break;
        
                            case "suite":
                                displayData = `
                                <a href="./client-detail.html?id=${data.id}">
                                        <div class="shadow d-flex justify-content-between align-items-center px-2">
                                            <div class="recent-item clientDetailBtn" data-id="${data.id}">
                                                <div class="recent-image">
                                                    <img src="../assets/svg/suit.svg" alt="">
                                                </div>
                                                <div class="recent-text">
                                                    <h6 class="text-muted">${data.name}</h6>
                                                    <span class="text-muted">${data.email}</span>
                                                </div>
                                            </div>
                                            <div class="del-contact">
                                                <i class="fa fa-times text-danger data-id="${data.id}"></i>
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

    const displayLimitedMeasurement = (collection) => {
        let miniClientList = document.getElementById('miniClientList');
        let displayData = '';
        miniClientList.innerHTML = '';

        db.collection(collection).orderBy('id', 'desc').limit(5).get()
        .then( measurements => {
            if ( measurements.length > 0){

                measurements.forEach( data => {
                    
                    // if (!!miniClientList){
    
                        switch(data.category){
        
                            case "trouser":
                                displayData = `
                                <div class="recent-item">
                                    <div class="recent-image">
                                        <img src="../assets/svg/trousers.svg" alt="">
                                    </div>
                                    <div class="recent-text">
                                        <h6 class="text-muted">${data.name}</h6>
                                        <span class="text-muted">${data.email}</span>
                                    </div>
                                </div>
                                `
                                miniClientList.innerHTML += displayData;
                                break;
        
                            case "shirt":
                                displayData = `
                                <div class="recent-item">
                                    <div class="recent-image">
                                        <img src="../assets/svg/tshirt.svg" alt="">
                                    </div>
                                    <div class="recent-text">
                                        <h6 class="text-muted">${data.name}</h6>
                                        <span class="text-muted">${data.email}</span>
                                    </div>
                                </div>
                                `
                                miniClientList.innerHTML += displayData;
                                break;
        
                            case "waistcoat":
                                displayData = `
                                <div class="recent-item">
                                    <div class="recent-image">
                                        <img src="../assets/svg/waistcoat.svg" alt="">
                                    </div>
                                    <div class="recent-text">
                                        <h6 class="text-muted">${data.name}</h6>
                                        <span class="text-muted">${data.email}</span>
                                    </div>
                                </div>
                                `
                                miniClientList.innerHTML += displayData;
                                break;
        
                            case "suite":
                                let displayData = `
                                <div class="recent-item">
                                    <div class="recent-image">
                                        <img src="../assets/svg/suite.svg" alt="">
                                    </div>
                                    <div class="recent-text">
                                        <h6 class="text-muted">${data.name}</h6>
                                        <span class="text-muted">${data.email}</span>
                                    </div>
                                </div>
                                `
                                miniClientList.innerHTML += displayData;
                                break;
        
                            default:
                                displayData = `
                                <p class="text-muted text-center">
                                    Opps ! 
                                    No client data could be found
                                </p>`
                                miniClientList.innerHTML += displayData;
                        }
                    // }
    
                    
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
                    miniClientList.innerHTML += displayData;
            }
        })
    }

    const getMeasurementDetail = () => {
        let categoryImage = document.getElementById('categoryImage')
        let url = window.location.href;
        let userIdIndex = window.location.href.indexOf('id') + 3;
        let userId = url.substring(userIdIndex);

        console.log(userId);

        db.collection('measurements').doc({id: +userId}).get()
        .then( userDetail => {
            // change client name on status bar
            document.getElementById('clientName').innerHTML = `<h5 class="text-light">${userDetail.name}</h5>`

            console.log(userDetail);
            switch (userDetail.category) {
                case "trouser":
                    categoryImage.innerHTML = `<img src="../assets/svg/trousers.svg" alt="">`;
                    break;
                case "suite":
                    categoryImage.innerHTML = `<img src="../assets/svg/suit.svg" alt="">`;
                    break;
                case "shirt":
                    categoryImage.innerHTML = `<img src="../assets/svg/tshirt.svg" alt="">`;
                    break;
                case "waistcoat":
                    categoryImage.innerHTML = `<img src="../assets/svg/waistcoat.svg" alt="">`;
                    break;
            }

            for (const detail in userDetail){
                let displayDetail = `
                <tr>
                    <td><b>${detail}</b></td>
                    <td>${userDetail[detail]}</td>
                </tr>
                `

                clientDetail.innerHTML += displayDetail;
            }
        })
        .catch( err => console.log('error getting user', err))

    }

    const clientList = document.getElementById('clientsList');
    const miniClientList = document.getElementById('miniClientList');
    let clientDetailBtns = document.getElementsByClassName('clientDetailBtn');
    let clientDetail = document.getElementById('clientDetail');

    if (!!clientList) displayMeasurement('measurements');
    if (!!miniClientList) displayLimitedMeasurement('measurements');
    if (!!clientDetail) getMeasurementDetail();

    // Get form data
    $('#trouserForm').on('submit', (event) => getFormData(event, 'trouserForm'));
    $('#waistcoatForm').on('submit',(event) => getFormData(event, 'waistcoatForm'));
    $('#suiteForm').on('submit',(event) => getFormData(event, 'suiteForm'));
    $('#shirtForm').on('submit',(event) => getFormData(event, 'shirtForm'));

})
