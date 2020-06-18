//const base_url = "http://localhost:3000";

var btnSignup = document.querySelector(".app__button__options").addEventListener("click", (e) => {
    let username = document.querySelector('#username').value;
    let email = document.querySelector('#email').value;
    let birthday = document.querySelector('#birthday').value;
    let password = document.querySelector('#password').value;

    fetch('http://localhost:3000/users/signup', {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "username": username,
            "email": email,
            "birthday": birthday,
            "password": password
        })
    }).then(response => {
        return response.json();
    }).then(json => {
        if (json.status === "success") {
            let feedback = document.querySelector(".app__alert");
            feedback.textContent = "Sign up complete!";
            feedback.classList.remove('hidden');

            let token = json.data.token;
            localStorage.setItem("token", token);
            window.location.href = "app.html";
        } else {
            let feedback = document.querySelector(".alert");
            feedback.textContent = "Registration failed.";
            feedback.classList.remove('hidden');
        }
    })
});