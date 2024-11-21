function returnItem(){
    const rentalItems = JSON.parse(localStorage.getItem("rentalItems")) || [];
    const itemIndex = parseInt(localStorage.getItem('item_to_remove'), 10);

    console.log(rentalItems);
    const updatedItems = rentalItems.splice(1,1);

    console.log(itemIndex);
    console.log(updatedItems);
    

    localStorage.setItem("rentalItems", JSON.stringify(updatedItems));

    /* window.location.href = "myCurrentRents.html"; */
}