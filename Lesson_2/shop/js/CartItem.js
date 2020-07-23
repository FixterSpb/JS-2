class CartItem extends ProductItem{
    
    constructor(product, img = 'https://placehold.it/200x150', count = 1){
       super(product, img)
        this.count = count;
        this.sum = count * product.price;
    }

    render(){
        //Вероятно, необходимо переопределить метод
    }
}