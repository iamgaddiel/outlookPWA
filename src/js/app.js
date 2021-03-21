$(() => {
    const db = new Localbase('clientDB');
    let notesWrapper = document.getElementById('notes');
    let noteDetailWrapper = document.getElementById('noteDetailWrapper');
    let formFields = document.getElementById('noteEditFormInputs');


    const getFormData = (formID) => {
        let formData = {};
        $(`#${formID}`).serializeArray().forEach(field => {
            formData[field.name] = field.value;
        })
        return formData;
        // addMeasurement('measurements', formData);
    }

    const createItem = (event, collection, formID, successPage, caption) => {
        event.preventDefault();
        let params = getFormData(formID); // get form values
        db.collection(collection).get()
            .then(clientDb => {

                let id = clientDb.length + 1;
                let timestamp = `${new Date().getDay()}/${new Date().getMonth()}/${new Date().getDay()} - ${new Date().getHours()}: ${new Date().getMinutes()}`

                db.collection(collection).add({
                        id,
                        ...params,
                        timestamp
                    })
                    .then(() => {
                        alert(`${caption} added successfully `)
                        window.location.href = `/src/pages/${successPage}.html`;
                    })
                    .catch(err => console.err(err));
            })
    }

    const listMeasurement = (collection) => {

        let clientList = document.getElementById('clientsList');
        let displayData = '';
        clientList.innerHTML = '';

        db.collection(collection).orderBy('id', 'desc').get()
            .then(measurements => {
                if (measurements.length > 0) {

                    measurements.forEach(data => {

                        if (!!clientList) {

                            switch (data.category) {

                                case "trouser":
                                    displayData = `
                                    <div class="shadow d-flex justify-content-between align-items-center px-2 clientDetailCard">
                                    <a href="../pages/client-detail.html" 
                                        onclick="(function getId(){ sessionStorage.setItem('clientId', '${data.id}');  })()" >
                                            <div class="recent-item" data-id="${data.id}">
                                                <div class="recent-image">
                                                    <img src="../assets/svg/trousers.svg" alt="">
                                                </div>
                                                <div class="recent-text">
                                                    <h6 class="text-muted">${data.name}</h6>
                                                    <span class="text-muted">${data.email}</span>
                                                </div>
                                            </div>
                                            </a>
                                            <button 
                                            class="text-danger delBtn" 
                                            onclick="((event) => { sessionStorage.setItem('clientId', '${data.id}');  deleteItemBtn('measurements');})()">
                                                <div class="del-contact">
                                                    <i class="fa fa-times text-danger data-id="${data.id}"></i>
                                                </div>
                                            </button>
                                    </div>
                                `
                                    clientList.innerHTML += displayData;
                                    break;

                                case "shirt":
                                    displayData = `
                                    <div class="shadow d-flex justify-content-between align-items-center px-2 clientDetailCard">
                                        <a href="../pages/client-detail.html" 
                                        onclick="(function getId(){ sessionStorage.setItem('clientId', '${data.id}');  })()" >
                                            <div class="recent-item" data-id="${data.id}">
                                                <div class="recent-image">
                                                    <img src="../assets/svg/tshirt.svg" alt="">
                                                </div>
                                                <div class="recent-text">
                                                    <h6 class="text-muted">${data.name}</h6>
                                                    <span class="text-muted">${data.email}</span>
                                                </div>
                                            </div>
                                        </a>

                                        <button
                                            class="text-danger delBtn" 
                                            onclick="((event) => { sessionStorage.setItem('clientId', '${data.id}');  deleteItemBtn('measurements');})()">
                                                <i class="fa fa-times text-danger data-id="${data.id}"></i>
                                        </button>
                                    </div>
                                `
                                    clientList.innerHTML += displayData;
                                    break;

                                case "waistcoat":
                                    displayData = `
                                    <div class="shadow d-flex justify-content-between align-items-center px-2 clientDetailCard">
                                    <a href="../pages/client-detail.html" 
                                    onclick="(function getId(){ sessionStorage.setItem('clientId', '${data.id}');  })()" >
                                            <div class="recent-item" data-id="${data.id}">
                                                <div class="recent-image">
                                                    <img src="../assets/svg/waistcoat.svg" alt="">
                                                </div>
                                                <div class="recent-text">
                                                    <h6 class="text-muted">${data.name}</h6>
                                                    <span class="text-muted">${data.email}</span>
                                                </div>
                                            </div>
                                        </a>
                                        <button
                                            class="text-danger delBtn" 
                                            onclick="((event) => { sessionStorage.setItem('clientId', '${data.id}');  deleteItemBtn('measurements');})()">
                                                <i class="fa fa-times text-danger data-id="${data.id}"></i>
                                        </button>
                                    </div>
                                `
                                    clientList.innerHTML += displayData;
                                    break;

                                case "suite":
                                    displayData = `
                                    <div class="shadow d-flex justify-content-between align-items-center px-2 clientDetailCard">
                                        <a href="../pages/client-detail.html" 
                                        onclick="(function getId(){ sessionStorage.setItem('clientId', '${data.id}');  })()" >
                                            <div class="recent-item" data-id="${data.id}">
                                                <div class="recent-image">
                                                    <img src="../assets/svg/suit.svg" alt="">
                                                </div>
                                                <div class="recent-text">
                                                    <h6 class="text-muted">${data.name}</h6>
                                                    <span class="text-muted">${data.email}</span>
                                                </div>
                                            </div>
                                            </a>
                                        <button
                                            class="text-danger delBtn" 
                                            onclick="((event) => { sessionStorage.setItem('clientId', '${data.id}');  deleteItemBtn('measurements');})()">
                                                <i class="fa fa-times text-danger data-id="${data.id}"></i>
                                        </button>
                                    </div>
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

    const displayLimitedMeasurement = (collection) => {
        let miniClientList = document.getElementById('miniClientList').innerHTML = '';
        miniClientList.innerHTML = '';

        db.collection(collection).orderBy('id', 'desc').limit(5).get()
            .then(measurements => {
                let displayData = '';
                if (measurements.length > 0) {

                    measurements.forEach(data => {

                        switch (data.category) {

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

    const getMeasurement = () => {
        // let categoryImage = document.getElementById('categoryImage')
        // let url = window.location.href;
        // let userIdIndex = window.location.href.indexOf('id') + 3;
        // let userId = url.substring(userIdIndex);

        let userId = sessionStorage.getItem('clientId');

        db.collection('measurements').doc({
                id: +userId
            }).get()
            .then(userDetail => {
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

                for (const detail in userDetail) {
                    let displayDetail = `
                <tr>
                    <td><b>${detail}</b></td>
                    <td>${userDetail[detail]}</td>
                </tr>
                `

                    clientDetail.innerHTML += displayDetail;
                }
            })
            .catch(err => console.log('error getting user', err))

    }

    const updateItem = (event, collection, formID, successPage, caption, sessionId) => {
        event.preventDefault();

        let itemId = +sessionStorage.getItem(`${sessionId}`);
        let formData = getFormData(formID);

        // update client detail
        db.collection(collection).doc({
                'id': itemId
            })
            .update({
                ...formData
            })
            .then(() => {
                alert(`${caption} update successful`);
                window.location.href = `/src/pages/${successPage}.html`;
            })
            .catch(err => console.log('could not update user'))
    }

    const editClientForm = (collection) => {
        // @TODO to be continued
        let clientId = +sessionStorage.getItem('clientId');
        let clientEditForm = document.getElementById('clientEditForm');
        let categoryImage = document.getElementById('categoryImage');
        let updateForm = '';

        db.collection(collection).doc({
                'id': clientId
            }).get()
            .then(clientRes => {
                // console.log(clientRes);
                switch (clientRes.category) {
                    case 'trouser':
                        categoryImage.innerHTML = `<img src="../assets/svg/trousers.svg" alt="">`;
                        clientEditForm.innerHTML = '';
                        updateForm = `
                            <div class="form-group">
                                <label for="name" class="text-muted">Name</label>
                                <input type="text" name="name" id="name" placeholder="Customer Name" alt="name" class="form-control" value="${clientRes.name}">
                            </div>
                            <div class="form-group mt-3">
                                <label for="phone" class="text-muted">Phone</label>
                                <input type="text" name="phone" id="phone" placeholder="Customer Phone Number" alt="phone" class="form-control" value="${clientRes.phone}">
                                </div>
                            <div class="form-group mt-3">
                                <label for="email" class="text-muted">Email</label>
                                <input type="email" name="email" id="email" placeholder="Customer Email" alt="email" class="form-control" value="${clientRes.email}">
                                </div>
                            <div class="form-group mt-3">
                                <label for="waist" class="text-muted">Waist</label>
                                <input type="number" name="waist" id="waist" placeholder="Waist size" alt="Waist" class="form-control" value="${clientRes.waist}">
                                </div>
                            <div class="form-group mt-3">
                                <label for="seat" class="text-muted">Seat</label>
                                <input type="number" name="seat" id="seat" placeholder="Seat size" alt="Seat" class="form-control" value="${clientRes.seat}">
                                </div>
                            <div class="form-group mt-3">
                                <label for="hip" class="text-muted">Hip</label>
                                <input type="number" name="hip" id="hip" placeholder="Hip size" alt="Hip" class="form-control" value="${clientRes.hip}">
                                </div>
                            <div class="form-group mt-3">
                                <label for="length" class="text-muted">Length</label>
                                <input type="number" name="length" id="length" placeholder="Length" alt="Length" class="form-control" value="${clientRes.length}">
                            </div>
                            <div class="form-group mt-3">
                                <label for="thigh" class="text-muted">Thigh</label>
                                <input type="number" name="thigh" id="thigh" placeholder="Thigh Size" alt="Thigh" class="form-control" value="${clientRes.thigh}">
                            </div>
                            <div class="form-group mt-3">
                                <label for="calf" class="text-muted">Calf</label>
                                <input type="number" name="calf" id="calf" placeholder="Calf" alt="calf" class="form-control" value="${clientRes.calf}">
                                </div>
                            <div class="form-group mt-3">
                                <label for="inside_leg" class="text-muted">Inside leg</label>
                                <input type="number" name="inside_leg" id="inside_leg" placeholder="Inside Leg Size" alt="Inside leg" class="form-control" value="${clientRes.inside_leg}">
                                </div>
                            <div class="form-group mt-3">
                                <label for="Instep" class="text-muted">Instep</label>
                                <input type="number" name="instep" id="instep" placeholder="Instep" alt="Instep" class="form-control" value="${clientRes.instep}">
                                </div>
                            <div class="form-group mt-3">
                                <label for="comment" class="text-muted">Comment</label>
                                <textarea name="comment" id="comment" cols="5" rows="10" placeholder="Comments" class="form-control" value="${clientRes.comment}"></textarea>
                            </div>
                            `
                        clientEditForm.innerHTML += updateForm;
                        break;

                    case 'shirt':
                        categoryImage.innerHTML = `<img src="../assets/svg/tshirt.svg" alt="">`;
                        clientEditForm.innerHTML = '';
                        updateForm = `
                            <div class="form-group">
                                <input type="text" name="name" id="name" placeholder="Customer Name" alt="name" class="form-control" value="${clientRes.name}">
                            </div>
                            <div class="form-group mt-3">
                                <input type="text" name="phone" id="phone" placeholder="Customer Phone Number" alt="phone" class="form-control" value="${clientRes.phone}">
                            </div>
                            <div class="form-group mt-3">
                                <input type="email" name="email" id="email" placeholder="Customer Email" alt="email" class="form-control" value="${clientRes.email}">
                            </div>
                            <div class="form-group mt-3">
                                <input type="number" name="collar" id="collar" placeholder="Collar size" alt="Collar" class="form-control" value="${clientRes.collar}">
                            </div>
                            <div class="form-group mt-3">
                                <input type="number" name="shoulder" id="shoulder" placeholder="Shoulder size" alt="Shoulder" class="form-control" value="${clientRes.shoulder}">
                            </div>
                            <div class="form-group mt-3">
                                <input type="number" name="chest" id="chest" placeholder="Chest size" alt="Chest" class="form-control" value="${clientRes.chest}">
                            </div>
                            <div class="form-group mt-3">
                                <input type="number" name="waist" id="waist" placeholder="Waist" alt="Waist" class="form-control" value="${clientRes.waist}">
                            </div>
                            <div class="form-group mt-3">
                                <input type="number" name="bottom_hip" id="bottom_hip" placeholder="Bottom hip" alt="Bottom hip" class="form-control" value="${clientRes.bottom_hip}">
                            </div>
                            <div class="form-group mt-3">
                                <input type="number" name="sleeve" id="sleeve" placeholder="Sleeve Size" alt="Sleeve" class="form-control" value="${clientRes.sleeve}">
                            </div>
                            <div class="form-group mt-3">
                                <input type="number" name="arms" id="arms" placeholder="Arms Size" alt="Arms" class="form-control" value="${clientRes.arms}">
                            </div>
                            <div class="form-group mt-3">
                                <input type="number" name="wrist" id="wrist" placeholder="Wrist Size" alt="Wrist size" class="form-control" value="${clientRes.wrist}">
                            </div>
                            <div class="form-group mt-3">
                                <input type="number" name="bottom_hip" id="bottom_hip" placeholder="Bottom Hip" alt="Bottom size" class="form-control" value="${clientRes.bottom_hip}">
                            </div>
                            <div class="form-group mt-3">
                                <input type="number" name="front_length" id="front_length" placeholder="Front Length" alt="Front Length" class="form-control" value="${clientRes.front_length}">
                            </div>
                            <div class="form-group mt-3">
                                <input type="number" name="back_length" id="back_length" placeholder="Front Length" alt="Back Length" class="form-control" value="${clientRes.back_length}">
                            </div>
                            <div class="form-group mt-3">
                                <textarea name="comment" id="comment" cols="5" rows="10" placeholder="Comments" class="form-control" value="${clientRes.comment}"></textarea>
                            </div>
                            `
                        clientEditForm.innerHTML += updateForm;
                        break;

                    case 'waistcoat':
                        categoryImage.innerHTML = `<img src="../assets/svg/waistcoat.svg" alt="">`;
                        clientEditForm.innerHTML = '';
                        updateForm = `
                            <div class="form-group">
                                <input type="text" name="name" id="name" placeholder="Customer Name" alt="name" class="form-control" value="${clientRes.name}">
                            </div>
                            <div class="form-group mt-3">
                                <input type="text" name="phone" id="phone" placeholder="Customer Phone Number" alt="phone" class="form-control" value="${clientRes.phone}">
                            </div>
                            <div class="form-group mt-3">
                                <input type="email" name="email" id="email" placeholder="Customer Email" alt="email" class="form-control" value="${clientRes.email}">
                            </div>
                            <div class="form-group mt-3">
                                <input type="number" name="shoulder" id="shoulder" placeholder="Shoulder size" alt="Shoulder" class="form-control" value="${clientRes.shoulder}">
                            </div>
                            <div class="form-group mt-3">
                                <input type="number" name="chest" id="chest" placeholder="Chest size" alt="Chest" class="form-control" value="${clientRes.chest}">
                            </div>
                            <div class="form-group mt-3">
                                <input type="number" name="waistcoat" id="Waistcoat" placeholder="Waistcoat size" alt="Waistcoat" class="form-control" value="${clientRes.waistcoat}">
                            </div>
                            <div class="form-group mt-3">
                                <input type="number" name="length" id="length" placeholder="Length" alt="Length" class="form-control" value="${clientRes.length}">
                            </div>
                            <div class="form-group mt-3">
                                <textarea name="comment" id="comment" cols="5" rows="10" placeholder="Comments" class="form-control" value="${clientRes.comment}"></textarea>
                            </div>
                            `;
                        clientEditForm.innerHTML += updateForm;
                        break;

                    case 'suite':
                        categoryImage.innerHTML = `<img src="../assets/svg/suit.svg" alt="">>`;
                        clientEditForm.innerHTML = '';
                        updateForm = `
                            <div class="form-group">
                                <input type="text" name="name" id="name" placeholder="Customer Name" alt="name" class="form-control" value="${clientRes.name}">
                            </div>
                            <div class="form-group mt-3">
                                <input type="text" name="phone" id="phone" placeholder="Customer Phone Number" alt="phone" class="form-control" value="${clientRes.phone}">
                            </div>
                            <div class="form-group mt-3">
                                <input type="email" name="email" id="email" placeholder="Customer Email" alt="email" class="form-control" value="${clientRes.email}">
                            </div>
                            <div class="form-group mt-3">
                                <input type="number" name="shoulder" id="shoulder" placeholder="Shoulder size" alt="Shoulder" class="form-control" value="${clientRes.shoulder}">
                            </div>
                            <div class="form-group mt-3">
                                <input type="number" name="chest" id="chest" placeholder="Chest size" alt="Chest" class="form-control" value="${clientRes.chest}">
                            </div>
                            <div class="form-group mt-3">
                                <input type="number" name="waist" id="waist" placeholder="Waist size" alt="Waist" class="form-control" value="${clientRes.waist}">
                            </div>
                            <div class="form-group mt-3">
                                <input type="number" name="wrist" id="wrist" placeholder="Wrist size" alt="wrist" class="form-control" value="${clientRes.wrist}">
                            </div>
                            <div class="form-group mt-3">
                                <input type="number" name="bottom" id="bottom" placeholder="Bottom" alt="bottom" class="form-control" value="${clientRes.bottom}">
                            </div>
                            <div class="form-group mt-3">
                                <input type="number" name="sleeve" id="sleeve" placeholder="Sleeve" alt="Sleeve" class="form-control" value="${clientRes.sleeve}">
                            </div>
                        `;
                        clientEditForm.innerHTML += clientEditForm;
                        break;

                    default:
                        break;
                }
            })
            .catch(err => console.error('unable to get user', err))
    }

    // ============================================= Notes =================================
    const listNotes = (collection) => {
        notesWrapper.innerHTML = '';
        let nodeCard = '';

        db.collection(collection).orderBy('id', 'desc').get()
            .then(notes => {
                if (notes.length > 0)
                    notes.forEach(note => {
                        nodeCard = `
                        <div class="col-sm-6 col-md-3 mt-3">
                        <div class="card note-card">
                            <div class="card-header note-header">
                            <div
                                class="d-flex justify-content-between align-items-center"
                            >
                                <strong class="text-dark">${note.title}</strong>
                                <!-- delete btn -->
                                <button 
                                class="text-danger delBtn" 
                                onclick="((event) => { sessionStorage.setItem('noteId', '${note.id}');  deleteItemBtn('notes');})()">
                                <i class="fas fa-trash"></i>
                                </button>
                            </div>
                            </div>
                            <div class="card-body note-body">
                            <a
                                href="../pages/note_detail.html"
                                class="text-danger"
                                onclick="(() => sessionStorage.setItem('noteId', '${note.id}'))();"
                                >
                                <span>${note.note}</span>
                            </a>
                            </div>
                        </div>
                        </div>
                    `
                        notesWrapper.innerHTML += nodeCard;
                    })
                else {
                    nodeCard = `
                <div class="col-sm-6 col-md-3 mt-3 pt-5 notice">
                    <div class="emoji">
                        <i class="fa fa-frown fa-3x text-muted"></i>
                    </div>
                    <div class="mt-5">
                        <p class="text-center"> You don't seem to have any note saved!</p>
                        <p class="text-center"> Here's an idea, click on the plus button below</p>
                        
                    </div>
                </div>
            `
                    notesWrapper.innerHTML += nodeCard;
                }
            })
    }

    const getNote = () => {
        noteDetailWrapper.innerHTML += '';
        const noteId = +sessionStorage.getItem('noteId');
        db.collection('notes').doc({
                id: noteId
            }).get()
            .then(note => {
                let noteDetail = `
            <div class="card note-card">
                <div class="card-header">
                    <strong class="text-dark">${note.title}</strong>
                </div>
                <div class="card-body note-body">
                    <p>${note.note}</p>
                </div>
            </div>
            `
                noteDetailWrapper.innerHTML += noteDetail;
            })
    }

    const editNote = (collection) => {
        const noteId = +sessionStorage.getItem('noteId');
        console.log(noteId);
        db.collection(collection).doc({
                'id': noteId
            }).get()
            .then(note => {
                let noteEditFields = `
                <div class="form-group">
                <input type="text" name="title" id="title" placeholder="Title" alt="title" class="form-control" value="${note.title}">
                </div>
                <div class="form-group mt-3">
                    <textarea name="note" id="note" cols="5" rows="10" placeholder="Note" class="form-control">
                    ${note.note}
                    </textarea>
                </div>`
                formFields.innerHTML += noteEditFields;
            })
            .catch(err => console.error('Unable to fetch note', err));
    }

    // Get Measurements
    const clientList = document.getElementById('clientsList');
    const miniClientList = document.getElementById('miniClientList');
    const clientEditForm = document.getElementById('clientEditForm');
    let clientDetail = document.getElementById('clientDetail');

    // Check if elements exists
    if (!!clientList) listMeasurement('measurements');
    if (!!miniClientList) displayLimitedMeasurement('measurements');
    if (!!clientDetail) getMeasurement();
    if (!!clientEditForm) editClientForm('measurements');
    // notes
    if (!!notesWrapper) listNotes('notes');
    if (!!noteDetailWrapper) getNote();
    if (!!formFields) editNote('notes');



    // Get form data
    $('#trouserForm').on('submit', event => createItem(event, 'measurements', 'trouserForm', 'clents', 'Client Measurement'));
    $('#waistcoatForm').on('submit', event => createItem(event, 'measurements', 'waistcoatForm', 'clents', 'Client Measurement'));
    $('#suiteForm').on('submit', event => createItem(event, 'measurements', 'suiteForm', 'clents', 'Client Measurement'));
    $('#shirtForm').on('submit', event => createItem(event, 'measurements', 'shirtForm', 'clents', 'Client Measurement'));
    $('#clientEditFormPackage').on('submit', event => updateItem(event, 'measurements', 'clientEditFormPackage', 'client-detail', 'Client', 'clientId'));
    $('#noteForm').on('submit', event => createItem(event, 'notes', 'noteForm', 'notes', 'Note'));
    $('#noteEditForm').on('submit', event => updateItem(event, 'notes', 'noteEditForm', 'note_detail', 'Note', 'noteId'));


})