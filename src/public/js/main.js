// import products_main from 'Products_main.js';

const appMain = {
    el: "#app",
    components: {
        products_main,
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

const app = new Vue(appMain);

// export default app;