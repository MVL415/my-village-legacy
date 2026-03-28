document.addEventListener("DOMContentLoaded", () => {

  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav-menu");

  if (!nav || !toggle) return;

  // 🔘 TOGGLE MENU
  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    nav.classList.toggle("show");
  });

  // 🔗 LINK CLICK → CLOSE NAV
  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("show");
    });
  });

  // ⌨️ ESC → CLOSE NAV
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      nav.classList.remove("show");
    }
  });

});

document.addEventListener("DOMContentLoaded", () => {

  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav-menu");

  if (!nav || !toggle) return;

  // 🔘 TOGGLE MENU
  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    nav.classList.toggle("show");
  });

  // 🖱️ CLICK OUTSIDE → CLOSE NAV
  document.addEventListener("click", (e) => {
    if (!nav.classList.contains("show")) return;

    // 🔥 IMPORTANT: use closest instead of contains
    if (!e.target.closest("#nav-menu") && !e.target.closest("#menu-toggle")) {
      nav.classList.remove("show");

      // close all dropdowns
      nav.querySelectorAll(".dropdown").forEach(d => {
        d.classList.remove("open");
      });
    }
  });

  // 🔗 LINK CLICK → CLOSE NAV (ONLY real links)
  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", (e) => {

      const hasDropdown = link.nextElementSibling?.classList.contains("dropdown");

      // 🔥 Don't close nav if it's a dropdown toggle
      if (hasDropdown && window.innerWidth <= 768) return;

      nav.classList.remove("show");
    });
  });

  // 🔽 DROPDOWN TOGGLE
  nav.querySelectorAll(".nav-item > a").forEach(item => {
    item.addEventListener("click", function (e) {

      if (window.innerWidth <= 768) {
        const dropdown = this.nextElementSibling;

        if (dropdown && dropdown.classList.contains("dropdown")) {
          e.preventDefault();

          // close others
          nav.querySelectorAll(".dropdown").forEach(d => {
            if (d !== dropdown) d.classList.remove("open");
          });

          dropdown.classList.toggle("open");
        }
      }

    });
  });

});