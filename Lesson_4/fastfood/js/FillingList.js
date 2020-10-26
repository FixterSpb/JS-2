"use strict";

class FillingList extends List{
    constructor(parentId, container = '.filling', itemClassName = FillingItem) {
        super(container, itemClassName);
        this.parentId = parentId;

    }

    fetchItems(){
        this.items = [
            {id: 1, name: "сыр", price: 10, calories: 20},
            {id: 2, name: "салат", price: 20, calories: 5},
            {id: 3, name: "картофель", price: 15, calories: 10}
        ]
    }

    render(){
        let result = "";
        for (let i =0; i < this.items.length; i++){
            const fillingObject = new this.itemClassName(this.items[i], this.parentId);
            this.allItems.push(fillingObject);
            result += fillingObject.render(i === 0);
        }

        return result;
    }
}
