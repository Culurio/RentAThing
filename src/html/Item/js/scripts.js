document.addEventListener("DOMContentLoaded", () => {
    const productDetails = JSON.parse(localStorage.getItem("productDetails"));

    if (productDetails) {
        document.querySelector(".card-img-top").src = productDetails.img;

        // Add stars for the rating
        const stars = generateStars(productDetails.rating);
        document.querySelector(".display-5").innerHTML = `${productDetails.name} ${stars}`; // Update title with stars

        document.querySelector(".fs-5 span:first-child").textContent = "€" + productDetails.price + ".00/day";
        document.querySelector(".lead").textContent = productDetails.description;
        document.querySelector(".modal-image").src = productDetails.img;
        document.querySelector(".modal-price").textContent = "€" + productDetails.price + ".00/day";
    }

    // Helper function to generate stars based on the rating
    function generateStars(rating) {
        const filledStars = '<i class="bi bi-star-fill" style="color: #4b3621;"></i>'.repeat(rating); // Filled stars
        const emptyStars = '<i class="bi bi-star" style="color: gray;"></i>'.repeat(5 - rating); // Empty stars
        return filledStars + emptyStars;
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
            if (selectedDates.length === 2) {
                const [startDate, endDate] = selectedDates;
                const daysCount = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
                const dailyPrice = parseFloat(productDetails.price);
                const totalPrice = dailyPrice * daysCount;

                document.querySelector(".modal-price").textContent = `€${totalPrice}.00/day`;
            } else {
                document.querySelector(".modal-price").textContent = `€${productDetails.price}.00/day`;
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
        if (localStorage.getItem('user') !== null) {
            modal.style.display = "block";
            document.body.classList.add('modal-open');
        } else {
            window.location.href = "../Home/login.html";
        }
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
            document.body.classList.remove('modal-open');
        }
    });
});
