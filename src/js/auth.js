$(() => {
    const authDetails = {
        "email": "a1outlook4@gmail.com",
        "password": "a1outlook"
    }

    const generateKey = (length) => {
        let counter = 0;
        let key = "";
        let chars = 'abcdefghijklmnopqrstuvwxyz1234567890!@#₦%^&*()_+-=';
        while (counter < length) {
            key += chars[Math.floor(Math.random() * chars.length - 1)];
            counter++;
        }
        return key;
    }

    $('#login').on('submit', (e) => {
        // This function handles authentication;
        
        e.preventDefault();
        const formData = {};
        $('#login').serializeArray().forEach(input => {
            formData[input.name] = input.value;
        })

        if(formData.email != authDetails.email && formData.password != authDetails.password){
            window.alert('Email or Password incorrect, Check and try again');
        } else {
            const key = generateKey(32);
            window.sessionStorage.setItem('sessionKey', key);
            window.location.href = `src/pages/dashboard.html`;
        }
    })

    $('#signOutBtn').on('click', (e) => {
        e.preventDefault();
        window.sessionStorage.removeItem('sessionKey');
        window.location.href= '/index.html'
    })

})