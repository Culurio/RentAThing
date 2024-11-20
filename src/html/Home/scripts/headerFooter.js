function loadHeader() {
    fetch('../Home/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
            account();
        })
        .catch(error => console.error('Error loading header:', error));
}

function isLoggedIn() {
    return localStorage.getItem('user') !== null;
}

function account() {
    const account = document.getElementById('auth-links');
    if (isLoggedIn()) {
        account.innerHTML = `<button type="submit" onclick="logout()" class="account-button" id="account-button"> 
        <img src="data/account.png" alt="account-button">
      </button>`;
    } else {
        account.innerHTML = `<a href="../Home/login.html">Login</a> | 
        <a href="../Home/signup.html">Sign Up</a>`;
    }
}

function logout() {
    localStorage.removeItem('user');
    loadHeader();
}

function loadFooter() {
    fetch('../Home/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
}