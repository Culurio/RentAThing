function loadHeader() {
    fetch('../Home/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
            account();
            rent();
        })
        .catch(error => console.error('Error loading header:', error));
}

function isLoggedIn() {
    return localStorage.getItem('user') !== null;
}

function account() {
    const account = document.getElementById('auth-links');
    if (isLoggedIn()) {
        account.innerHTML = `<div class="dropdown">
                                <button type="submit" class="dropbtn" id="account-button"> 
                                    <img src="../Home/data/account.png" alt="account-button">
                                </button>
                                <div class="dropdown-content">
                                    <a href="../Home/profile.html">Profile</a>
                                    <a href="#">Settings</a>
                                    <a class="logout-button" href="#" onclick="logout()">Logout</a>
                                </div>
                            </div>`;
    }else {
        account.innerHTML = `<a href="../Home/login.html">Login</a> | 
        <a href="../Home/signup.html">Sign Up</a>`;
    }
}

function logout() {
    localStorage.clear();
    window.location.href = '../Home/ipmwebsite.html';
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

function rent() {
    const rents = document.getElementById('rents');
    if (isLoggedIn()) {
        const myCurrentRents = document.createElement('li');
        const listItem = document.createElement('li');
        
        myCurrentRents.innerHTML = '<a href="../Home/myCurrentRents.html"> My Current Rents</a>';
        listItem.innerHTML = '<a href="../Home/listItem.html"> List Item +</a>';
        
        rents.appendChild(myCurrentRents);
        rents.appendChild(listItem);
    }
}