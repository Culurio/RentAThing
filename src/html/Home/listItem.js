function addItem(){
    const name = document.getElementById('item_name').value;
    const brand = document.getElementById('item_brand').value;
    const category = document.getElementById('item_category').value;
    const condition = document.getElementById('item_condition').value;
    const price = document.getElementById('item_price').value;
    const description = document.getElementById('item_description').value;
    const image = document.getElementById('item_photos').value;

    const item = {
        name: name,
        brand: brand,
        category: category,
        condition: condition,
        price: price,
        description: description,
        image: image
    };

    if(localStorage.getItem('adds')!==null){
        const JSONArray = localStorage.getItem('item');
        JSONArray.concat(JSON.stringify(item));
        localStorage.setItem('adds', JSONArray);
    }else{
        localStorage.setItem('adds', JSON.stringify(item));
    }
}