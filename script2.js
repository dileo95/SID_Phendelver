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
  function goToPage(page) {
    window.location.href = page;
  }
  