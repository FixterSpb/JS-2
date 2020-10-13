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
            <a href="#" class="cart_delete" @click="$emit('remove', cartItem)"><i class="fa fa-times-circle"></i></a>
        </div>`
};

const cart = {
    components: {cartItem},
    data() {
        return {
            products: [],
        }
    },

    mounted() {
        this.$parent.getJSON("/api/cart")
            .then(data => {
                for (let item of data){
                    this.products.push(item);
                }
            })
    },

    template:
        `<div class="column_box drop">
            <cartItem v-for="item of products" :key="item.id" :product="item"></cartItem>
            <div class="cart_total_box">
                <h3 class="cart_total">TOTAL</h3>
                <h3 class="cart_total">$500.00</h3>
            </div>
            <a href="#" class="button_drop_cart">Checkout</a>
            <a href="#" class="button_drop_cart">Go to cart</a>
         </div>`
};

export default cart;