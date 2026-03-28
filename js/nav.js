document.addEventListener("DOMContentLoaded", () => {

  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav-menu");
  const overlay = document.querySelector(".nav-overlay");

  if (!nav || !toggle || !overlay) return;

  let activeDropdown = null;

  // 🔘 TOGGLE MENU
  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    nav.classList.toggle("show");
    overlay.classList.toggle("show");
  });

  // 🔳 OVERLAY CLICK → CLOSE NAV
  overlay.addEventListener("click", closeNav);

  function closeNav() {
    nav.classList.remove("show");
    overlay.classList.remove("show");

    nav.querySelectorAll(".dropdown").forEach(d => {
      d.classList.remove("open");
    });

    activeDropdown = null;
  }

  // 🔽 DROPDOWN TOGGLE (MOBILE ONLY)
  nav.querySelectorAll(".nav-item > a").forEach(item => {
    item.addEventListener("click", function (e) {

      if (window.innerWidth <= 768) {
        const dropdown = this.nextElementSibling;

        if (dropdown && dropdown.classList.contains("dropdown")) {
          e.preventDefault();
          e.stopPropagation();

          // SAME DROPDOWN → CLOSE
          if (activeDropdown === dropdown) {
            dropdown.classList.remove("open");
            activeDropdown = null;
            return;
          }

          // CLOSE OTHERS
          nav.querySelectorAll(".dropdown").forEach(d => {
            d.classList.remove("open");
          });

          // OPEN CURRENT
          dropdown.classList.add("open");
          activeDropdown = dropdown;
        }
      }

    });
  });

  // 🖱️ CLICK OUTSIDE
  document.addEventListener("click", (e) => {

    // CLOSE NAV
    if (nav.classList.contains("show")) {
      if (!e.target.closest("#nav-menu") && !e.target.closest("#menu-toggle")) {
        closeNav();
        return;
      }
    }

    // CLOSE DROPDOWNS ONLY
    if (!e.target.closest(".nav-item")) {
      nav.querySelectorAll(".dropdown").forEach(d => {
        d.classList.remove("open");
      });
      activeDropdown = null;
    }

  });

});