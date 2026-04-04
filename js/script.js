let activeListeners = {};

const db = firebase.firestore();

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
    review: "Twists, tension, and drama—keeps you guessing the whole way.",
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
    review: "More psychological than horror—obsession, identity, and transformation.",
    question: "💬 Was Christine evil… or a reflection of Arnie?"
  },
  {
    id: "spook",
    title: "The Spook Who Sat by the Door",
    author: "Sam Greenlee",
    img: "images/book8.jpg",
    review: "Nipsey Hussle mentioned reading this book which influenced my decision to read it. It’s a powerful story that explores themes of racial tension, social justice, and the fight for equality.",
    question: "💬 Being such a short read, were you left wanting more? Or did you feel like Greenlee wrapped it up perfectly? What do you think the story would look like if it were set in today’s world?"
  },
  {
    id: "blue",
    title: "Blue Sisters",
    author: "Coco Mellors",
    img: "images/book9.jpg",
    review: "This one was a tough read for me. It's a raw and emotional story about family, addiction, and the complexities of relationships. Ultimately, it fell a little flat for me, but I can see how it would resonate with others who have experienced similar struggles.",
    question: "💬 Is it difficult for you to get into a book if you don't really relate to the main characters?"
  },
  {
    id: "creative",
    title: "Your Creative Career: Turn Your Passion into a Fulfilling and Financially Rewarding Lifestyle",
    author: "Anna Sabino",
    img: "images/book11.jpg",
    review: "Some parts of this book resonated with me more than others but overall I found it to be helpful and thought provoking. F.O.C.U.S. aka 'follow one course until successful' is a mantra I'll be taking with me.",
    question: "💬 Do you consider yourself to be a creative and if so does your current career path align with your creativity?"
  },
  
  {
    id: "genius",
    title: "Black Genius: Essays on an American Legacy",
    author: "Tre Johnson",
    img: "images/book10.jpg",
    review: "In progress read...",
    question: "💬 Who or what comes to mind when you hear the term 'Black Genius'?"
  }
  
 
];


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
  modal.style.display = "flex";

  // ✅ NEW CORRECT TARGETS
  document.getElementById("modalTitle").innerText = book.title;
  document.getElementById("modalAuthor").innerText = book.author;
  document.getElementById("modalImage").src = book.img;

  // ✅ THIS is the fix you asked about
  document.getElementById("modalText").innerHTML = `
    <p>${book.review}</p>
    <p class="question">${book.question}</p>
  `;

  trackBookView(book.id);

  setTimeout(() => {
    loadComments(`book-${book.id}`);
  }, 50);
}



function closeBookModal() {
  document.getElementById("book-modal").style.display = "none";

  const context = `book-${books[currentIndex].id}`;

  if (activeListeners[context]) {
    activeListeners[context]();
    delete activeListeners[context];
  }
}

function nextBook() {
  currentIndex = (currentIndex + 1) % books.length;
  openBookByIndex(currentIndex);
}

function prevBook() {
  currentIndex = (currentIndex - 1 + books.length) % books.length;
  openBookByIndex(currentIndex);
}

document.addEventListener("DOMContentLoaded", function () {

  const modal = document.getElementById("book-modal");

  if (!modal) return;

  let startX = 0;

  modal.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });

  modal.addEventListener("touchend", e => {
    let endX = e.changedTouches[0].clientX;

    if (startX - endX > 50) nextBook();
    if (endX - startX > 50) prevBook();
  });

  modal.addEventListener("mousedown", e => {
    startX = e.clientX;
  });

  modal.addEventListener("mouseup", e => {
    let endX = e.clientX;

    if (startX - endX > 50) nextBook();
    if (endX - startX > 50) prevBook();
  });

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

document.addEventListener("DOMContentLoaded", function () {
  const modalEl = document.getElementById("book-modal");

  if (modalEl) {
    modalEl.addEventListener("click", function(e) {
      if (e.target.id === "book-modal") {
        closeBookModal();
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {

  const read = 10;
  const goal = 40;

  const percent = (read / goal) * 100;

  const bar = document.getElementById("progress-fill");

  if (bar) {
    setTimeout(() => {
      bar.style.width = percent + "%";
    }, 300); // slight delay for smooth animation
  }

});

document.addEventListener("DOMContentLoaded", function () {
  const read = 10;
  const goal = 40;
  const percent = (read / goal) * 100;

  const percentText = document.getElementById("progress-percent");

  if (percentText) {
    percentText.innerText = Math.round(percent) + "%";
  }
});

async function postComment(context) {

  const user = firebase.auth().currentUser;
  if (!user) return alert("Login required");

  const input =
    context === "community"
      ? document.getElementById("community-input")
      : document.getElementById("book-input");

  if (!input || !input.value.trim()) return;

  let name = user.email.split("@")[0];
  let photo = "";

  try {
    const doc = await db.collection("users").doc(user.uid).get();
    const profile = doc.data() || {};

    name = profile.displayName || name;
    photo = profile.photoURL || "";
  } catch {}

  await db.collection("comments").add({
    text: input.value,
    userId: user.uid,
    displayName: name,
    photoURL: photo,
    context: context,
    likes: 0,
    likedBy: [],
    parentId: null,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });

  input.value = "";
}

function loadComments(context, sort = "new") {

  // ✅ FIXED CONTAINER LOGIC
  let container = null;

  if (context === "community") {
    container = document.getElementById("community-list");
  } else if (context.startsWith("book-")) {
    container = document.getElementById("book-list");
  }

if (!container) return;

  container.innerHTML = "Loading...";

    // 🧹 Clean up existing listener for this context
if (activeListeners[context]) {
  activeListeners[context](); // unsubscribe
}

  let query = db.collection("comments")
    .where("context", "==", context);

  query = sort === "top"
    ? query.orderBy("likes", "desc")
    : query.orderBy("createdAt", "desc");

  activeListeners[context] = query.onSnapshot(snapshot => {

    const comments = [];
    snapshot.forEach(doc => {
      comments.push({ id: doc.id, ...doc.data() });
    });

    const parents = comments.filter(c => !c.parentId);
    const replies = comments.filter(c => c.parentId);

    container.innerHTML = "";

    parents.forEach(c => {

      const name = c.displayName || "User";

      const avatar = c.photoURL
        ? `<img src="${c.photoURL}" class="avatar-img">`
        : `<div class="avatar">${name.charAt(0).toUpperCase()}</div>`;

      const childReplies = replies.filter(r => r.parentId === c.id);

      container.innerHTML += `
        <div class="comment">

          <div onclick="openProfile('${c.userId}')">
            ${avatar}
          </div>

          <div class="comment-content">
            
            <div class="comment-header">
              <strong>${name}</strong>
            </div>

            <div class="comment-text">${c.text || ""}</div>

            <div class="comment-actions">
              <span onclick="likeComment('${c.id}', ${JSON.stringify(c.likedBy || [])})">
                ❤️ ${c.likes || 0}
              </span>
              · <span onclick="replyToComment('${c.id}', '${context}')">Reply</span>
              · <span onclick="editComment('${c.id}', \`${c.text || ""}\`)">Edit</span>
              · <span onclick="deleteComment('${c.id}')">Delete</span>
            </div>

            <div class="replies">
              ${childReplies.map(r => {
                const rName = r.displayName || "User";
                const rAvatar = r.photoURL
                  ? `<img src="${r.photoURL}" class="avatar-img">`
                  : `<div class="avatar">${rName.charAt(0).toUpperCase()}</div>`;

                return `
                  <div class="comment reply">
                    ${rAvatar}
                    <div class="comment-content">
                      <strong>${rName}</strong>
                      <div>${r.text || ""}</div>
                    </div>
                  </div>
                `;
              }).join("")}
            </div>

          </div>
        </div>
      `;
    });

  });
}

function replyToComment(parentId, context) {
  const text = prompt("Write your reply:");
  const user = firebase.auth().currentUser;

  if (!user || !text) return;

  db.collection("comments").add({
    text,
    userId: user.uid,
    displayName: user.email.split("@")[0],
    context: context, // 🔥 IMPORTANT
    parentId: parentId,
    likes: 0,
    likedBy: [],
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });
}

function likeComment(commentId, likedBy = []) {
  const user = firebase.auth().currentUser;
  if (!user) return alert("Login to like");

  const ref = db.collection("comments").doc(commentId);

  if (likedBy.includes(user.uid)) return; // already liked

  ref.update({
    likes: firebase.firestore.FieldValue.increment(1),
    likedBy: firebase.firestore.FieldValue.arrayUnion(user.uid)
  });
}



function editComment(id, oldText) {
  const newText = prompt("Edit your comment:", oldText);
  if (!newText) return;

  db.collection("comments").doc(id).update({
    text: newText
  });
}

function deleteComment(id) {
  if (!confirm("Delete this comment?")) return;

  db.collection("comments").doc(id).delete();
}



document.addEventListener("DOMContentLoaded", () => {
  loadComments("community");
});

function likeCommunityComment(commentId, likedBy = []) {
  const user = firebase.auth().currentUser;
  if (!user) return alert("Login to like");

  if (likedBy.includes(user.uid)) return;

  db.collection("communityComments").doc(commentId).update({
    likes: firebase.firestore.FieldValue.increment(1),
    likedBy: firebase.firestore.FieldValue.arrayUnion(user.uid)
  });
}


function editCommunityComment(id, oldText) {
  const newText = prompt("Edit your comment:", oldText);
  if (!newText) return;

  db.collection("communityComments").doc(id).update({
    text: newText
  });
}

function deleteCommunityComment(id) {
  if (!confirm("Delete this comment?")) return;

  db.collection("communityComments").doc(id).delete();
}

async function openProfile(userId) {

  const modal = document.getElementById("profile-modal");
  const view = document.getElementById("profile-view");
  const edit = document.getElementById("profile-edit");

  edit.style.display = "none";

  // 👇 fallback to current user if no ID passed
  const currentUser = firebase.auth().currentUser;
  const uid = userId || currentUser?.uid;

  if (!uid) {
    alert("Not logged in");
    return;
  }

  const doc = await db.collection("users").doc(uid).get();
  const user = doc.data() || {};

  const name = user.displayName || user.email?.split("@")[0] || "User";

  const avatar = user.photoURL
    ? `<img src="${user.photoURL}" class="profile-avatar">`
    : `<div class="profile-avatar avatar">${name.charAt(0).toUpperCase()}</div>`;

  view.innerHTML = `
    ${avatar}
    <div class="profile-name">${name}</div>
    <p>${user.email || ""}</p>

    ${currentUser && currentUser.uid === uid
      ? `<button class="profile-btn" onclick="editProfile()">Edit Profile</button>`
      : ""
    }
  `;

  modal.style.display = "flex";

  console.log("Current:", currentUser?.uid);
  console.log("Profile:", uid);
}

function closeProfile() {
  document.getElementById("profile-modal").style.display = "none";
}

async function editProfile() {

  const user = firebase.auth().currentUser;
  const doc = await db.collection("users").doc(user.uid).get();
  const profile = doc.data() || {};

  document.getElementById("edit-name").value = profile.displayName || "";
  document.getElementById("edit-photo-file").addEventListener("change", function(e) {
  const file = e.target.files[0];
  if (!file) return;

  const preview = document.getElementById("profile-preview");
  preview.src = URL.createObjectURL(file);
  preview.style.display = "block";
});
  document.getElementById("profile-view").style.display = "none";
  document.getElementById("profile-edit").style.display = "block";
}

function cancelEdit() {
  document.getElementById("profile-view").style.display = "block";
  document.getElementById("profile-edit").style.display = "none";
}

async function saveProfile(button) {
  const user = firebase.auth().currentUser;
  if (!user) return;

  const name = document.getElementById("edit-name").value;
  const file = document.getElementById("edit-photo-file").files[0];

  // 👇 UI feedback START
  button.innerText = "Saving...";
  button.disabled = true;

  let photoURL = "";

  if (file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "profile_upload");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dhyhrbgaz/image/upload",
      {
        method: "POST",
        body: formData
      }
    );

    const data = await res.json();
    photoURL = data.secure_url;
  }

  await db.collection("users").doc(user.uid).set({
    displayName: name,
    photoURL: photoURL || "",
    email: user.email
  }, { merge: true });

  // 👇 UI feedback RESET
  button.innerText = "Save";
  button.disabled = false;

  closeProfile();


  // 🔥 refresh auth UI instantly
  firebase.auth().onAuthStateChanged(user => {});
}

window.openProfile = openProfile;
window.addEventListener("beforeunload", () => {
  Object.values(activeListeners).forEach(unsub => unsub());
});

window.addEventListener("load", () => {
  if (window.location.hash === "#community-discussion") {
    const input = document.getElementById("community-input");
    if (input) input.focus();
  }
});

const backToTop = document.getElementById("backToTop");

if (backToTop) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

const thumbs = document.querySelectorAll(".thumb");
const heroImg = document.querySelector(".hero");

if (thumbs.length && heroImg) {
  thumbs.forEach(img => {
    img.addEventListener("click", () => {

      heroImg.src = img.src;

      thumbs.forEach(t => t.classList.remove("active"));
      img.classList.add("active");

    });
  });
}

const faders = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
});

faders.forEach(el => observer.observe(el));

const scrollContainer = document.getElementById("journeyScroll");

const leftBtn = document.querySelector(".scroll-btn.left");
const rightBtn = document.querySelector(".scroll-btn.right");

if (scrollContainer && leftBtn && rightBtn) {
  leftBtn.addEventListener("click", () => {
    scrollContainer.scrollBy({
      left: -300,
      behavior: "smooth"
    });
  });

  rightBtn.addEventListener("click", () => {
    scrollContainer.scrollBy({
      left: 300,
      behavior: "smooth"
    });
  });
}

let currentIndex = 0;
let galleryImages = [];

document.addEventListener("DOMContentLoaded", () => {
  galleryImages = Array.from(document.querySelectorAll(".gallery img"));

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  const prevBtn = document.querySelector(".lightbox-btn.prev");
  const nextBtn = document.querySelector(".lightbox-btn.next");

  if (!lightbox || !lightboxImg || !prevBtn || !nextBtn) return;

  // 🔓 OPEN
  window.openLightbox = function(img){
    currentIndex = galleryImages.indexOf(img);
    lightbox.classList.add("show");
    updateImage();
  }

  // 🔒 CLOSE
  window.closeLightbox = function(){
    lightbox.classList.remove("show");
  }

  function updateImage(){
    lightboxImg.src = galleryImages[currentIndex].src;
  }

  // ⬅️ PREV
  function showPrev(){
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    updateImage();
  }

  // ➡️ NEXT
  function showNext(){
    currentIndex = (currentIndex + 1) % galleryImages.length;
    updateImage();
  }

  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    showPrev();
  });

  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    showNext();
  });

  // 🖱️ CLICK OUTSIDE CLOSE
  lightbox.addEventListener("click", () => {
    closeLightbox();
  });

  // ⌨️ KEYBOARD (desktop bonus)
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("show")) return;

    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "Escape") closeLightbox();
  });

  // 👆 SWIPE (mobile)
  let startX = 0;

  lightbox.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  lightbox.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;
    let diff = startX - endX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        showNext(); // swipe left
      } else {
        showPrev(); // swipe right
      }
    }
  });

});

document.addEventListener("DOMContentLoaded", () => {

  const scroll = document.querySelector(".magazine-scroll");
  let spreads = document.querySelectorAll(".magazine .spread");

  const prevDesktop = document.querySelector(".mag-btn.prev");
  const nextDesktop = document.querySelector(".mag-btn.next");

  const prevMobile = document.querySelector(".mag-mobile-btn.prev");
  const nextMobile = document.querySelector(".mag-mobile-btn.next");

  if (!scroll || !spreads.length) return;

  let current = 0;

  if (window.innerWidth <= 768) {
  const newSlides = [];

  spreads.forEach(spread => {
    const pages = spread.querySelectorAll(".zoom-wrapper");

    if (pages.length > 1) {
      pages.forEach(page => {
        const slide = document.createElement("div");
        slide.className = "spread";
        slide.appendChild(page.cloneNode(true));
        newSlides.push(slide);
      });
    } else {
      newSlides.push(spread);
    }
  });

  scroll.innerHTML = "";
  newSlides.forEach(s => scroll.appendChild(s));
}

spreads = scroll.querySelectorAll(".spread");

  const isMobile = window.innerWidth <= 768;

  // ======================
  // 📱 MOBILE (SCROLL BASED)
  // ======================
  if (isMobile) {

    function goTo(index) {
      if (index < 0 || index >= spreads.length) return;

      current = index;

      scroll.scrollTo({
        left: index * scroll.clientWidth,
        behavior: "smooth"
      });
    }

    nextMobile?.addEventListener("click", () => goTo(current + 1));
    prevMobile?.addEventListener("click", () => goTo(current - 1));

    scroll.addEventListener("scroll", () => {
      current = Math.round(scroll.scrollLeft / scroll.clientWidth);
    });

  }

  // ======================
  // 💻 DESKTOP (CLASS BASED)
  // ======================
  else {

    function update() {
      spreads.forEach((s, i) => {
        s.classList.toggle("active", i === current);
      });
    }

    nextDesktop?.addEventListener("click", () => {
      if (current < spreads.length - 1) {
        current++;
        update();
      }
    });

    prevDesktop?.addEventListener("click", () => {
      if (current > 0) {
        current--;
        update();
      }
    });

    update();
  }

});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".zoom-wrapper img").forEach(img => {

    let scale = 1;
    let isDragging = false;
    let startX, startY, translateX = 0, translateY = 0;

    img.addEventListener("click", () => {
      if (scale === 1) {
        scale = 2;
        img.style.transform = `scale(${scale})`;
      } else {
        scale = 1;
        translateX = 0;
        translateY = 0;
        img.style.transform = `scale(1) translate(0,0)`;
      }
    });

    img.addEventListener("touchstart", (e) => {
      if (scale === 1) return;

      isDragging = true;
      startX = e.touches[0].clientX - translateX;
      startY = e.touches[0].clientY - translateY;
    });

   img.addEventListener("touchmove", (e) => {
  if (scale === 1) return; // ✅ allow normal swipe

  e.preventDefault(); // only block when zoomed

  translateX = e.touches[0].clientX - startX;
  translateY = e.touches[0].clientY - startY;

  img.style.transform =
    `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
});

    img.addEventListener("touchend", () => {
      isDragging = false;
    });

  });
});

document.addEventListener("DOMContentLoaded", () => {

  const scroll = document.querySelector(".magazine-scroll");
  if (!scroll) return;

  const hintSpreads = scroll.querySelectorAll(".spread");

  const hasSwiped = localStorage.getItem("magSwipeHint");

  if (hasSwiped) {
    hintSpreads.forEach(s => s.classList.add("hide-hint"));
    return;
  }

  let startX = 0;

  scroll.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  scroll.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;

    if (Math.abs(startX - endX) > 30) {
      localStorage.setItem("magSwipeHint", "true");
      hintSpreads.forEach(s => s.classList.add("hide-hint"));
    }
  });

  setTimeout(() => {
    hintSpreads.forEach(s => s.classList.add("hide-hint"));
  }, 2500);

});

