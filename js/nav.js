document.addEventListener("DOMContentLoaded", function () {

  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav-menu");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }

});

document.querySelectorAll(".nav-item > a").forEach(item => {
  item.addEventListener("click", function (e) {
    const dropdown = this.nextElementSibling;

    if (dropdown && dropdown.classList.contains("dropdown")) {
      e.preventDefault();
      dropdown.style.display =
        dropdown.style.display === "block" ? "none" : "block";
    }
  });
});