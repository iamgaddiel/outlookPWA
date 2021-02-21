$(() => {
    const authDetails = {
        "email": "a1outlook4@gmail.com",
        "password": "a1outlook"
    }

    $('#login').on('submit', (e) => {
        e.preventDefault();
        const formData = {};
        $('#login').serializeArray().forEach(input => {
            formData[input.name] = input.value;
        })

        if(formData.email != authDetails.email && formData.password != authDetails.password){
            window.alert('Email or Password incorrect, Check and try again');
        } else {
            window.location.href = `src/pages/dashboard.html`;
        }
    })
})