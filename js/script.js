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

function openBookByIndex(index) {
  currentIndex = index;
  const book = books[index];

  const modal = document.getElementById("book-modal");
  modal.style.display = "flex";   // 👈 only here

  document.getElementById("modal-title").innerText = book.title;
  document.getElementById("modal-author").innerText = book.author;
  document.getElementById("modal-img").src = book.img;
  document.getElementById("modal-review").innerText = book.review;
  document.getElementById("modal-question").innerText = book.question;

  trackBookView(book.id);


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

function nextBook() {
  currentIndex = (currentIndex + 1) % books.length;
  openBookByIndex(currentIndex);
}

function prevBook() {
  currentIndex = (currentIndex - 1 + books.length) % books.length;
  openBookByIndex(currentIndex);
}

let startX = 0;

const modal = document.getElementById("book-modal");

modal.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

modal.addEventListener("touchend", e => {
  let endX = e.changedTouches[0].clientX;

  if (startX - endX > 50) nextBook();     // swipe left
  if (endX - startX > 50) prevBook();     // swipe right
});

modal.addEventListener("mousedown", e => {
  startX = e.clientX;
});

modal.addEventListener("mouseup", e => {
  let endX = e.clientX;

  if (startX - endX > 50) nextBook();
  if (endX - startX > 50) prevBook();
});

function trackBookView(bookId) {
  let viewed = JSON.parse(localStorage.getItem("viewedBooks")) || [];

  if (!viewed.includes(bookId)) {
    viewed.push(bookId);
    localStorage.setItem("viewedBooks", JSON.stringify(viewed));
  }
}

function updateProgress() {
  let viewed = JSON.parse(localStorage.getItem("viewedBooks")) || [];
  document.getElementById("progress").innerText =
    `📚 Books explored: ${viewed.length}`;
}

document.getElementById("book-modal").addEventListener("click", function(e) {
  if (e.target.id === "book-modal") {
    closeBookModal();
  }
});