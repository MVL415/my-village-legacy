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

