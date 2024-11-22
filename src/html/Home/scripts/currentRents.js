document.addEventListener("DOMContentLoaded", () => {
    const table = document.querySelector(".returns_table");

    const rentalItems = JSON.parse(localStorage.getItem("rentalItems")) || [];

    const tableBody = table.querySelector("tbody") || document.createElement("tbody");

    let index = 0;
    rentalItems.forEach((item) => {
        const row = document.createElement("tr");

        const itemCell = document.createElement("td");
        itemCell.textContent = item.productName;
        row.appendChild(itemCell);

        const dateCell = document.createElement("td");
       
        const dateRange = item.rentalDateRange
        let displayDate = "";
        if (dateRange.includes(" to ")) {
            displayDate = dateRange.split(" to ")[1] || dateRange.split(" to ")[0];
        } else {
            displayDate = dateRange;
        }
        dateCell.textContent = displayDate;
        row.appendChild(dateCell);

        const actionCell = document.createElement("td");
        const returnButton = document.createElement("button");
        returnButton.textContent = "Return item";
        returnButton.classList.add("returnItem-btn");
        returnButton.addEventListener("click", () => {
            localStorage.setItem('item_to_remove', JSON.stringify(item));
            window.location.href = "returnItem.html";
        });

        actionCell.appendChild(returnButton);
        row.appendChild(actionCell);

        tableBody.appendChild(row);
        index++;
    });

    if (!table.querySelector("tbody")) {
        table.appendChild(tableBody);
    }

    const searchInput = document.getElementById("search-bar");
    searchInput.addEventListener("input", function() {
        const search = searchInput.value.toLowerCase();
        const rows = tableBody.querySelectorAll("tr");
        rows.forEach(row => {
            const itemName = row.querySelector("td").textContent.toLowerCase();
            if (itemName.includes(search)) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    });
});
