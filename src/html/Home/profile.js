function addInfo(){
    const info = document.getElementById('profile-text');
    
    const user = JSON.parse(localStorage.getItem('user'));
    info.innerHTML = `<h2 id="username">${user.name}</h2>
                    <p id="email">${user.email}</p>
                    <p id="phone">${user.phoneNumber}</p>
                    <p id="address">${user.birthDate}</p>`
}