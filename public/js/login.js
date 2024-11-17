document.getElementById("loginForm").addEventListener("submit", login);

function login(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const API_KEY = 'AIzaSyAnupteovip3CSUZlyv8sp5qgjw61C6HQM';

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true
        })
    };

    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, requestOptions)
        .then(resp => resp.json())
        .then(res => {
            if (res.idToken) {
                    new Notify({
                        title: "Login Successfully",
                        status: "success",
                        effect: "fade",
                        speed: 300,
                        customClass: null,
                        customIcon: null,
                        showIcon: true,
                        showCloseButton: true,
                        autoclose: true,
                        autotimeout: 3000,
                        gap: 20,
                        distance: 20,
                        type: "outline",
                        position: "right top",
                    });
                  setTimeout(() => {
                    window.location.href = "../pages/Home.html";
                  },4000);

            } else {
                // Handle login error
                alert(res.error.message || "Login failed");
            }
        })
        .catch(err => console.error("Error:", err));
}