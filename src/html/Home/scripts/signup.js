function signUp(event) {
    event.preventDefault();
    let isValid = true;
  
    const inputs = document.querySelectorAll('input[required]');
  
    inputs.forEach(input => {
      const error = document.createElement('p');
      error.classList.add('error-message');
      error.textContent = `${input.previousElementSibling.textContent} is required.`;
      
      // Remove existing error messages
      const existingError = input.nextElementSibling;
      if (existingError && existingError.classList.contains('error-message')) {
        existingError.remove();
      }
  
      if (!input.value.trim()) {
        isValid = false;
        input.style.border = '2px solid red';
        input.insertAdjacentElement('afterend', error); // Show error message
      } else {
        input.style.border = '';
      }
    });
  
    if (isValid) {
      document.querySelector('form').submit();
    }
  }
  