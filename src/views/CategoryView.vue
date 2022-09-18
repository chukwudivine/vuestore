<template>
    <div>
        <div class="container text-center">
            <h2 class="font-bold text-gray-900 text-4xl mb-10 mt-10">{{category.name}}</h2>
        </div>

        <div class="container">
            <div class="grid md:grid-cols-4 gap-4 mb-20">
        
            <div class="max-w-sm rounded overflow-hidden shadow-lg" v-for="product in category.products" v-bind:key="product.id" v-bind:product="product">
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
import { toast } from 'bulma-toast';

export default{
    name: 'Category',
    data(){
        return{
            category:{
                products: []
            }
        }
    },
    mounted(){
        this.getCategory()
    },
    watch:{
        $route(to, from){
            if (to.name === 'category'){
                this.getCategory()
            }
        }
    },
    methods:{
        async getCategory(){
            const categorySlug = this.$route.params.category_slug
            this.$store.commit('setIsLoading', true)

            await axios.get(`api/products/${categorySlug}/`)
            .then(res => {
                this.category = res.data
                document.title = this.category.name + ' | Diveck Stores'
            })
            .catch(error => {
                toast({
                message: 'Something went wrong please try again',
                type: 'is-danger',
                dismissible: true,
                pauseOnHover: true,
                duration: 2000,
                position: 'bottom-right',
            })
            })

            this.$store.commit('setIsLoading', false)
        }
    }
}


</script>