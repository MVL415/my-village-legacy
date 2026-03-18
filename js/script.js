const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav-menu");

if(toggle && nav){
  toggle.addEventListener("click", () => {
    nav.classList.toggle("show");
  });
}

function openLightbox(img){
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  if(lightbox && lightboxImg){
    lightbox.style.display = "flex";
    lightboxImg.src = img.src;
  }
}

function closeLightbox(){
  const lightbox = document.getElementById("lightbox");
  if(lightbox){
    lightbox.style.display = "none";
  }
}

const firebaseConfig = {
  apiKey: "AIzaSyDUcWnoh3vASnvvDyMtUemrjIPl-sBo65M",
  authDomain: "my-village-legacy.firebaseapp.com",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

function signUp() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => alert("User signed up!"))
    .catch(err => alert(err.message));
}

function logIn() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => alert("Logged in!"))
    .catch(err => alert(err.message));
}

function logOut() {
  auth.signOut().then(() => alert("Logged out"));
}