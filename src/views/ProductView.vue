<template>


    <!-- component -->
<section class="text-gray-700 body-font overflow-hidden bg-white">
    <div class="container px-5 py-24 mx-auto">
      <div class="lg:w-4/5 mx-auto flex flex-wrap">
        <img class="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" v-bind:src="product.get_image">
        <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
          <h2 class="text-4xl title-font text-gray-900 tracking-widest">{{product.name}}</h2>
          <p class="text-gray-500">{{product.description}}</p>
          <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
            <div class="flex ml-6 items-center">
              <span class="mr-3">Quantity</span>
              <div class="relative">
                <span class="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4" viewBox="0 0 24 24">
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
                <input type="Number" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" min="1" v-model="quantity">
              </div>
            </div>
          </div>
          <div class="flex">
            <span class="title-font font-medium text-2xl text-gray-900">${{product.price}}</span>
            <button @click="addToCart" class="flex ml-auto text-white bg-green-500 border-0 py-2 px-6 focus:outline-none rounded">Add to cart</button>
            </div>
        </div>
      </div>
    </div>
  </section>

</template>

<script>
import axios from 'axios';
import { toast } from 'bulma-toast';

    export default {
        name: 'Product',
        data() {
            return{
                product: {},
                quantity: 1
            }
        },
        mounted() {
            this.getProduct()
        },
        methods:{
            async getProduct() {
                this.$store.commit('setIsLoading', true)


                const category_slug = this.$route.params.category_slug
                const product_slug = this.$route.params.product_slug

                await axios.get(`/api/products/${category_slug}/${product_slug}/`)
                .then(response => {
                    this.product = response.data

                    document.title = this.product.name + ' | Diveck Stores'
                })
                .catch(error => {
                    alert(error)
                })
                
                this.$store.commit('setIsLoading', false)
            },
            addToCart(){
                if (isNaN(this.quantity) || this.quantity < 1){
                    this.quantity = 1
                }
            const item = {
                product: this.product,
                quantity: this.quantity
            }
            this.$store.commit('addToCart', item)
            toast({
                message: 'The product was added to cart',
                type: 'is-success',
                dismissible: true,
                pauseOnHover: true,
                duration: 2000,
                position: 'bottom-right',
            })
            }
        }
    }
</script>