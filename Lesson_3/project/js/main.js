const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// Переделать в ДЗ (не на fetch!!! а на Promise)
let getRequest = (url, cb) => {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status !== 200) {
        console.log('Error');
      } else {
        cb(xhr.responseText);
      }
    }
  };
  xhr.send();
};

const makeGETRequest = (url) => {
  return new Promise((resolve, reject) =>{
      let xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.responseText);
          } else {
            reject(`Error ${xhr.status} ${xhr.statusText}`);
          }
        }
      };
      xhr.send();
  });
}

class ProductList {
  constructor(cart, container = '.products') {
    this.container = container;
    this.cart = cart;
    this.goods = [];
    this.allProducts = [];
    // this.#fetchProducts();
    this.#getProducts()
        .then((data) => {
          console.log(data);
          this.goods = [...data];
          this.render();
        });
  }

  // #fetchProducts() {
  //   getRequest(`${API}/catalogData.json`, (data) => {
  //     this.goods = JSON.parse(data);
  //     console.log(this.goods);
  //     this.render();
  //   });
  // }
  // #getProducts() {
  //   return fetch(`${API}/catalogData.json`)
  //       .then(result => result.json())
  //       .catch(error => {
  //         console.log('Error!', error);
  //       });
  // }

  #getProducts() {
    return makeGETRequest(`${API}/catalogData.json`)
         .then(result => JSON.parse(result))
         .catch(error => {
           console.log('Error!', error);
         });
  }

 

  calcSum() {
    // return this.goods.reduce((sum, { price }) => sum + price, 0);
    return this.goods.reduce(function (sum, good) {
      console.log(good.price);
      return sum + good.price;
    }, 0);
  }

  // map() {
  //   return this.goods.map((good) => ({ price: good.price }));
  // }

  render() {
    const block = document.querySelector(this.container);
    for (let product of this.goods) {
      const productObject = new ProductItem(product);
      this.allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());
      this.addEventListener(product);
    }
  }

  addEventListener(product){
  const block = document.querySelector(`[data-id="${product.id_product}"]`);

  block.querySelector(`.buy-btn`).addEventListener('click', (event) => {
    this.cart.add(product);
    console.log(event);
  });
  }
}

class Item{
  constructor(product){
    this.title = product.product_name;
    this.price = product.price;
    this.id = product.id_product;
  }

  render(){}
}

class ProductItem extends Item{
  constructor(product, img = 'https://placehold.it/200x150') {
    super(product);
    this.img = img;
  }

  render() {
    return `<div class="product-item" data-id="${this.id}">
              <img src="${this.img}" alt="Some img">
              <div class="desc">
                  <h3>${this.title}</h3>
                  <p>${this.price} \u20bd</p>
                  <button class="buy-btn">Купить</button>
              </div>
          </div>`;
  }
}

/**
 * Корзина
 */

class Cart{
  #list;    
  
  constructor(container = '.cart'){
      this.container = container;
      this.#list = [];
      this.addEventListener();
      this.render();
  }

  // isIncludes(product){
  //   for (let cartProduct of this.#list){
  //     if (this.#list.id === product.id_product){
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  /**
  * Метод добавляет элемент в корзину
  * @param {CartItem} product 
  */
  add(product, count = 1){
    for (let cartProduct of this.#list){
      if (cartProduct.id === product.id_product){
        cartProduct.count += count;
        cartProduct.calcSum();
        this.render();
        return;
      }
    }

    this.#list.push(new CartItem(product));
    this.render();
 }

 /**
  * Метод удаляет элемент из корзины
  * @param {CartItem} product 
  */
 remove(product){
      let index = this.#list.indexOf(product);
      if (index >= 0){
          this.#list.splice(index, 1);
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
 render(cartProduct = null){

  const cart = document.querySelector(this.container);
  cart.textContent = "";

  if (this.#list.length === 0){
      cart.insertAdjacentHTML('beforeend', 
         '<p style="color: gray; text-align: center;">В корзине пока нет товаров</p>');
       return;
    }
 
  if (cart.querySelector('p')){
    cart.querySelector('p').remove();
  }
    
  let cartHTML = `<table>
              <tr>
                <th>ID</th>
                <th>Наименование</th>
                <th>Цена</th>
                <th>Количество</th>
                <th>Сумма</th>
              </tr>`;
  for (let product of this.#list){
    cartHTML += product.render();
  }

  cartHTML += '</table>';
  //cart.clear();
  cart.insertAdjacentHTML('beforeend', cartHTML);
 

 };

 addEventListener(){
   document.querySelector('.btn-cart').addEventListener('click', (event) => {
     const cart = document.querySelector(this.container);
     if (cart.classList.contains('hide')){
       cart.classList.remove('hide')
     }else{
       cart.classList.add('hide');
     }
   });   
 }

  getList(){
    return this.#list.map((value) => {return value});
  }

}

class CartItem extends Item{
    
  constructor(product, img = 'https://placehold.it/200x150', count = 1){
     super(product, img)
      this.count = count;
      this.sum = 0;

      this.calcSum();
  }

  calcSum(){
    this.sum = this.count * this.price;
  }

  render(){
    return `<tr data-id='${this.id}'>
              <td data-id='${this.id}' data-name='id'>${this.id}</td>
              <td data-id='${this.id}' data-name='title'>${this.title}</td>
              <td data-id='${this.id}' data-name='price'>${this.price}</td>
              <td data-id='${this.id}' data-name='count'>${this.count}</td>
              <td data-id='${this.id}' data-name='sum'>${this.sum}</td>
            </tr>`
  }
}

const cart = new Cart();
const list = new ProductList(cart);

// console.log(list.calcSum());
// console.log(list.map());
