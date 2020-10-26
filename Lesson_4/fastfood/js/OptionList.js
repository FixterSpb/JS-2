"use strict";

class OptionList extends FillingList{
    constructor(parentId, container = '.filling', itemClassName = OptionItem) {
        super(parentId, container, itemClassName);
    }

    fetchItems(){
        this.items = [
            {id: 1, name: "Маойнез", price: 10, calories: 10},
            {id: 2, name: "Кетчуп", price: 15, calories: 20},
            {id: 3, name: "Приправа", price: 5, calories: 0}
        ];
    }
}