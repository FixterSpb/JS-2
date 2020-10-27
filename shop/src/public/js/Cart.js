const cartItem = {
    props: ['product'],
    data(){
        return {
            star: Math.trunc(this.product.stars),
            starHalf: 10 * (this.product.stars - Math.trunc(this.product.stars)) !== 0,
            starO: Math.trunc(5 - this.product.stars),
        }
    },

    template:
        `<div class="drop_box">
            <a href="single.html">
                <img :src="product.img" alt="product" class="product_mini_img">
            </a>
            <div class="product_cart_desc">
                <a href="single.html" class="product_cart_name_link">{{ product.name }}</a>
                <p class="stars">
                    <i class="fa fa-star" v-for="i in star"></i>
                    <i class="fa fa-star-half-o" v-if="starHalf"></i>
                    <i class="fa fa-star-o" v-for="i in starO"></i>
                <p class="cart_count"> {{ product.quantity }} X &dollar;{{ product.price }}</p>
            </div>
            <a href="#" class="cart_delete" @click.prevent="$parent.deleteProduct(product)"><i class="fa fa-times-circle"></i></a>
<!--            $emit('remove', product)-->
        </div>`
};

const cart = {
    components: {cartItem},
    data() {
        return {
            amount: 0,
            countGoods: 0,
            products: [],
        }
    },

    methods: {
        update(){
            this.$parent.getJSON("/api/cart")
                .then(data => {
                    this.amount = data.amount;
                    this.countGoods = data.countGoods;
                    this.products = [];
                    for (let item of data.products){
                        this.products.push(item);
                    }
                })
        },
        addProduct(product) {
            console.log(product);
            let find = this.products.find(el => el.id === product.id);
            if (find){
                this.$parent.putJSON(`api/cart/${find.id}`, {quantity: 1});
            }else{
                let prod = Object.assign({quantity: 1}, product);
                this.$parent.postJSON(`api/cart/`, prod);
            };
            this.update();
        },

        deleteProduct(product){
            console.log("deleteProduct");
            let find = this.products.find(el => el.id === product.id);
            if (!find){
                return;
            }
            if (product.quantity === 1){
                this.$parent.deleteJSON(`api/cart/${product.id}`, product);
            }else{
                this.$parent.putJSON(`api/cart/${product.id}`, {quantity: -1});
            }
            this.update();
        }
    },

    mounted() {
        this.update()
    },

    template:
        `<div>
        <div class="count_products" v-if="countGoods>0">
            <p>{{ countGoods }}</p>
        </div>
        <a href="shopping-cart.html" class="cart_link">
            <img src="img/cart.png" alt="cart" class="cart_img">
        </a>
       <div class="column_box drop">
            <cartItem v-for="item of products" :key="item.id" :product="item"></cartItem>
            <div class="cart_total_box">
                <h3 class="cart_total">TOTAL</h3>
                <h3 class="cart_total">&dollar;{{ amount }}</h3>
            </div>
            <button class="button_drop_cart">Checkout</button>
            <button class="button_drop_cart">Go to cart</button>
     </div>
    </div>`
};

export default cart;