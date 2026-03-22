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
    review: "Nipsey Hussle mentioned reading this book which influenced my decision to read it. It’s a powerful story that explores themes of racial tension, social justice, and the fight for equality. It’s a frustrating reminder of the ongoing struggle for civil rights and the importance of standing up against oppression specifically from within.",
    question: "💬 Being such a short read, were you left wanting more? Or did you feel like Greenlee wrapped it up perfectly? What do you think the story would look like if it were set in today’s world?"
  }
 
];

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
  modal.style.display = "flex";

  document.getElementById("modal-title").innerText = book.title;
  document.getElementById("modal-author").innerText = book.author;
  document.getElementById("modal-img").src = book.img;
  document.getElementById("modal-review").innerText = book.review;
  document.getElementById("modal-question").innerText = book.question;

  trackBookView(book.id);

  // 👇 LOAD COMMENTS PER BOOK
  loadComments(book.id);
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

document.getElementById("book-modal").addEventListener("click", function(e) {
  if (e.target.id === "book-modal") {
    closeBookModal();
  }
});

document.addEventListener("DOMContentLoaded", function () {

  const read = 8;
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
  const read = 8;
  const goal = 40;
  const percent = (read / goal) * 100;

  const percentText = document.getElementById("progress-percent");

  if (percentText) {
    percentText.innerText = Math.round(percent) + "%";
  }
});

const db = firebase.firestore();

function postComment() {
  const input = document.getElementById("comment-input");
  const user = firebase.auth().currentUser;

  console.log("USER:", user);

  if (!user) {
    alert("Please log in to comment");
    return;
  }

  if (!input.value.trim()) return;

 db.collection("comments").add({
  text: input.value,
  user: user.email,
  bookId: books[currentIndex].id,
  likes: 0,
  createdAt: firebase.firestore.FieldValue.serverTimestamp()
});

  input.value = "";
  console.log("Posting comment for:", books[currentIndex].id);
}

function loadComments(bookId, sort = "new") {
  const container = document.getElementById("comments-list");
  container.innerHTML = "Loading...";

  let query = db.collection("comments")
    .where("bookId", "==", bookId);

  query = sort === "top"
    ? query.orderBy("likes", "desc")
    : query.orderBy("createdAt", "desc");

  query.onSnapshot(snapshot => {

    const comments = [];
    snapshot.forEach(doc => {
      comments.push({ id: doc.id, ...doc.data() });
    });

    // separate parent + replies
    const parents = comments.filter(c => !c.parentId);
    const replies = comments.filter(c => c.parentId);

    container.innerHTML = "";

    parents.forEach(c => {

      const childReplies = replies.filter(r => r.parentId === c.id);

      container.innerHTML += `
        <div class="comment">
          
          <div class="avatar">${c.displayName.charAt(0).toUpperCase()}</div>

          <div class="comment-content">
            
            <div class="comment-header">
              <strong>${c.displayName}</strong>
            </div>

            <div class="comment-text">${c.text}</div>

            <div class="comment-actions">
              <span onclick="likeComment('${c.id}', ${JSON.stringify(c.likedBy || [])})">
                ❤️ ${c.likes || 0}
              </span>
              · <span onclick="replyToComment('${c.id}')">Reply</span>
              · <span onclick="editComment('${c.id}', \`${c.text}\`)">Edit</span>
              · <span onclick="deleteComment('${c.id}')">Delete</span>
            </div>

            <div class="replies">
              ${childReplies.map(r => `
                <div class="comment reply">
                  <div class="avatar">${r.displayName.charAt(0).toUpperCase()}</div>
                  <div class="comment-content">
                    <strong>${r.displayName}</strong>
                    <div>${r.text}</div>
                  </div>
                </div>
              `).join("")}
            </div>

          </div>
        </div>
      `;
    });

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

function replyToComment(parentId) {
  const text = prompt("Write your reply:");

  const user = firebase.auth().currentUser;
  if (!user || !text) return;

  db.collection("comments").add({
    text,
    user: user.email,
    displayName: user.email.split("@")[0],
    bookId: books[currentIndex].id,
    likes: 0,
    likedBy: [],
    parentId: parentId, // 👈 attaches reply
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
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
