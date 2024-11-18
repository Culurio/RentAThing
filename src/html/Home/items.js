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
  
        const filteredProducts = products.filter(product => {
            console.log("category: " + product.category)
            console.log("categoryFilter: " + categoryFilter)
          return (categoryFilter === 'all' || product.category === categoryFilter) &&
                 (!searchBar || product.name.toLowerCase().includes(searchBar.toLowerCase())) &&
                 (!fromDate || new Date(product.date) >= new Date(fromDate)) &&
                 (!toDate || new Date(product.date) <= new Date(toDate));
        });

        if (orderBy === 'Price: High-Low') {
          filteredProducts.sort((a, b) => b.price - a.price);
        } else if (orderBy === 'Price: Low-High') {
          filteredProducts.sort((a, b) => a.price - b.price);
        }
  
        filteredProducts.forEach(product => {
          const productItem = document.createElement('div');
          productItem.className = 'rental-item';
          productItem.innerHTML = `
            <img src="${product.image_url}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
          `;
          productList.appendChild(productItem);
        });
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }