function returnItem(){
    const rentalItems = JSON.parse(localStorage.getItem("rentalItems")) || [];
    const item = JSON.parse(localStorage.getItem("item_to_remove"));

    const updatedItems = rentalItems.filter(
        (rental) => rental.productName !== item.productName || rental.rentalDateRange !== item.rentalDateRange
    );
    
    localStorage.setItem("rentalItems", JSON.stringify(updatedItems));
    alert(`${item.productName} has been marked as returned.`);
    window.location.href = "myCurrentRents.html";
}