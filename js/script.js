// =========================
// 🔥 GLOBALS
// =========================
let activeListeners = {};
let currentIndex = 0;

const db = firebase.firestore();

// =========================
// 📚 BOOK DATA
// =========================
const books = [
  {
    id: "marriage",
    title: "The Perfect Marriage",
    author: "Jeneva Rose",
    img: "images/book1.jpg",
    review: "Fast-paced thriller with constant twists—hard to put down.",
    question: "💬 Who did you trust most while reading?"
  },
  {
    id: "divorce",
    title: "The Perfect Divorce",
    author: "Jeneva Rose",
    img: "images/book2.jpg",
    review: "The twists, tension, and drama continues — keeping you guessing the whole way.",
    question: "💬 Did you see the ending coming?"
  },
  {
    id: "twice",
    title: "Twice",
    author: "Mitch Albom",
    img: "images/book3.jpg",
    review: "Emotional and reflective—makes you think about time and choices.",
    question: "💬 If you had a second chance, what would you change?"
  },
  {
    id: "nipsey",
    title: "The Marathon Don't Stop",
    author: "Rob Kenner",
    img: "images/book4.jpg",
    review: "A powerful biography that shows discipline, vision, and purpose.",
    question: "💬 What part of Nipsey’s mindset inspired you most?"
  },
  {
    id: "quicksilver",
    title: "Quicksilver",
    author: "Callie Hart",
    img: "images/book5.jpg",
    review: "My first fantasy read—rich world-building and unforgettable characters.",
    question: "💬 Was it hard to return to reality after this one?"
  },
  {
    id: "brimstone",
    title: "Brimstone",
    author: "Callie Hart",
    img: "images/book6.jpg",
    review: "Dark, immersive, and intense. The sequel pulls you into a completely different world from the first book.",
    question: "💬 Would you survive in this world?"
  },
  {
    id: "christine",
    title: "Christine",
    author: "Stephen King",
    img: "images/book7.jpg",
    review: "Psychological horror about obsession and identity.",
    question: "💬 Was Christine evil… or a reflection?"
  },
  {
    id: "spook",
    title: "The Spook Who Sat by the Door",
    author: "Sam Greenlee",
    img: "images/book8.jpg",
    review: "Nipsey Hussle mentioned how important this book's message was which influenced my decision to read it. It’s a powerful story that explores themes of racial tension, social justice, and the fight for equality.",
    question: "💬 Being such a short read, were you left wanting more or did you feel like Greenlee wrapped it up perfectly? What do you think the story would look like if it were set in today’s world?"
  }
];

// =========================
// 💡 LIGHTBOX
// =========================
function openLightbox(img) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  if (lightbox && lightboxImg) {
    lightbox.style.display = "flex";
    lightboxImg.src = img.src;
  }
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (lightbox) lightbox.style.display = "none";
}

// =========================
// 📖 BOOK MODAL
// =========================
function openBookByIndex(index) {
  currentIndex = index;
  const book = books[index];

  const modal = document.getElementById("book-modal");
  if (!modal) return;

  modal.style.display = "flex";

  document.getElementById("modal-title").innerText = book.title;
  document.getElementById("modal-author").innerText = book.author;
  document.getElementById("modal-img").src = book.img;
  document.getElementById("modal-review").innerText = book.review;
  document.getElementById("modal-question").innerText = book.question;

  trackBookView(book.id);

  setTimeout(() => {
    loadComments(`book-${book.id}`);
  }, 50);
}

function closeBookModal() {
  const modal = document.getElementById("book-modal");
  if (!modal) return;

  modal.style.display = "none";

  const context = `book-${books[currentIndex].id}`;
  if (activeListeners[context]) {
    activeListeners[context]();
    delete activeListeners[context];
  }
}

function nextBook() {
  openBookByIndex((currentIndex + 1) % books.length);
}

function prevBook() {
  openBookByIndex((currentIndex - 1 + books.length) % books.length);
}

// =========================
// 📊 PROGRESS
// =========================
function trackBookView(bookId) {
  let viewed = JSON.parse(localStorage.getItem("viewedBooks")) || [];
  if (!viewed.includes(bookId)) {
    viewed.push(bookId);
    localStorage.setItem("viewedBooks", JSON.stringify(viewed));
  }
}

// =========================
// 💬 COMMENTS (CORE)
// =========================
async function postComment(context) {
  const user = firebase.auth().currentUser;
  if (!user) return alert("Login required");

  const input =
    context === "community"
      ? document.getElementById("community-input")
      : document.getElementById("book-input");

  if (!input || !input.value.trim()) return;

  await db.collection("comments").add({
    text: input.value,
    userId: user.uid,
    displayName: user.email.split("@")[0],
    context,
    likes: 0,
    likedBy: [],
    parentId: null,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });

  input.value = "";
}

function loadComments(context) {
  const container =
    context === "community"
      ? document.getElementById("community-list")
      : document.getElementById("book-list");

  if (!container) return;

  if (activeListeners[context]) activeListeners[context]();

  activeListeners[context] = db
    .collection("comments")
    .where("context", "==", context)
    .orderBy("createdAt", "desc")
    .onSnapshot(snapshot => {
      container.innerHTML = "";

      snapshot.forEach(doc => {
        const c = doc.data();

        container.innerHTML += `
          <div class="comment">
            <strong>${c.displayName || "User"}</strong>
            <div>${c.text}</div>
          </div>
        `;
      });
    });
}

// =========================
// 🚀 MAIN UI INIT
// =========================
document.addEventListener("DOMContentLoaded", () => {

  // 🔝 Back to top
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    window.addEventListener("scroll", () => {
      backToTop.classList.toggle("show", window.scrollY > 300);
    });

    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // 🖼️ Thumbnails
  const thumbs = document.querySelectorAll(".thumb");
  const hero = document.querySelector(".hero");

  thumbs.forEach(thumb => {
    thumb.addEventListener("click", () => {
      if (!hero) return;

      hero.src = thumb.src;

      thumbs.forEach(t => t.classList.remove("active"));
      thumb.classList.add("active");
    });
  });

  // ✨ Fade-in
  const faders = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  });

  faders.forEach(el => observer.observe(el));

  // 📱 Mobile nav
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      navMenu.classList.toggle("show");
      menuToggle.classList.toggle("open");
    });

    document.addEventListener("click", (e) => {
      if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenu.classList.remove("show");
        menuToggle.classList.remove("open");
      }
    });

    document.querySelectorAll(".nav-item > a").forEach(item => {
      item.addEventListener("click", function (e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          this.parentElement.classList.toggle("open");
        }
      });
    });

    document.querySelectorAll(".main-nav a").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("show");
        menuToggle.classList.remove("open");
      });
    });
  }

});