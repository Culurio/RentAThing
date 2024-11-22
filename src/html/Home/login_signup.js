const ACCESS_TOKEN = 'sl.CBAJnGPZSzXsO1ibhlCdI8O146VsL7-0sYOaad4Ruz5r4KjvCS7cqDW06aGAhj_-Dwk-Qu-gEoo4752GxdDVjFxSEoWs9eecRhQcQKQuFlQsaIwE1gUkhxUAZQMdrUG_XKpkAQI5QVs27Ak';
let users = [];


async function loadUsers() {
    const response = await fetch('./DB/accounts.JSON');
    if (response.ok) {
        users = await response.json();
        console.log("Users loaded:", users);
    } else {
        console.error("Failed to load users from accounts.json:", response.status);
    }
}
function signUp(event) {
  event.preventDefault(); 

  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirm-password');
  const birthDate = document.getElementById('birthdate');
  const phoneNumber = document.getElementById('phone');
  const citizenNumber = document.getElementById('citizen-number');

  let isValid = true;

  const fields = [name, email, password, confirmPassword, birthDate, phoneNumber, citizenNumber];
  fields.forEach(field => {
      field.style.border = '';
  });

  if (name.value.trim() === '') {
      name.style.border = '2px solid red';
      isValid = false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value.trim())) {
      email.style.border = '2px solid red';
      isValid = false;
  }

  if (password.value.trim().length < 6) {
      password.style.border = '2px solid red';
      isValid = false;
  }

  if (password.value !== confirmPassword.value) {
      confirmPassword.style.border = '2px solid red';
      isValid = false;
  }

  if (!birthDate.value) {
      birthDate.style.border = '2px solid red';
      isValid = false;
  }

  const phonePattern = /^[0-9]{9,12}$/;
  if (!phonePattern.test(phoneNumber.value.trim())) {
      phoneNumber.style.border = '2px solid red';
      isValid = false;
  }

  if (citizenNumber.value.trim() === '') {
      citizenNumber.style.border = '2px solid red';
      isValid = false;
  }

  if (isValid) {
      const user = {
          name: name.value,
          email: email.value,
          password: password.value,
          birthDate: birthDate.value,
          phoneNumber: phoneNumber.value,
          citizenNumber: citizenNumber.value,
      };

      localStorage.setItem('user', JSON.stringify(user));

      window.location.href = 'map.html';
  } else {
      alert('Please correct the highlighted fields.');
  }
}

function login() {
  const authContainer = document.getElementById('auth-container');
  const previousErrors = document.querySelectorAll('.error-message');
  previousErrors.forEach(error => error.remove());

  let isValid = true;
  const emailField = document.getElementById('email');
  const passwordField = document.getElementById('password');

  const email = emailField.value.trim(); 
  const password = passwordField.value.trim(); 

  emailField.style.border = '';
  passwordField.style.border = '';

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
      const emailError = document.createElement('p');
      emailError.className = 'error-message';
      emailError.textContent = 'Please enter a valid email address.';
      emailField.style.border = '2px solid red';
      emailField.after(emailError);
      isValid = false;
  }

  if (password.length < 6) {
      const passwordError = document.createElement('p');
      passwordError.className = 'error-message';
      passwordError.textContent = 'Password must be at least 6 characters long.';
      passwordField.style.border = '2px solid red';
      passwordField.after(passwordError);
      isValid = false;
  }

  if (isValid) {
    const user = users.find(user => user.email === email && user.password === password);
      if (user) {
          window.location.href = '../Home/map.html';
          localStorage.setItem('user', JSON.stringify(user));
      } else {
          const accountError = document.createElement('p');
          accountError.className = 'error-message';
          accountError.textContent = 'The account does not exist.';
          authContainer.appendChild(accountError);
      }
  }
}
loadUsers();
function addAccount(newAccount) {
        const filePath = '/accounts.json';
        const jsonData = JSON.stringify(newAccount)
      
        const headers = {
          'Authorization': `Bearer ${ACCESS_TOKEN}`,
          'Content-Type': 'application/octet-stream',
          'Dropbox-API-Arg': JSON.stringify({
            path: filePath,
            mode: 'overwrite',
            mute: false,
          }),
        };
      
        try {
            console.log("in")
          const response = fetch('https://content.dropboxapi.com/2/files/upload', {
            method: 'POST',
            headers: headers,
            body: jsonData,
          });
      
          if (response.ok) {
            const result = response.json();
            console.log('File uploaded successfully:', result);
          } else {
            console.error('Error uploading file:', response.status);
          }
        } catch (error) {
          console.error('Network error:', error);
        }
      
}
document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault();
  login();
});
