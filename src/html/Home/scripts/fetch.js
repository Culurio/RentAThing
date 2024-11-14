function loadHeader() {
    fetch('../Home/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
        })
        .catch(error => console.error('Error loading header:', error));
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
    const products = [
      {
        name: "Projector",
        price: "From $20/day",
        img: "https://cdn.mos.cms.futurecdn.net/Hb4raDbPaBqWa3ex3KgudU.jpg",
      },
      {
        name: "Camping Tent",
        price: "From $15/day",
        img: "https://product-cdn-frz.alltricks.com/hd/717/198717/2198717/4270592",
      },
      {
        name: "Castle",
        price: "From $10/day",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRP8_i9Vna6zuWqT4ARVjjHNCS7N2auw1-8A&s",
      },
      {
        name: "Sound System",
        price: "From $25/day",
        img: "https://images.51microshop.com/7863/product/20230919/pro_210_double_10_inch_line_array_sound_system__1695091292899_0.jpg",
      },
      {
        name: "Car",
        price: "From $30/day",
        img: "https://ireland.apollo.olxcdn.com/v1/files/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmbiI6IjV1NDFyMXVtcjRsdC1TVERWVExQVCJ9.CC7Z5XWC5Ae4j4GcxDiRzNeFZT1wy4XOhjzSaMuas5E/image;s=1440x0;q=100",
      },
      {
        name: "Clown",
        price: "From $30/day",
        img: "https://media.istockphoto.com/id/533837393/pt/foto/palha%C3%A7o.jpg?s=170667a&w=is&k=20&c=znRbggWZEjrlo4eclMTh_Ag9kx_PziGQgD2rn-knEGs=",
      },
    ];
  
    const productGrid = document.querySelector(".product-grid");
    const template = document.getElementById("product-card-template").content;
  
    // Populate product cards dynamically
    products.forEach((product) => {
      const clone = template.cloneNode(true);
      clone.querySelector("img").src = product.img;
      clone.querySelector("img").alt = product.name;
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
  