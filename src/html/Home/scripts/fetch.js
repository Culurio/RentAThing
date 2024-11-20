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
        account.innerHTML = `<div class="dropdown">
                                <button type="submit" class="dropbtn" id="account-button"> 
                                    <img src="data/account.png" alt="account-button">
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

document.addEventListener("DOMContentLoaded", () => {
    fetch('../Home/DB/products.JSON')
        .then(response => response.json())
        .then(products => {
            const productGrid = document.querySelector(".product-grid");
            const template = document.getElementById("product-card-template").content;

            // Shuffle the products array and limit to 6 random items
            const getRandomProducts = (products, limit = 6) => {
                return products
                    .sort(() => 0.5 - Math.random()) // Shuffle the array
                    .slice(0, limit); // Take the first `limit` items
            };

            // Populate product cards dynamically
            const randomProducts = getRandomProducts(products, 6);

            randomProducts.forEach((product) => {
                const clone = template.cloneNode(true);
                clone.querySelector("img").src = product.image_url;
                clone.querySelector("img").alt = product.name;
                clone.querySelector(".product-name").textContent = product.name;
                clone.querySelector(".product-price").textContent = `$${product.price}/day`;

                const card = clone.querySelector(".product-card");
                card.dataset.id = product.id;
                card.dataset.name = product.name;
                card.dataset.price = product.price;
                card.dataset.img = product.image_url;
                card.dataset.description = product.description;
                card.dataset.category = product.category;

                productGrid.appendChild(clone);
            });


            // Add event listeners to product cards
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

                    // Store product details in localStorage
                    localStorage.setItem("productDetails", JSON.stringify(productDetails));

                    // Redirect to the product details page
                    window.location.href = "../Item/Item.html";
                });
            });
        })
        .catch(error => {
            console.error("Error fetching products:", error);
        });
});
