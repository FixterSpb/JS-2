/**
 * Корзина
 */

class Cart{
    #list;    
    
    constructor(container = '.cart'){
        this.container = container;
        this.#list = [];
    }

    /**
    * Метод добавляет элемент в корзину
    * @param {CartItem} product 
    */
    add(product){
        this.#list.push(product)
        this.render();
   }

   /**
    * Метод удаляет элемент из корзины
    * @param {CartItem} product 
    */
   remove(product){
        let index = this.#list.indexOf(product);
        if (index >= 0){
            this.#list.slice(index, 1);
            this.render();
        }
   }

   /**
    * Метод очищает корзину
    */
   clear(){
       this.#list = [];
       this.render();
   }

   /**
    * Метод подсчитывает общую сумму товаров
    */   
   total(){
       let totalSum = 0;
       for (let product of this.#list){
            totalSum += product.sum;
       }
       return totalSum;
   }

   /**
    * Метод отрисовывает корзину товаров
    */
   render(){

   };

}