import { ItemManager } from '../DB/Items.js';

document.addEventListener("DOMContentLoaded", () => {
    fetch('../Home/DB/products.JSON')
        .then(response => response.json())
        .then(products => {
            const productGrid = document.querySelector(".product-grid");
            const template = document.getElementById("product-card-template").content;

            const itemManager = new ItemManager();
            itemManager.loadItems(products);

            const randomProducts = itemManager.getRandomItems(6);

            randomProducts.forEach((product) => {
                const clone = template.cloneNode(true);
                clone.querySelector("img").src = product.imageUrl;
                clone.querySelector("img").alt = product.name;
                clone.querySelector(".product-name").textContent = product.name;
                clone.querySelector(".product-price").textContent = `€${product.price.toFixed(2)}/day`;

                const card = clone.querySelector(".product-card");
                card.dataset.id = product.id;
                card.dataset.name = product.name;
                card.dataset.price = product.price.toFixed(2);
                card.dataset.img = product.imageUrl;
                card.dataset.description = product.description;
                card.dataset.category = product.category;
                card.dataset.rating = product.rating;

                productGrid.appendChild(clone);
            });

            const productCards = document.querySelectorAll(".product-card");

            productCards.forEach((card) => {
                card.addEventListener("click", () => {
                    const productDetails = {
                        id: card.dataset.id,
                        name: card.dataset.name,
                        price: card.dataset.price,
                        img: card.dataset.img,
                        description: card.dataset.description,
                        category: card.dataset.category,
                        rating: card.dataset.rating
                    };

                    localStorage.setItem("productDetails", JSON.stringify(productDetails));

                    window.location.href = "../Item/Item.html";
                });
            });
        })
        .catch(error => {
            console.error("Error fetching products:", error);
        });
});
