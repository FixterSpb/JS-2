'use strict';

class ProductItem extends Item{
    constructor(product, img = 'https://placehold.it/200x150') {
        super(product);
        this.img = img;
        this.fillingList = null;
        this.optionList = null;
    }

    getTotal(){
        let total = this.price;
        let calories = this.calories;
        const productBox = document.getElementById(`product-${this.id}`);
        const additional = productBox.querySelectorAll("input");
        additional.forEach(element => {
            if (element.checked){
                total += +element.dataset["price"];
                calories += +element.dataset["calories"];
                // console.dir(element);
                // console.log(element.dataset["price"]);
            }
        })

        // console.dir(this.fillingList);
        // console.dir(this.optionList);
        console.log(`Итого: ${total}`);
        return {price: total,
                calories: calories};
    }

    showTotal(){
        document.getElementById(`product-${this.id}`).querySelector(".product__total").textContent =
            `Итого ${this.getTotal().price} руб. ${this.getTotal().calories} ккал.`;
    }

    setEvent(){
        document.querySelector(`#product-${this.id}`).addEventListener('click', event => {
            if (event.target.localName === 'input'){
                this.showTotal();
            }else if (event.target.localName === 'button'){
                this.buy();
            }
        })
    }

    buy(){

    }

    render(){
        this.fillingList = new FillingList(this.id);
        this.optionList = new OptionList(this.id);
        return `<div class="product" id="product-${this.id}">
                    <img src='${this.img}' class="product__img">
                    <h3 class="product__name">${this.name}</h3>
                    <p class="product__price">${this.price} руб.</p>
                    <p class="product__calories">${this.calories} ккал.</p>
                     <div class="filling">
                        <h4>Начинка:</h4>
                        ${this.fillingList.render()}
                    </div>
                    <div class="option">
                        <h4>Дополнительно:</h4>
                        ${this.optionList.render()}
                    </div>
                    
                    <h4 class="product__total"></h4>
                    <button class="product__btn">Купить</button>
                </div>`
    }
}