// auth.js

console.log("auth.js loaded");

const auth = firebase.auth();

function signUp() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      document.getElementById("user-status").innerText = "Account created!";
    })
    .catch(err => alert(err.message));
}

function logIn() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      document.getElementById("user-status").innerText = "Logged in!";
    })
    .catch(err => alert(err.message));
}

function logOut() {
  auth.signOut().then(() => {
    document.getElementById("user-status").innerText = "Logged out!";
  });
}

//
window.signUp = signUp;
window.logIn = logIn;
window.logOut = logOut;
