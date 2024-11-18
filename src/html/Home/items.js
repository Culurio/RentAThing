function applyFilters() {
  const searchBar = document.getElementById('search-bar').value;
  const fromDate = document.getElementById('from-date').value;
  const toDate = document.getElementById('to-date').value;
  const categoryFilter = document.getElementById('category-filter').value;
  const orderBy = document.getElementById('order-by').value;

  getItems(searchBar, fromDate, toDate, categoryFilter, orderBy);
}

function getItems(searchBar, fromDate, toDate, categoryFilter, orderBy) {
  fetch('DB/products.JSON')
    .then(response => response.json())
    .then(products => {
      const productList = document.getElementById('product-list');
      productList.innerHTML = '';

      // Filter products based on input criteria
      const filteredProducts = products.filter(product => {
        return (categoryFilter === 'all' || product.category === categoryFilter) &&
          (!searchBar || product.name.toLowerCase().includes(searchBar.toLowerCase())) &&
          (!fromDate || new Date(product.date) >= new Date(fromDate)) &&
          (!toDate || new Date(product.date) <= new Date(toDate));
      });

      // Sort products if necessary
      if (orderBy === 'Price: High-Low') {
        filteredProducts.sort((a, b) => b.price - a.price);
      } else if (orderBy === 'Price: Low-High') {
        filteredProducts.sort((a, b) => a.price - b.price);
      }

      // Populate the product list
      filteredProducts.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'rental-item';

        // Add product details to the HTML
        productItem.innerHTML = `
          <img src="${product.image_url}" alt="${product.name}">
          <h2>${product.name}</h2>
          <p>${product.description}</p>
          <p>Price: $${product.price}</p>
          <button class="view-item-button">View Item</button>
        `;

        // Add dataset attributes for easy access
        productItem.dataset.id = product.id;
        productItem.dataset.name = product.name;
        productItem.dataset.price = product.price;
        productItem.dataset.img = product.image_url;
        productItem.dataset.description = product.description;
        productItem.dataset.category = product.category;

        // Append the item to the product list
        productList.appendChild(productItem);

        // Add click event listener
        productItem.querySelector('.view-item-button').addEventListener('click', () => {
          const productDetails = {
            id: productItem.dataset.id,
            name: productItem.dataset.name,
            price: productItem.dataset.price,
            img: productItem.dataset.img,
            description: productItem.dataset.description,
            category: productItem.dataset.category
          };

          // Store product details in localStorage
          localStorage.setItem("productDetails", JSON.stringify(productDetails));

          // Redirect to the product details page
          window.location.href = "../Item/Item.html";
        });
      });
    })
    .catch(error => {
      console.error('Error fetching products:', error);
    });
}
