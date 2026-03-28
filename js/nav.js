document.addEventListener("DOMContentLoaded", () => {

  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav-menu");
  const overlay = document.querySelector(".nav-overlay");

  if (!nav || !toggle || !overlay) return;

  // 🔘 TOGGLE MENU
  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    nav.classList.toggle("show");
    overlay.classList.toggle("show");
  });

  // 🖱️ CLICK OUTSIDE → CLOSE NAV
  document.addEventListener("click", (e) => {
    if (!nav.classList.contains("show")) return;

    if (!e.target.closest("#nav-menu") && !e.target.closest("#menu-toggle")) {
      closeNav();
    }
  });

  // 🔳 OVERLAY CLICK
  overlay.addEventListener("click", closeNav);

  function closeNav() {
    nav.classList.remove("show");
    overlay.classList.remove("show");

    nav.querySelectorAll(".dropdown").forEach(d => {
      d.classList.remove("open");
    });
  }

  // 🔽 DROPDOWN TOGGLE (MOBILE ONLY)
  nav.querySelectorAll(".nav-item > a").forEach(item => {
    item.addEventListener("click", function (e) {

      if (window.innerWidth <= 768) {
  const dropdown = this.nextElementSibling;

  if (dropdown && dropdown.classList.contains("dropdown")) {
    e.preventDefault();

    // 🔥 CLOSE OTHER DROPDOWNS FIRST
    document.querySelectorAll(".dropdown").forEach(d => {
      if (d !== dropdown) d.classList.remove("open");
    });

    // 🔥 TOGGLE CURRENT
    dropdown.classList.toggle("open");
  }
}

    });
  });

});