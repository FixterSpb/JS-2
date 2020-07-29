"use strict";

class FillingItem extends Item{
    constructor(filling, parentId) {
        super(filling);
        this.parentId = parentId;
    }
    render(checked = false){
        let strChecked = checked ? " checked": "";
        return `<p>
                    <input type="radio" name="filling-${this.parentId}" id="filling-${this.parentId}-${this.id}" 
                        data-id="${this.id}" data-price="${this.price}" data-calories="${this.calories}"${strChecked}>
                    <label for="filling-${this.parentId}-${this.id}">
                        ${this.name} (${this.price} руб. ${this.calories} ккал.)
                    </label>
                </p>`
    }
}