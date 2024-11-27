// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
  const welcomeText = document.getElementById('welcome-text');
  const questionText = document.getElementById('question-text');
  const buttonsContainer = document.getElementById('buttons-container');
  const body = document.body;

  // Show "Benvenuto" after 1 second
  setTimeout(() => {
    welcomeText.classList.remove('hidden');
  }, 1000);

  // Show "Come ti chiami?" after 3 seconds
  setTimeout(() => {
    questionText.classList.remove('hidden');
    //questionText.style.display = 'block';
  }, 3000);

  // Show buttons one by one after 4 seconds
  const buttons = buttonsContainer.querySelectorAll('.button');
  setTimeout(() => {
    buttonsContainer.classList.remove('hidden');
    //buttonsContainer.style.display = 'block';
    buttons.forEach((button, index) => {
      setTimeout(() => {
        //button.style.display = 'block';
      }, index * 500); // Stagger each button's appearance by 500ms
    });
  }, 4000);
});

// Redirect to another page
//function goToPage(page) {
const dialogOverlay = document.getElementById('dialog-overlay');
const dialog = document.getElementById('dialog');
const openDialogBtn1 = document.getElementById('asriel');
const openDialogBtn2 = document.getElementById('auryn');
const openDialogBtn3 = document.getElementById('ravel');
const openDialogBtn4 = document.getElementById('ruben');
const cancelDialogBtn = document.getElementById('cancel-dialog');
const submitPinBtn = document.getElementById('submit-pin');

//const userPin = prompt("Inserisci il PIN per accedere:");
const correctPin = { "Asriel.html": "4567", "Auryn.html": "0606", "Ravel.html": "4690", "Ruben.html": "8995" };


// Funzione per disabilitare lo scrolling
function disableScroll() {
  document.body.classList.add('no-scroll');
  window.addEventListener('touchmove', preventDefault, { passive: false }); // Per dispositivi mobili
}

// Funzione per abilitare lo scrolling
function enableScroll() {
  document.body.classList.remove('no-scroll');
  window.removeEventListener('touchmove', preventDefault, { passive: false });
}

// Prevenzione del comportamento di default dello scroll
function preventDefault(e) {
  e.preventDefault();
}
// Chiudi la dialog
const closeDialog = () => {
  dialogOverlay.style.display = 'none';
  document.querySelectorAll('.pin-input').forEach(input => (input.value = '')); // Resetta gli input
  disableScroll();
};

// Gestisce il clic sul pulsante "Annulla"
cancelDialogBtn.addEventListener('click', closeDialog);

// Gestisce il clic fuori dalla finestra
dialogOverlay.addEventListener('click', (e) => {
  if (e.target === dialogOverlay) closeDialog();
});

var buttonSelected;
// Mostra la dialog
openDialogBtn1.addEventListener('click', () => {
  dialog.style.background = 'url("assets/img/Asriel-blur.png")'
  dialogOverlay.style.display = 'flex';
  buttonSelected = openDialogBtn1.getAttribute('data-target');
});
openDialogBtn2.addEventListener('click', () => {
  dialog.style.background = 'url("assets/img/Auryn-blur.png")'
  dialogOverlay.style.display = 'flex';
  buttonSelected = openDialogBtn2.getAttribute('data-target');
});
openDialogBtn3.addEventListener('click', () => {
  dialog.style.background = 'url("assets/img/Ravel-blur.png")'
  dialogOverlay.style.display = 'flex';
  buttonSelected = openDialogBtn3.getAttribute('data-target');
});
openDialogBtn4.addEventListener('click', () => {
  dialog.style.background = 'url("assets/img/Ruben-blur.png")'
  dialogOverlay.style.display = 'flex';
  buttonSelected = openDialogBtn4.getAttribute('data-target');
});

// Verifica il PIN
submitPinBtn.addEventListener('click', () => {
  const digit1 = document.getElementById('digit-1').value;
  const digit2 = document.getElementById('digit-2').value;
  const digit3 = document.getElementById('digit-3').value;
  const digit4 = document.getElementById('digit-4').value;

  const enteredPin = `${digit1}${digit2}${digit3}${digit4}`;
  if (enteredPin === correctPin[buttonSelected]) {
    dialogOverlay.style.display = 'none';
    disableScroll();
    // Reindirizzamento all'HTML successivo
    window.location.href = "html/"+ buttonSelected;
  } else {
    alert("PIN errato! Riprova.");
  }
});

// Gestisce la navigazione automatica tra i campi
document.querySelectorAll('.pin-input').forEach((input, index, inputs) => {
  input.addEventListener('input', () => {
    if (input.value.length === 1 && index < inputs.length - 1) {
      inputs[index + 1].focus();
    }
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === "Backspace" && input.value === "" && index > 0) {
      inputs[index - 1].focus();
    }
  });
});


//}
