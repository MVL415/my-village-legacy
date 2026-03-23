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
  auth.signOut();
}

function clearAuthFields() {
  document.getElementById("auth-email").value = "";
  document.getElementById("auth-password").value = "";
};

//
window.signUp = signUp;
window.logIn = logIn;
window.logOut = logOut;

firebase.auth().onAuthStateChanged(async user => {

  const loggedOut = document.getElementById("auth-logged-out");
  const loggedIn = document.getElementById("auth-logged-in");

  if (!loggedOut || !loggedIn) return;

  if (user) {
    loggedOut.style.display = "none";
    loggedIn.style.display = "flex";

    try {
      const doc = await firebase.firestore().collection("users").doc(user.uid).get();
      const profile = doc.data() || {};

      const name = profile.displayName || user.email.split("@")[0];

      const avatarEl = document.getElementById("auth-avatar");
      const userEl = document.getElementById("auth-user");

      userEl.innerText = name;

      avatarEl.innerHTML = profile.photoURL
        ? `<img src="${profile.photoURL}" class="avatar-img">`
        : name.charAt(0).toUpperCase();

    } catch (err) {
      console.log("Auth UI error:", err);
    }

  } else {
    loggedOut.style.display = "block";
    loggedIn.style.display = "none";
  }
});