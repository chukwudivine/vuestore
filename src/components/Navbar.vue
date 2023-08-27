<template>



<nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
    <div class="flex flex-wrap justify-between items-center mx-auto">
    <a href="/" class="flex items-center">
        <img src="../assets/Logo.png" class="mr-3 h-10 sm:h-9" alt="Logo">
        <span class="text-orange-500 self-center text-xl font-semibold whitespace-nowrap dark:text-white">Diveck Stores</span>
    </a>

    <div class="flex">
      
      <button data-collapse-toggle="navbar-search" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false">
        <span class="sr-only">Open menu</span>
        <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
      </button>
    </div>

      <div class="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="navbar-search">
        <ul class="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li class="font-bold">
            <a href="/laptops" class="block py-2 pr-4 pl-3 text-orange-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Laptops</a>
          </li>
          <li class="font-bold">
            <a href="/phones" class="block py-2 pr-4 pl-3 text-orange-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Phones</a>
          </li>
          <li class="font-bold">
            <a href="/gadgets" class="block py-2 pr-4 pl-3 text-orange-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Gadgets</a>
          </li>
          <li class="font-bold">
            <a href="/clothes" class="block py-2 pr-4 pl-3 text-orange-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Clothes</a>
          </li>
          <li class="my-6 md:my-0" v-if="$store.state.isAuthenticated">
                <a href="/account" class="bg-orange-500 text-white rounded mt-4 mb-4 py-1.5 px-4">My Account<i class="fa fa-sign-in" aria-hidden="true"></i></a>
          </li>
          <li v-else class="my-6 md:my-0">
            <button class="bg-gray-900 text-white rounded px-4 py-1.5" data-dropdown-toggle="dropdown">
                Sign In
            </button>
        <div class="hidden bg-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow my-4" id="dropdown">
        <ul class="py-1" aria-labelledby="dropdown">
        <li>
            <a href="/sign-up" class="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Sign Up</a>
        </li>
        <li>
            <a href="/log-in" class="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Sign In</a>
        </li>
        </ul>
        </div>
          </li>
        <li class="my-6 md:my-0">
            <a href="/cart" class="bg-green-600  text-white rounded mt-4 mb-4 py-1.5 px-4">
                <span class="icon">
                    <i class="fas fa-shopping-cart"></i> ({{ cartTotalLength }})
                </span>
            </a>
          </li>
          <li>
            <form method="GET" action="/search" id="search">
              <input name="query" type="search" class="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search...">
              </form>
          
          </li>
        </ul>
      </div>
    </div>
  </nav>
  


</template>

<script>
    import { ref } from 'vue'
    import axios from 'axios'
    
    export default{
        name: 'NavBar',
    
        setup(){
            let open = ref(false)
            
            function MenuOpen() {
                open.value = !open.value
            }
    
            return{open, MenuOpen}
        },
        data() {
          return{
            cart: {
              items: []
            }
          }
        },
        beforeCreate() {
          this.$store.commit('initializeStore')
    
          const token = this.$store.state.token
          
          if (token){
            axios.defaults.headers.common['Authorization'] = "Token" + token
          } else{
            axios.defaults.headers.common['Authorization'] = ""
          }
        },
        mounted() {
          this.cart = this.$store.state.cart
        },
        computed: {
          cartTotalLength(){
            let totalLength = 0
    
            for (let i =0; i < this.cart.items.length; i++){
              totalLength += this.cart.items[i].quantity
            }
            return totalLength
          }
        }
      
    }
    
    </script>
