const ACCESS_TOKEN = 'sl.CBAJnGPZSzXsO1ibhlCdI8O146VsL7-0sYOaad4Ruz5r4KjvCS7cqDW06aGAhj_-Dwk-Qu-gEoo4752GxdDVjFxSEoWs9eecRhQcQKQuFlQsaIwE1gUkhxUAZQMdrUG_XKpkAQI5QVs27Ak';

function signUp(event) {
  event.preventDefault(); // Prevent form submission to validate fields

  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirm-password');
  const birthDate = document.getElementById('birthdate');
  const phoneNumber = document.getElementById('phone');
  const citizenNumber = document.getElementById('citizen-number');

  let isValid = true;

  // Reset error styles
  const fields = [name, email, password, confirmPassword, birthDate, phoneNumber, citizenNumber];
  fields.forEach(field => {
      field.style.border = ''; // Reset border style
  });

  // Validate Full Name
  if (name.value.trim() === '') {
      name.style.border = '2px solid red';
      isValid = false;
  }

  // Validate Email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value.trim())) {
      email.style.border = '2px solid red';
      isValid = false;
  }

  // Validate Password
  if (password.value.trim().length < 6) {
      password.style.border = '2px solid red';
      isValid = false;
  }

  // Validate Confirm Password
  if (password.value !== confirmPassword.value) {
      confirmPassword.style.border = '2px solid red';
      isValid = false;
  }

  // Validate Birth Date
  if (!birthDate.value) {
      birthDate.style.border = '2px solid red';
      isValid = false;
  }

  // Validate Phone Number
  const phonePattern = /^[0-9]{9,12}$/;
  if (!phonePattern.test(phoneNumber.value.trim())) {
      phoneNumber.style.border = '2px solid red';
      isValid = false;
  }

  // Validate Citizen Number
  if (citizenNumber.value.trim() === '') {
      citizenNumber.style.border = '2px solid red';
      isValid = false;
  }

  // If all fields are valid, proceed
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

      // Redirect to the next page
      window.location.href = 'map.html';
  } else {
      alert('Please correct the highlighted fields.');
  }
}

function login(){
  if(localStorage.getItem('user') !== null){
    window.location.href = '../Home/map.html';
  }else{
    const LOGIN = document.getElementById('auth-container');
    const errorMessage = document.createElement('p');
    errorMessage.className = 'error-message';
    errorMessage.textContent = 'The account does not exist.';
    LOGIN.appendChild(errorMessage);
  }
}

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
