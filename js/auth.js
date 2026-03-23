// auth.js

console.log("auth.js loaded");

const auth = firebase.auth();

function signUp() {
  const email = document.getElementById("auth-email").value;
  const password = document.getElementById("auth-password").value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(userCred => {

      const user = userCred.user;

      // 🔥 CREATE USER PROFILE IN FIRESTORE
      return firebase.firestore().collection("users").doc(user.uid).set({
        email: user.email,
        displayName: user.email.split("@")[0],
        photoURL: "",
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });

    })
    .then(() => {
      clearAuthFields();
    })
    .catch(err => alert(err.message));
}

function logIn() {
  const email = document.getElementById("auth-email").value;
  const password = document.getElementById("auth-password").value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      clearAuthFields();
    })
    .catch(err => alert(err.message));
}

function logOut() {
  auth.signOut().then(() => {
    document.getElementById("user-status").innerText = "Logged out!";
    clearFields();
  });
}

function clearAuthFields() {
  document.getElementById("auth-email").value = "";
  document.getElementById("auth-password").value = "";
}

auth.onAuthStateChanged(user => {
  if (user) {
    document.getElementById("user-status").innerText =
      "Welcome, " + user.email;
  } else {
    document.getElementById("user-status").innerText =
      "Not logged in";
  }
});

//
window.signUp = signUp;
window.logIn = logIn;
window.logOut = logOut;

firebase.auth().onAuthStateChanged(async user => {

  const loggedOut = document.getElementById("auth-logged-out");
  const loggedIn = document.getElementById("auth-logged-in");
  const userDisplay = document.getElementById("auth-user");
  const avatar = document.getElementById("auth-avatar");

  if (user) {

    loggedOut.style.display = "none";
    loggedIn.style.display = "flex";

    // 🔥 GET PROFILE FROM FIRESTORE
    const doc = await firebase.firestore().collection("users").doc(user.uid).get();
    const profile = doc.data() || {};

    const name = profile.displayName || user.email.split("@")[0];

    userDisplay.innerText = name;

    if (avatar) {
      if (profile.photoURL) {
        avatar.innerHTML = `<img src="${profile.photoURL}" class="avatar-img">`;
      } else {
        avatar.innerText = name.charAt(0).toUpperCase();
      }
    }

  } else {
    loggedOut.style.display = "flex";
    loggedIn.style.display = "none";
  }

});