document.addEventListener("DOMContentLoaded", () => {
    const table = document.querySelector(".returns_table");

    // Retrieve rental items from localStorage
    const rentalItems = JSON.parse(localStorage.getItem("rentalItems")) || [];

    // Find the table's body to append rows
    const tableBody = table.querySelector("tbody") || document.createElement("tbody");

    let index = 0;
    rentalItems.forEach((item) => {
        const row = document.createElement("tr");

        // Item/Service column
        const itemCell = document.createElement("td");
        itemCell.textContent = item.productName;
        row.appendChild(itemCell);

        // Due delivery column
        const dateCell = document.createElement("td");
        // Extract only the end date from the range, or use start date if no end date exists
        const dateRange = item.rentalDateRange; // Assuming the date range is stored as "YYYY-MM-DD to YYYY-MM-DD"
        let displayDate = "";
        if (dateRange.includes(" to ")) {
            displayDate = dateRange.split(" to ")[1] || dateRange.split(" to ")[0]; // Get end date, fallback to start date
        } else {
            displayDate = dateRange; // No " to ", assume it's just the start date
        }
        dateCell.textContent = displayDate;
        row.appendChild(dateCell);

        // Return item button column
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

        // Append the row to the table body
        tableBody.appendChild(row);
        index++;
    });

    // Append the table body to the table (in case it wasn't already present)
    if (!table.querySelector("tbody")) {
        table.appendChild(tableBody);
    }
});
