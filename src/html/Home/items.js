function getItems(){
    fetch('http://localhost:3000/api/products')
            .then(response => response.json())
            .then(products => {
                const productList = document.getElementById('product-list');
                products.forEach(product => {
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