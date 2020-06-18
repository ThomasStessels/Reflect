//const base_url = "http://localhost:3000";

var btnLogin = document.querySelector(".app__button__options").addEventListener("click", (e) => {
    let username = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;

    fetch('http://localhost:3000/users/login', {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "username": username,
            "password": password
        })
    }).then(response => {
        return response.json();
    }).then(json => {
        if (json.status === "success") {
            let token = json.data.token;
            localStorage.setItem("token", token);
            window.location.href = "app.html";
        } else {
            let feedback = document.querySelector(".app__alert");
            feedback.textContent = "Login failed.";
            feedback.classList.remove('hidden');
        }
    })
});