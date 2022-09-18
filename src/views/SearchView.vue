<template>
    <div>

  <div class="container text-center">
    <h1 class="font-bold text-4xl text-gray-900 mb-10 mt-10">Search</h1>
    <h2 class=" text-2xl text-gray-900 mb-10 mt-10">Search term "{{query}}"</h2>
</div>


    <div class="container">
        <div class="grid md:grid-cols-4 gap-4 mb-20">
    
        <div class="max-w-sm rounded overflow-hidden shadow-lg" v-for="product in products" v-bind:key="product.id" v-bind:product="product">
          <img class="w-full" v-bind:src="product.get_thumbnail">
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">{{product.name}}</div>
            <p class="text-gray-700 mb-2 text-base">${{product.price}}</p>
            <router-link v-bind:to="product.get_absolute_url" class="bg-gray-900 hover:bg-gray-500 font-sm text-white rounded mt-4 mb-4 py-1.5 px-4">
              View details
            </router-link>
          </div>
        </div>  
      </div>
      
    </div>  
    </div>
</template>

<script>
import axios from 'axios';
export default{
    name: 'Search',
    data(){
        return {
            products: [],
            query: ''
        }
    },
    mounted(){
        document.title = 'Search | Diveck Stores'

        let url = window.location.search.substring(1)
        let params = new URLSearchParams(url)

        if (params.get('query')) {
            this.query = params.get('query')

            this.performSearch()
        }
    },
    methods:{
        async performSearch(){
            this.$store.commit('setLoading', true)

            await axios.post('api/products/search/', {'query':this.query})
            .then(res => {
                this.products = res.data
            })
            .catch(error => {
              console.log('error')
            })

            this.$store.commit('setLoading', false)
        }
    }
}

</script>