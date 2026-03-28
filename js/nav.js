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

    if (!nav.contains(e.target) && !toggle.contains(e.target)) {
      nav.classList.remove("show");

      // ALSO close all dropdowns
      nav.querySelectorAll(".dropdown").forEach(d => {
        d.style.display = "none";
      });
    }
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

  // 🔽 MOBILE DROPDOWN TOGGLE
  nav.querySelectorAll(".nav-item > a").forEach(item => {
    item.addEventListener("click", function (e) {

      if (window.innerWidth <= 768) {
        const dropdown = this.nextElementSibling;

        if (dropdown && dropdown.classList.contains("dropdown")) {
          e.preventDefault();

          // close others first (premium behavior)
          nav.querySelectorAll(".dropdown").forEach(d => {
            if (d !== dropdown) d.style.display = "none";
          });

          dropdown.style.display =
            dropdown.style.display === "block" ? "none" : "block";
        }
      }

    });
  });

});