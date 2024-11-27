const card = document.querySelector('.card');
const container = document.querySelector('.card-container');

document.body.style.overflow = "hidden"

// Adjust the tilt effect based on touch movement
container.addEventListener('touchstart', (e) => {
  handleTouchMove(e.touches[0]); // Initialize tilt on touch
});

// Update tilt while the finger moves
container.addEventListener('touchmove', (e) => {
  handleTouchMove(e.touches[0]);
});

// Reset the tilt when the touch ends
container.addEventListener('touchend', () => {
  card.style.transform = 'rotateX(0deg) rotateY(0deg)';
});

let lastScrollY = 0;

// Funzione per disabilitare lo scroll
function disableScroll() {
  lastScrollY = window.scrollY; // Salva la posizione corrente dello scroll
  document.documentElement.style.position = 'fixed';
  document.documentElement.style.top = `-${lastScrollY}px`; // Blocca la posizione
  document.documentElement.style.width = '100%';
  document.documentElement.style.height = '100%';
}

disableScroll();

function handleTouchMove(touch) {
  const rect = container.getBoundingClientRect();
  const foilOverlay = document.querySelector('.foil-overlay');
  const x = touch.clientX - rect.left; // Touch X position relative to the container
  const y = touch.clientY - rect.top; // Touch Y position relative to the container

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX = -(y - centerY) / 10; // Negative to invert tilt direction
  const rotateY = (x - centerX) / 10;

  card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  //if (foilOverlay && xPercent && yPercent) {
   // foilOverlay.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
  //}
}

function back() {
    window.location.href = '../index.html';
}