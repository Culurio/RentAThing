document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('listItemForm');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); 
            addItem(); 
        });
    } else {
        console.error('Form with ID "listItemForm" not found');
    }
});

function addItem() {
    const name = document.getElementById('item_name').value;
    const brand = document.getElementById('item_brand').value;
    const category = document.getElementById('item_category').value;
    const condition = document.getElementById('item_condition').value;
    const price = document.getElementById('item_price').value;
    const description = document.getElementById('item_description').value;
    const imageInput = document.getElementById('item_photos');

    if (imageInput.files.length === 0) {
        alert("Please upload a photo of the item.");
        return;
    }

    const file = imageInput.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const image = new Image();
        image.src = event.target.result;

        image.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            const maxWidth = 800;
            const maxHeight = 800;
            let width = image.width;
            let height = image.height;

            if (width > height) {
                if (width > maxWidth) {
                    height *= maxWidth / width;
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width *= maxHeight / height;
                    height = maxHeight;
                }
            }

            canvas.width = width;
            canvas.height = height;

            ctx.drawImage(image, 0, 0, width, height);

            const compressedImage = canvas.toDataURL('image/jpeg', 0.7); 

            const item = {
                name: name,
                brand: brand,
                category: category,
                condition: condition,
                price: price,
                description: description,
                image: compressedImage 
            };

            let itemsArray = JSON.parse(localStorage.getItem('adds')) || [];

            if (!Array.isArray(itemsArray)) {
                itemsArray = [];
            }

            itemsArray.push(item);

            localStorage.setItem('adds', JSON.stringify(itemsArray));
            
            alert("Item returned successfully!");

            window.location.href = "../Home/profile.html";
        };
    };

    reader.readAsDataURL(file);
}