/*!
* Start Bootstrap - Shop Item v5.0.6 (https://startbootstrap.com/template/shop-item)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-item/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

document.addEventListener("DOMContentLoaded", () => {
    const productDetails = JSON.parse(localStorage.getItem("productDetails"));

    if (productDetails) {
      // Populate the product details
      document.querySelector(".card-img-top").src = productDetails.img;
      document.querySelector(".display-5").textContent = productDetails.name;
      document.querySelector(".fs-5 span:last-child").textContent = productDetails.price;
      document.querySelector(".lead").textContent = `${productDetails.name} is available for rental at ${productDetails.price}.`;
    }
  });

  document.addEventListener("DOMContentLoaded", () => {

    const productGrid = document.querySelector(".product-grid");
    const template = document.getElementById("product-card-template").content;
    const products = document.querySelectorAll(".product-card[data-name]");
  
    // Populate product cards dynamically
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

    // Add event listeners to product cards
    const productCards = document.querySelectorAll(".product-card");

    productCards.forEach((card) => {
        card.addEventListener("click", () => {
            const productName = card.dataset.name;
            const productPrice = card.dataset.price;
            const productImg = card.dataset.img;

            // Store product details in localStorage
            localStorage.setItem(
                "productDetails",
                JSON.stringify({
                    name: productName,
                    price: productPrice,
                    img: productImg,
                })
            );

            // Redirect to the product details page
            window.location.href = "../Item/Item.html";
        });
    });
});
