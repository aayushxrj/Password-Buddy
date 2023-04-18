import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
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
