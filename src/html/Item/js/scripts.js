document.addEventListener("DOMContentLoaded", () => {
    // Load product details from localStorage
    const productDetails = JSON.parse(localStorage.getItem("productDetails"));

    if (productDetails) {
        document.querySelector(".card-img-top").src = productDetails.img;
        document.querySelector(".display-5").textContent = productDetails.name;
        document.querySelector(".fs-5 span:last-child").textContent = productDetails.price;
        document.querySelector(".lead").textContent = `${productDetails.name} is available for rental at ${productDetails.price}.`;
    }

    // Modal and form logic
    const modal = document.getElementById("myModal");
    const closeModal = document.querySelector(".close");
    const rentalForm = document.getElementById("rentalForm");

    // Product details (example: these would come dynamically in real scenarios)
    const productName = document.querySelector(".fw-bolder").textContent; // Get product name
    const productPrice = document.querySelector(".fs-5 span:last-child").textContent; // Get product price
    const productImage = document.querySelector(".card-img-top").src; // Get product image

    // Fetch rental dates from localStorage
    const rentalDates = JSON.parse(localStorage.getItem("rentalItems")) || [];

    flatpickr("#rentalDateRange", {
        mode: "range", // Enables range selection
        dateFormat: "Y-m-d", // Format of the date
        minDate: "today", // Optional: prevent past dates
        disable: getDisabledDates(rentalDates), // Fetch dates that should be disabled
        onDayCreate: (dObj, dStr, fp, dayElem) => {
            // Check if the day is disabled
            if (dayElem.classList.contains("flatpickr-disabled")) {
                dayElem.style.backgroundColor = "red"; // Make disabled dates red
                dayElem.style.borderRadius = "50%"; // Optional: make it look nicer
                dayElem.style.color = "white"; // Optional: make text stand out
            } else {
                dayElem.style.backgroundColor = "lightgreen"; // Make available dates green
                dayElem.style.borderRadius = "50%"; // Optional: make it look nicer
            }
        },
    });
    

// Function to extract disabled dates from rental items
function getDisabledDates(rentals) {
    const disabledDates = [];
    rentals.forEach((rental) => {
        const dateRange = rental.rentalDateRange;
        let startDate, endDate;

        if (dateRange.includes(" to ")) {
            [startDate, endDate] = dateRange.split(" to "); // Split into start and end dates
        } else {
            startDate = endDate = dateRange; // Single day case
        }

        const current = new Date(startDate);
        const end = new Date(endDate);

        while (current <= end) {
            disabledDates.push(new Date(current).toISOString().split("T")[0]); // Format date
            current.setDate(current.getDate() + 1); // Increment by one day
        }
    });
    return disabledDates;
}


    // Close the modal
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Submit form logic
    rentalForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent form default submission behavior
        const rentalDateRange = document.getElementById("rentalDateRange").value;

        if (rentalDateRange) {
            const rentalDetails = {
                productName,
                productPrice,
                productImage,
                rentalDateRange,
            };

            // Save to localStorage
            const existingRentals = JSON.parse(localStorage.getItem("rentalItems")) || [];
            existingRentals.push(rentalDetails);
            localStorage.setItem("rentalItems", JSON.stringify(existingRentals));

            alert("Rental date range and item saved successfully!");
            modal.style.display = "none"; // Close the modal
        } else {
            alert("Please select a date range.");
        }
    });

    // Open modal logic (if needed for your button)
    document.querySelector(".myBtn").addEventListener("click", () => {
        modal.style.display = "block";
    });

    // Close modal on clicking outside
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
                category: card.dataset.category,
            };

            localStorage.setItem("productDetails", JSON.stringify(productDetails));

            window.location.href = "../Item/Item.html";
        });
    });
});
