class Item {
    constructor(id, name, price, description, imageUrl, category) {
        this.id = id;
        this.name = name;
        this.price = parseFloat(price);
        this.description = description;
        this.imageUrl = imageUrl;
        this.category = category;
    }
}

export class ItemManager {
    constructor() {
        this.items = new Map();
    }

    loadItems(dataArray) {
        dataArray.forEach((item) => {
            const newItem = new Item(
                item.id,
                item.name,
                item.price,
                item.description,
                item.image_url,
                item.category
            );
            this.items.set(item.id, newItem);
        });
    }

    saveItemsToLocalStorage() {
        const serializedItems = JSON.stringify([...this.items]);
        localStorage.setItem("rentalItems", serializedItems);
    }

    loadItemsFromLocalStorage() {
        const serializedItems = localStorage.getItem("rentalItems");
        if (serializedItems) {
            const itemsArray = JSON.parse(serializedItems);
            this.items = new Map(
                itemsArray.map(([key, value]) => [key, Object.assign(new Item(), value)])
            );
        }
    }

    getAllItems() {
        return [...this.items.values()];
    }

    getItemById(id) {
        return this.items.get(id);
    }

    getRandomItems(limit = 6) {
        const allItems = this.getAllItems();
        return allItems
            .sort(() => 0.5 - Math.random())
            .slice(0, limit);
    }

}

