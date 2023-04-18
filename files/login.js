import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyBjLJh9tUbOYMiPRVrElp_qWtcfWRqqGio",
    authDomain: "password-buddy.firebaseapp.com",
    projectId: "password-buddy",
    storageBucket: "password-buddy.appspot.com",
    messagingSenderId: "1071119548350",
    appId: "1:1071119548350:web:99837ef41f925e0de803ef",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById("error-msg").style.display = "block";
        document.getElementById("error-msg").innerHTML = "Welcome back! Redirecting...";
        window.location.href = "dashboard.html";
    }
});

const loginbtn = document.getElementById("login-button");
document.getElementById("error-msg").style.display = "none";

loginbtn.addEventListener("click", function (event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    var isVerified = true;

    if (!validate_email(email)) {
        document.getElementById("error-msg").style.display = "block";
        document.getElementById("error-msg").innerHTML =
            "ERROR : Not a valid email address";
        isVerified = false;
        return;
    }
    //NOT WORKING WHY??
    if (!validate_field(password)) {
        document.getElementById("error-msg").style.display = "block";
        document.getElementById("error-msg").innerHTML =
            "ERROR : Password field is empty";
        isVerified = false;
        return;
    }

    if (isVerified) {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                document.getElementById("error-msg").style.display = "block";
                document.getElementById("error-msg").innerHTML = "Success! Welcome back!";
                window.location.href = "dashboard.html";
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode + " " + errorMessage);
                document.getElementById("error-msg").style.display = "block";
                document.getElementById("error-msg").innerHTML = errorMessage;
            });
    }
});

//validate functions
function validate_email(email) {
    var expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
        return true
    }
    else {
        return false
    }
}
function validate_field(field) {
    if (field == null) {
        return false
    }
    else {
        return true
    }
}

