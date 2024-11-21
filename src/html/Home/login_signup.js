const ACCESS_TOKEN = 'sl.CBAJnGPZSzXsO1ibhlCdI8O146VsL7-0sYOaad4Ruz5r4KjvCS7cqDW06aGAhj_-Dwk-Qu-gEoo4752GxdDVjFxSEoWs9eecRhQcQKQuFlQsaIwE1gUkhxUAZQMdrUG_XKpkAQI5QVs27Ak';

function signUp() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const birthDate = document.getElementById('birthdate').value;
    const phoneNumber = document.getElementById('phone').value;
    const citizenNumber = document.getElementById('citizen-number').value;

    const user = {
        name: name,
        email: email,
        password: password,
        birthDate: birthDate,
        phoneNumber: phoneNumber,
        citizenNumber: citizenNumber
    };

    localStorage.setItem('user', JSON.stringify(user));

    //addAccount(user);
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
