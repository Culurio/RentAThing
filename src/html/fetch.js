function loadHeader() {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
        })
        .catch(error => console.error('Error loading header:', error));
}

function loadFooter() {
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
}

document.addEventListener("DOMContentLoaded", () => {
    const template = document.getElementById("product-card-template");
    const productGrid = document.querySelector(".product-grid");
    const products = document.querySelectorAll(".product-card[data-name]");

    products.forEach(product => {
        const clone = template.content.cloneNode(true);
        const img = clone.querySelector("img");
        const title = clone.querySelector("h4");
        const price = clone.querySelector("p");

        img.src = product.dataset.img;
        img.alt = product.dataset.name;
        title.textContent = product.dataset.name;
        price.textContent = product.dataset.price;

        product.replaceWith(clone);
    });
});
