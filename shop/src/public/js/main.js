import products_main from './Products_main';
import cart from './Cart';

const app = {
    el: "#app",
    components: {
        products_main,
        cart,
    },

    methods: {
        getJSON(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error)
                })
        },
    }
}

export default app;