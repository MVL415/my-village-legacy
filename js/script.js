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

document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("newsletter-form");

  if (form) {
    form.addEventListener("submit", function () {
      
      setTimeout(() => {
        form.reset(); // clears input
      }, 500);

    });
  }

});

function openBookModal(title, author, img, review, question, bookId) {

  document.getElementById("book-modal").style.display = "block";

  document.getElementById("modal-title").innerText = title;
  document.getElementById("modal-author").innerText = author;
  document.getElementById("modal-img").src = img;
  document.getElementById("modal-review").innerText = review;
  document.getElementById("modal-question").innerText = question;

  // Load comments (Giscus)
  const comments = document.getElementById("comments-section");
  comments.innerHTML = `
    <script src="https://giscus.app/client.js"
      data-repo="MVL415/mvl-comments"
      data-repo-id="R_kgDORqDULQ"
      data-category="General"
      data-category-id="YOUR_CATEGORY_ID"
      data-mapping="specific"
      data-term="${bookId}"
      data-theme="light"
      crossorigin="anonymous"
      async>
    </script>
  `;
}

function closeBookModal() {
  document.getElementById("book-modal").style.display = "none";
}