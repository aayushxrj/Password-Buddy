import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";

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

const registerbtn = document.getElementById("register-button");
document.getElementById("error-msg").style.display = "none";

registerbtn.addEventListener("click", function (event) {
  event.preventDefault();
  const full_name = document.getElementById("full_name").value;
  const email = document.getElementById("email").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const confirm_password = document.getElementById("confirm_password").value;
  const checkbox = document.getElementById("checkbox");

  var isVerified = true;
    /* full_name & username empty not working */
  if (validate_field(full_name) == false || validate_field(username) == false) {
    document.getElementById("error-msg").style.display = "block";
    document.getElementById("error-msg").innerHTML =
      "ERROR : One or more fields are empty";
    isVerified = false;
    return;
  }
  if (!validate_email(email)) {
    document.getElementById("error-msg").style.display = "block";
    document.getElementById("error-msg").innerHTML =
      "ERROR : Not a valid email address";
    isVerified = false;
    return;
  }
  if (!validate_password(password)) {
    document.getElementById("error-msg").style.display = "block";
    document.getElementById("error-msg").innerHTML =
      "ERROR : Password length must be greater than 6";
    isVerified = false;
    return;
  }
  if (password != confirm_password) {
    document.getElementById("error-msg").style.display = "block";
    document.getElementById("error-msg").innerHTML =
      "ERROR : Both passwords does not match";
    isVerified = false;
    return;
  }
  
  if (!checkbox.checked) {
    document.getElementById("error-msg").style.display = "block";
    document.getElementById("error-msg").innerHTML =
      "ERROR : Please accept the terms and conditions";
    isVerified = false;
    return;
  }
  if (isVerified) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        document.getElementById("error-msg").style.display = "block";
        document.getElementById("error-msg").innerHTML =
          "Success! Account created. Redirecting to login...";
        window.location.href = "login.html";
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
  var expression = /^[^@]+@\w+(\.\w+)+\w$/;
  if (expression.test(email) == true) {
    return true;
  } else {
    return false;
  }
}

function validate_password(password) {
  if (password.length < 6) {
    return false;
  } else {
    return true;
  }
}

function validate_field(field) {
  if (field == null) {
    return false;
  } else {
    return true;
  }
}
