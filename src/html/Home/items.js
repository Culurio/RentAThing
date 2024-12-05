function applyFilters(x) {
  let categoryFilter = document.getElementById('category-filter').value;
  if (x !== undefined) {
    categoryFilter = x;
    document.getElementById('category-filter').value = x;
  }
  const searchBar = document.getElementById('search-bar').value;
  const fromDate = document.getElementById('from-date').value;
  const toDate = document.getElementById('to-date').value;
  const orderBy = document.getElementById('order-by').value;

  getItems(searchBar, fromDate, toDate, categoryFilter, orderBy);
}

function getItems(searchBar, fromDate, toDate, categoryFilter, orderBy) {
  fetch('DB/products.JSON')
    .then(response => response.json())
    .then(products => {
      const productList = document.getElementById('product-list');
      productList.innerHTML = '';

      const filteredProducts = products.filter(product => {
        return (categoryFilter === 'all' || product.category.toLowerCase() === categoryFilter) &&
          (!searchBar || product.name.toLowerCase().includes(searchBar.toLowerCase())) &&
          (!fromDate || new Date(product.date) >= new Date(fromDate)) &&
          (!toDate || new Date(product.date) <= new Date(toDate));
      });

      if (orderBy === 'Price: High-Low') {
        filteredProducts.sort((a, b) => b.price - a.price);
      } else if (orderBy === 'Price: Low-High') {
        filteredProducts.sort((a, b) => a.price - b.price);
      }

      if(filteredProducts.length === 0 && categoryFilter !== 'all' && searchBar.toLowerCase() !== null) {
        const productItem = document.createElement('div');
        productItem.className = 'product-card';

        productItem.innerHTML = `
          <h2>No products found</h2>
        `;

        productList.appendChild(productItem);

      }

      filteredProducts.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product-card';

        productItem.innerHTML = `
          <img src="${product.image_url}" alt="${product.name}">
          <h2>${product.name}</h2>
          <p>${product.description}</p>
          <p>Price: $${product.price}</p>
          <button class="rent-now-btn">Rent Now</button>
        `;

        productItem.dataset.id = product.id;
        productItem.dataset.name = product.name;
        productItem.dataset.price = product.price;
        productItem.dataset.img = product.image_url;
        productItem.dataset.description = product.description;
        productItem.dataset.category = product.category;
        productItem.dataset.rating = product.rating;

        productList.appendChild(productItem);

        productItem.addEventListener('click', () => {
          const productDetails = {
            id: productItem.dataset.id,
            name: productItem.dataset.name,
            price: productItem.dataset.price,
            img: productItem.dataset.img,
            description: productItem.dataset.description,
            category: productItem.dataset.category,
            rating: productItem.dataset.rating
          };
          localStorage.setItem("productDetails", JSON.stringify(productDetails));

          window.location.href = "../Item/Item.html";
        });
      });
    })
    .catch(error => {
      console.error('Error fetching products:', error);
    });
}
