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

        postJSON(url, data){
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })  .then(result => result.json())
                .catch(error => {
                    console.log(error);
            })
        },
        putJSON(url, data) {
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(result => result.json())
              .catch(error => {
                console.log(error);
            });
        },
        deleteJSON(url, data) {
            return fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(result => result.json())
                .catch(error => {
                    console.log(error);
            });
        }
    }
}

export default app;