const productItem = {
    props: ['product'],
    data() {
        return {
            star: Math.trunc(this.product.stars),
            starHalf: 10 * (this.product.stars - Math.trunc(this.product.stars)) !== 0,
            starO: Math.trunc(5 - this.product.stars),
            cartAPI: this.$root.$refs.cart,
        }
    },
    template: `<div class="product">
                    <a href="single.html" class="product_link">
                        <img :src="product.img" alt="Some img" class="product_middle_img">
                    </a>
                    <div class="product_content">
                        <a href="single.html" class="product_name_link link_hover">{{ product.name }}</a>
                        <div class="jc-sb top16">
                            <p class="product_price">&dollar; {{ product.price }}</p>
                            <p>{{product.stars}}</p>
                            <p class="stars">
                                <i class="fa fa-star" v-for="i in star"></i>
                                <i class="fa fa-star-half-o" v-if="starHalf"></i>
                                <i class="fa fa-star-o" v-for="i in starO"></i>
                            </p>
                        </div>
                    </div>
                    <div class="product_hover">
                        <a href="#" class="product_add" @click="cartAPI.addProduct(product)"><img src="img/cart_white.png" class="product_add_img"
                                                             alt="Add to cart"> Add to Cart</a>
                    </div>
                </div>`
};

const products_main = {
    components: {productItem},
    data() {
        return {
            products: [],

        };
    },

    mounted(){
        this.$parent.getJSON("/api/products_main")
            .then(data => {
                for (let item of data){
                    this.products.push(item);
                }
            })
    },

    template: ` <section class="products center">
                    <div class="products_head">
                        <h3 class="products_title">
                            Fetured Items
                        </h3>
                        <p class="products_text">
                            Shop for items based on what we featured in this week
                        </p>
                    </div>
                    <div class="product_box">
                        <productItem v-for="item of products" :key="item.id" :product="item"></productItem>
                    </div>
                </section>`
};

export default products_main;

