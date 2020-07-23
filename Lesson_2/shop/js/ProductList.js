class ProductList {
    #privateProp;
  
    constructor(container = '.products') {
      this.container = container;
      this.goods = [];
      this.allProducts = [];
      this.#privateProp = '123';
  
      this.#fetchProducts();
      this.render();
    }
  
    get prop() {
      return this.#privateProp;
    }
  
    set prop(value) {
      this.#privateProp = value;
    }
  
    #fetchProducts() {
      this.goods = [
        {id: 1, title: 'Notebook', price: 20000},
        {id: 2, title: 'Mouse', price: 1500},
        {id: 3, title: 'Keyboard', price: 5000},
        {id: 4, title: 'Gamepad', price: 4500},
      ];
    }
  
    render() {
      const block = document.querySelector(this.container);
  
      for (let product of this.goods) {
        const productObject = new ProductItem(product);
  
        this.allProducts.push(productObject);
        block.insertAdjacentHTML('beforeend', productObject.render());
      }
    }

    goodsList(){
        let total = 0;
        for (let item of this.goods){
            total += item.price;
        }

        return total;
    }
  }