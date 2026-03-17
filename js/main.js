function loadComponent(id, file) {
  fetch(file)
    .then(response => response.text())
    .then(data => {
      document.getElementById(id).innerHTML = data
    })
}

loadComponent("header", "components/header.html")
loadComponent("footer", "components/footer.html")
function loadComponent(id, file) {
  fetch(file)
    .then(res => res.text())
    .then(data => {
      document.getElementById(id).innerHTML = data

      if (id === "header") {
        setActiveLink()
      }
    })
}

function setActiveLink() {
  const links = document.querySelectorAll("nav a")

  links.forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add("active")
    }
  })
}

loadComponent("header", "components/header.html")
loadComponent("footer", "components/footer.html")