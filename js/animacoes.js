// Animações de scroll
const elementos = document.querySelectorAll('.fade-in, .fade-up');

function animarScroll() {
  const gatilho = window.innerHeight * 0.85;

  elementos.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < gatilho) {
      el.classList.add("show");
    }
  });
}

window.addEventListener("scroll", animarScroll);
window.addEventListener("load", animarScroll);
