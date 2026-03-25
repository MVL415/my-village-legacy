document.addEventListener("DOMContentLoaded", () => {

  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (!menuToggle || !navMenu) return;

  // 🍔 TOGGLE MOBILE MENU
  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    navMenu.classList.toggle("show");
    menuToggle.classList.toggle("open");
  });

  // ❌ CLOSE MENU WHEN CLICKING OUTSIDE
  document.addEventListener("click", (e) => {
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      navMenu.classList.remove("show");
      menuToggle.classList.remove("open");
    }
  });

  // 📂 MOBILE DROPDOWN (CLICK TO OPEN)
  document.querySelectorAll(".nav-item > a").forEach(link => {
    link.addEventListener("click", function (e) {

      // ONLY on mobile
      if (window.innerWidth <= 768) {
        const parent = this.parentElement;

        // toggle open class (CSS handles display)
        parent.classList.toggle("open");

        e.preventDefault();
      }

    });
  });

  // 🔗 CLOSE MENU WHEN CLICKING A LINK
  document.querySelectorAll(".main-nav a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("show");
      menuToggle.classList.remove("open");
    });
  });

});