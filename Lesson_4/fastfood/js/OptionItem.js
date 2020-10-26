"use strict";

class OptionItem extends FillingItem{
    constructor(option, parentId){
        super(option, parentId);
    }

    render(checked = false){
        return `<p>
                    <input type="checkbox" id="option-${this.parentId}-${this.id}" data-price="${this.price}" data-calories="${this.calories}">
                    <label for="option-${this.parentId}-${this.id}">${this.name} (${this.price} руб. ${this.calories} ккал.)</label>
                </p>`
    }
}

