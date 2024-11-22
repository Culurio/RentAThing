document.addEventListener("DOMContentLoaded", () => {
    const productDetails = JSON.parse(localStorage.getItem("productDetails"));

    if (productDetails) {
        document.querySelector(".card-img-top").src = productDetails.img;
        document.querySelector(".display-5").textContent = productDetails.name;
        document.querySelector(".fs-5 span:first-child").textContent = "€"+productDetails.price+".00/day";
        document.querySelector(".lead").textContent = productDetails.description;
        document.querySelector(".modal-image").src = productDetails.img;
        document.querySelector(".modal-price").textContent = "€"+productDetails.price+".00/day";
    }

    const modal = document.getElementById("myModal");
    const closeModal = document.querySelector(".close");
    const rentalForm = document.getElementById("rentalForm");

    const productName = document.querySelector(".fw-bolder").textContent;
    const productPrice = document.querySelector(".fs-5 span:last-child").textContent; 
    const productImage = document.querySelector(".card-img-top").src;

    
    const rentalDates = JSON.parse(localStorage.getItem("rentalItems")) || [];

    flatpickr("#rentalDateRange", {
        mode: "range",
        dateFormat: "Y-m-d",
        minDate: "today",
        disable: getDisabledDates(rentalDates),
        onChange: (selectedDates) => {
            if (selectedDates.length === 2) { // Ensure both start and end dates are selected
                const [startDate, endDate] = selectedDates;
                const daysCount = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1; // Calculate the number of days
                const dailyPrice = parseFloat(productDetails.price); // Parse the price as a number
                const totalPrice = dailyPrice * daysCount; // Calculate the total price
                
                document.querySelector(".modal-price").textContent = `€${totalPrice}.00/day`;
            } else {
                document.querySelector(".modal-price").textContent = `€${productDetails.price}.00/day`; // Reset to default price
            }
        },
        onDayCreate: (dObj, dStr, fp, dayElem) => {
            if (dayElem.classList.contains("flatpickr-disabled")) {
                dayElem.style.backgroundColor = "white";
                dayElem.style.borderRadius = "25%";
                dayElem.style.color = "red";
            } else {
                dayElem.style.backgroundColor = "white";
                dayElem.style.borderRadius = "25%";
                dayElem.style.color = "green";
            }
        },
    });
    
    


function getDisabledDates(rentals) {
    const disabledDates = [];
    rentals.forEach((rental) => {
        const dateRange = rental.rentalDateRange;
        let startDate, endDate;

        if (dateRange.includes(" to ")) {
            [startDate, endDate] = dateRange.split(" to "); 
        } else {
            startDate = endDate = dateRange; 
        }

        const current = new Date(startDate);
        const end = new Date(endDate);

        while (current <= end) {
            disabledDates.push(new Date(current).toISOString().split("T")[0]); 
            current.setDate(current.getDate() + 1); 
        }
    });
    return disabledDates;
}


  
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
        document.body.classList.remove('modal-open');
    });


    rentalForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const rentalDateRange = document.getElementById("rentalDateRange").value;

        if (rentalDateRange) {
            const rentalDetails = {
                productName,
                productPrice,
                productImage,
                rentalDateRange,
            };

            
            const existingRentals = JSON.parse(localStorage.getItem("rentalItems")) || [];
            existingRentals.push(rentalDetails);
            localStorage.setItem("rentalItems", JSON.stringify(existingRentals));

            modal.style.display = "none"; 
            document.body.classList.remove('modal-open');
        } else {
            alert("Please select a date range.");
        }
    });

   
    document.querySelector(".myBtn").addEventListener("click", () => {
        if(localStorage.getItem('user') !== null){
            modal.style.display = "block";
            document.body.classList.add('modal-open');
        }
        else{
            window.location.href = "../Home/login.html";
        }
    });

  
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
            document.body.classList.remove('modal-open');
        }
    });

    
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
