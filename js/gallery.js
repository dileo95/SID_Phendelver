// Seleziona elementi necessari
const galleryImages = document.querySelectorAll('.gallery-image');
const overlay = document.getElementById('imageOverlay');
const overlayImage = document.getElementById('overlayImage');

// Apri l'overlay al click su un'immagine
galleryImages.forEach((image) => {
  image.addEventListener('click', () => {
    overlayImage.src = image.src;
    overlay.classList.remove('hidden');
  });
});

// Chiudi l'overlay al click al di fuori dell'immagine
overlay.addEventListener('click', (e) => {
  if (e.target === overlay) {
    overlay.classList.add('hidden');
    overlayImage.src = '';
  }
});

// Pinch-to-zoom e drag
let scale = 1;
let originX = 0;
let originY = 0;
let startX = 0;
let startY = 0;

overlayImage.addEventListener('wheel', (e) => {
  e.preventDefault();
  const delta = Math.sign(e.deltaY) * -0.1;
  scale = Math.min(Math.max(1, scale + delta), 3); // Zoom massimo 3x
  overlayImage.style.transform = `scale(${scale})`;
});

overlayImage.addEventListener('mousedown', (e) => {
  e.preventDefault();
  startX = e.clientX - originX;
  startY = e.clientY - originY;
  overlayImage.style.cursor = 'grabbing';

  const onMouseMove = (event) => {
    originX = event.clientX - startX;
    originY = event.clientY - startY;
    overlayImage.style.transform = `scale(${scale}) translate(${originX}px, ${originY}px)`;
  };

  const onMouseUp = () => {
    overlayImage.style.cursor = 'grab';
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  };

  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
});

// Pinch-to-zoom per dispositivi touch
overlayImage.addEventListener('touchstart', (e) => {
  if (e.touches.length === 2) {
    const touch1 = e.touches[0];
    const touch2 = e.touches[1];
    const distance = Math.hypot(
      touch2.pageX - touch1.pageX,
      touch2.pageY - touch1.pageY
    );

    const onTouchMove = (event) => {
      if (event.touches.length === 2) {
        const touch1 = event.touches[0];
        const touch2 = event.touches[1];
        const newDistance = Math.hypot(
          touch2.pageX - touch1.pageX,
          touch2.pageY - touch1.pageY
        );
        scale = Math.min(Math.max(1, scale * (newDistance / distance)), 3);
        overlayImage.style.transform = `scale(${scale}) translate(${originX}px, ${originY}px)`;
      }
    };

    const onTouchEnd = () => {
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };

    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);
  }
});
