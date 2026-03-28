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

  document.addEventListener("click", (e) => {

  // 🔻 CLOSE NAV IF CLICK OUTSIDE
  if (nav.classList.contains("show")) {
    if (!e.target.closest("#nav-menu") && !e.target.closest("#menu-toggle")) {
      closeNav();
      return;
    }
  }

  // 🔻 CLOSE DROPDOWNS IF CLICK OUTSIDE NAV ITEMS
  if (!e.target.closest(".nav-item")) {
  nav.querySelectorAll(".dropdown").forEach(d => {
    d.classList.remove("open");
  });
  activeDropdown = null; // 🔥 keep state in sync
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
  let activeDropdown = null;

nav.querySelectorAll(".nav-item > a").forEach(item => {
  item.addEventListener("click", function (e) {

    if (window.innerWidth <= 768) {
      const dropdown = this.nextElementSibling;

      if (dropdown && dropdown.classList.contains("dropdown")) {
        e.preventDefault();
        e.stopPropagation();

        // 🔥 IF SAME DROPDOWN → CLOSE IT
        if (activeDropdown === dropdown) {
          dropdown.classList.remove("open");
          activeDropdown = null;
          return;
        }

        // 🔥 CLOSE ANY OPEN ONE
        nav.querySelectorAll(".dropdown").forEach(d => {
          d.classList.remove("open");
        });

        // 🔥 OPEN NEW ONE
        dropdown.classList.add("open");
        activeDropdown = dropdown;
      }
    }

  });
});
  item.addEventListener("click", function (e) {

    if (window.innerWidth <= 768) {
      const dropdown = this.nextElementSibling;

      if (dropdown && dropdown.classList.contains("dropdown")) {
        e.preventDefault();
        e.stopPropagation(); // 🔥 THIS IS THE FIX

        // close others
        nav.querySelectorAll(".dropdown").forEach(d => {
          if (d !== dropdown) d.classList.remove("open");
        });

        // toggle current
        dropdown.classList.toggle("open");
      }
    }

  });
});
});
