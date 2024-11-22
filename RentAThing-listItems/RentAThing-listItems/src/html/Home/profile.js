function addInfo(){
    const info = document.getElementById('profile-text');
    
    const user = JSON.parse(localStorage.getItem('user'));
    info.innerHTML = `<h2 id="username">${user.name}</h2>
                    <p id="email">${user.email}</p>
                    <p id="phone">${user.phoneNumber}</p>
                    <p id="address">${user.birthDate}</p>`
}

document.addEventListener("DOMContentLoaded", () => {
    const productGrid = document.querySelector(".items-grid");
    const template = document.getElementById("items-card-template").content;

    const product_items = JSON.parse(localStorage.getItem('adds')) || [];
    if (!Array.isArray(product_items)) {
        console.error("product_items is not an array");
        return;
    }

    product_items.forEach((product) => {
        const clone = template.cloneNode(true);
        clone.querySelector("img").src = product.image;
        clone.querySelector("img").alt = product.name;
        clone.querySelector(".product-name").textContent = product.name;
        clone.querySelector(".product-price").textContent = `$${product.price}/day`;

        console.log(product.image);
        const card = clone.querySelector(".product-card");
        card.dataset.id = product.id;
        card.dataset.name = product.name;
        card.dataset.price = product.price;
        card.dataset.img = product.image;
        card.dataset.description = product.description;
        card.dataset.category = product.category;

        productGrid.appendChild(clone);
    });

});