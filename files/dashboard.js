import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import {
  getDatabase,
  ref,
  get
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBjLJh9tUbOYMiPRVrElp_qWtcfWRqqGio",
  authDomain: "password-buddy.firebaseapp.com",
  databaseURL: "https://password-buddy-default-rtdb.firebaseio.com",
  projectId: "password-buddy",
  storageBucket: "password-buddy.appspot.com",
  messagingSenderId: "1071119548350",
  appId: "1:1071119548350:web:99837ef41f925e0de803ef",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase();

function checkAuth() {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = "./../index.html";
      alert(
        "You are not authorised to access the dashboard. Please proceed to login."
      );
    }
    else {
      document.body.removeAttribute("style");
      document.body.classList.add("authorized");

      //for displaying the current user's username
      var user = auth.currentUser;
      var usernameRef = ref(db, 'users/' + user.uid + '/username');
      get(usernameRef)
        .then((snapshot) => {
          document.getElementById('ddusername').innerHTML = snapshot.val()+"▾";
        })
        .catch((error) => {
          console.error(error);
        });
      var fullnameRef = ref(db, 'users/' + user.uid + '/full_name');
      get(fullnameRef)
        .then((snapshot) => {
          document.getElementById('fullname').innerHTML = "Welcome " + snapshot.val() + "!";
        })
        .catch((error) => {
          console.error(error);
        });
    }
  });
}

// Call the function once when the page is loaded
checkAuth();



const logoutButton = document.querySelector(".logout");
logoutButton.addEventListener("click", () => {
  // Sign out the user
  signOut(auth)
    .then(() => {
      // Clear cache and redirect to login page
      window.location.href = "./../index.html";
      //   window.location.reload(true);
    })
    .catch((error) => {
      // Handle errors here
      console.error(error);
    });
});


const dropdownButton = document.querySelector("#ddusername");
const dropdown = document.querySelector(".drop");


document.addEventListener("click",(e)=>{
  if(!e.target.closest(".dropdown-menu"))  {dropdown.classList.remove("show");}
})

dropdownButton.addEventListener("click",(e)=>{
  dropdown.classList.toggle("show");
})
