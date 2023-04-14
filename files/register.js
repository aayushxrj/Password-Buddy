import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";


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

const full_name = document.getElementById('full_name').value;
const email = document.getElementById('email').value;
const username = document.getElementById('username').value;
const password = document.getElementById('password').value;
const confirm_password = document.getElementById('confirm_password').value;

const registerbtn = document.getElementById("register-button");


registerbtn.addEventListener("click", function(){
    var isVerified = true;

    if(!validate_email){
        alert("Email is in wrong format!");
        isVerified = false;
    }
    if(!validate_password){
        alert("Password length must be greater than 6!");
        isVerified = false;
    }
    if(password != confirm_password){
        alert("Both passwords does not match!");
        isVerified = false;
    }
    if (validate_field(full_name) == false || validate_field(username) == false ) {
        alert('One or More Extra Fields is empty!!')
        isVerified = false;
    }
    if(isVerified) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          // ...
          window.alert("Success! Account created.");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          window.alert(errorCode+" "+errorMessage);
        });
    }

})

//validate functions
function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
        return true
    }
    else {
        return false
    }
}

function validate_password(password) {
    if (password.length < 6) {
        return false
    }
    else {
        return true
    }
}

function validate_field(field) {
    if (field == null) {
        return false
    }
    else{
        return true
    }
}