import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";


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

const email = document.getElementById('email').value;
const password = document.getElementById('password').value;

const loginbtn = document.getElementById("login-button");

loginbtn.addEventListener("click", function() {  
    var isVerified = true;

    if(!validate_email){
        alert("Email is in wrong format!");
        isVerified = false;
    }
    if (validate_field(password) == false) {
        alert('Password field is empty!!')
        isVerified = false;
    }
    
    if(isVerified){
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          window.alert("Success! Welcome back!");
          window.location.href = "dashboard.html";
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          window.alert(errorCode+" "+errorMessage);
        });}    
  });

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
function validate_field(field) {
    if (field == null) {
        return false
    }
    else{
        return true
    }
}
  
