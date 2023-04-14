import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, child, set } from "firebase/database";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBjLJh9tUbOYMiPRVrElp_qWtcfWRqqGio",
    authDomain: "password-buddy.firebaseapp.com",
    projectId: "password-buddy",
    storageBucket: "password-buddy.appspot.com",
    messagingSenderId: "1071119548350",
    appId: "1:1071119548350:web:99837ef41f925e0de803ef",
    databaseURL:"https://password-buddy-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//intialise variables
const auth = getAuth(app);
const database = getDatabase(app);



//set up the register function
function register() {
    console.log("Register function called");
    const full_name = document.getElementById('full_name').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirm_password = document.getElementById('confirm_password').value;

    //validate them
    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Email or Password is Outta Line!!')
        return
    }
    if (validate_field(full_name) == false || validate_field(username) == false || validate_field(confirm_password) == false) {
        alert('One or More Extra Fields is empty!!')
        return
    }

    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
        .then(function () {
            // Declare user variable
            var user = auth.currentUser
            alert('test')

            // Add this user to Firebase Database
            var database_ref = database.ref()

            // Create User data
            var user_data = {
                full_name: full_name,
                email: email,
                username: username,
                password:password,
                last_login: Date.now(),
            }

            // Push to Firebase Database
            database_ref.child('users/' + user.uid).set(user_data)

            // DONE
            alert('User Created!!')
        })
        .catch(function (error) {
            // Firebase will use this to alert of its errors
            var error_code = error.code
            var error_message = error.message
            alert(error_code+" "+error_message)
        })
}



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

    if (field.length <= 0) {
        return false
    } else {
        return true
    }
}