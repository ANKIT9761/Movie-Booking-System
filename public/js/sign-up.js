document.getElementById("signupForm").addEventListener("submit", signup);

function signup(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const API_KEY = "AIzaSyAnupteovip3CSUZlyv8sp5qgjw61C6HQM";

    // Confirm Password Validation
    if (password !== confirmPassword) {
        alert("Passwords do not match. Please try again.");
        return;
    }

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
        }),
    };

    fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
            requestOptions
        )
        .then((resp) => resp.json())
        .then((res) => {
            if (res.idToken) {
                alert("Signup successful! Redirecting to login page...");
                window.location.href = "login.html";
            } else {
                alert("Signup failed this email is already exists: " + (res.error.message || "Unknown error"));
            }
        })
        .catch((err) => console.error("Error:", err));
}
