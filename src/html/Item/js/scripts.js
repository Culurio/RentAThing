// scripts.js
document.addEventListener("DOMContentLoaded", () => {
    // Load product details from localStorage
    const productDetails = JSON.parse(localStorage.getItem("productDetails"));

    if (productDetails) {
        document.querySelector(".card-img-top").src = productDetails.img;
        document.querySelector(".display-5").textContent = productDetails.name;
        document.querySelector(".fs-5 span:last-child").textContent = productDetails.price;
        document.querySelector(".lead").textContent = `${productDetails.name} is available for rental at ${productDetails.price}.`;
    }

    // Modal functionality
    const modal = document.getElementById("myModal");
    const btn = document.querySelector("button[type='button']");
    const closeBtn = document.querySelector(".modal .close");

    btn.addEventListener("click", () => {
        modal.style.display = "block";
    });

    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Load products into the grid
    const productGrid = document.querySelector(".product-grid");
    const template = document.getElementById("product-card-template").content;
    const products = document.querySelectorAll(".product-card[data-name]");

    products.forEach((product) => {
        const clone = template.cloneNode(true);
        const img = clone.querySelector("img");
        img.src = product.img;
        img.alt = product.name;
        clone.querySelector(".product-name").textContent = product.name;
        clone.querySelector(".product-price").textContent = product.price;

        const card = clone.querySelector(".product-card");
        card.dataset.name = product.name;
        card.dataset.price = product.price;
        card.dataset.img = product.img;

        productGrid.appendChild(clone);
    });

    // Add click events to product cards
    const productCards = document.querySelectorAll(".product-card");

    productCards.forEach((card) => {
        card.addEventListener("click", () => {
            const productDetails = {
                id: card.dataset.id,
                name: card.dataset.name,
                price: card.dataset.price,
                img: card.dataset.img,
                description: card.dataset.description,
                category: card.dataset.category
            };

            localStorage.setItem("productDetails", JSON.stringify(productDetails));

            window.location.href = "../Item/Item.html";
        });
    });
});
