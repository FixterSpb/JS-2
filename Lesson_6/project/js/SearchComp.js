"use strict";

Vue.component('search', {
    data(){
        return{
            userSearch: this.$root.$refs.userSearch,
        }
    },
    methods:{

        filter(){
            this.$root.$refs.products.setUserSearch(this.userSearch);
            this.$root.$refs.products.filter();
        }
    },
    template: `
                <form action="#" class="search-form" @submit.prevent="filter">
                    <input type="text" class="search-field" v-model="userSearch">
                    <button class="btn-search" type="submit">
                        <i class="fas fa-search"></i>
                    </button>
                </form>`
})

