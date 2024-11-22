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

function stars(x){
    for (let i = 1; i <= x; i++) {
        document.getElementById("fa fa-star " + i).style.color = "orange";
    }
    for (let i = x +1; i <= 5; i++) {
        document.getElementById("fa fa-star " + i).style.color = "black";
    }
}