// Menu mobile toggle
const btnMenu = document.getElementById('btn-menu');
const nav = document.getElementById('nav');

btnMenu.addEventListener('click', () => {
  nav.classList.toggle('show');
  btnMenu.classList.toggle('open');
});

// Simple scroll reveal
const revealItems = document.querySelectorAll('.section, .produto, .item, .hero-card');

function reveal() {
  const trigger = window.innerHeight * 0.85;
  revealItems.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < trigger) el.classList.add('visible');
  });
}

window.addEventListener('scroll', reveal);
window.addEventListener('load', () => {
  reveal();
  document.getElementById('ano').textContent = new Date().getFullYear();
});
