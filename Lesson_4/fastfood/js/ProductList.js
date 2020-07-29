'use strict';

class ProductList extends List{
    constructor(container = '.products'){
        super(container, ProductItem);
        this.render();
    }

    fetchItems(){
        this.items = [
            {id: 1, name: 'Маленький гамбургер', price: 50, calories: 20},
            {id: 2, name: 'Маленький гамбургер', price: 100, calories: 40}
        ]
    }

    render(){
        for (let item of this.items){
            const itemObject = new this.itemClassName(item);
            this.allItems.push(itemObject);
            const element = document.querySelector(this.container).insertAdjacentHTML('beforeend', itemObject.render());

            itemObject.showTotal();
            itemObject.setEvent();
            //console.dir(element);
        }
    };
}