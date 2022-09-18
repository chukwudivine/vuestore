<template>

    <section class="antialiased bg-gray-100 text-gray-600 h-screen px-4" x-data="app">
        <div class="flex flex-col justify-center h-full">
    

    <div class="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
    <header class="px-5 py-4 border-b border-gray-100">
        <div class="font-semibold text-gray-800">Manage Carts</div>
    </header>

    <div class="overflow-x-auto p-3">
           <table class="table-auto w-full" v-if="cartTotalLength">
                    <thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                        <tr>
                            <th class="p-2"><div class="font-semibold text-left">Product</div></th>
                            <th class="p-2"><div class="font-semibold text-left">Quantity</div></th>
                            <th class="p-2"><div class="font-semibold text-left">Price</div></th>
                            <th class="p-2"><div class="font-semibold text-left">Remove</div></th>
                        </tr>
                    </thead>

                    <tbody>
                        <CartItem
                            v-for="item in cart.items"
                            v-bind:key="item.id"
                            v-bind:initialItem="item"
                            v-on:removeFromCart="removeFromCart"/> <!-- listen the method -->
                    </tbody>
                </table>

                <p v-else>You don't have any product in your cart...</p>
            </div>

            <!-- total amount -->
            <div class="flex justify-end font-bold space-x-4  border-t border-gray-100 px-5 py-4">
                <div class="text-green-00 text-2xl">Total</div>
                <div class="text-green-00 text-2xl">${{ cartTotalPrice.toFixed(0)}}, {{ cartTotalLength }} items</div>
                <hr>
                <div class="text-white">
                    <router-link to="/cart/checkout" class="bg-green-600 hover:bg-green-500 duration-300 font-sm text-white rounded py-1.5 px-4">Checkout</router-link>
                </div>
            </div>

            
        </div>

        </div>
        </section>
</template>

<script>
import axios from 'axios'
import CartItem from '@/components/CartItem.vue'

export default {
    name: 'Cart',
    components: {
        CartItem
    },
    data() {
        return {
            cart: {
                items: []
            }
        }
    },
    mounted() {
        this.cart = this.$store.state.cart
    },
    methods: {
        removeFromCart(item) {
            this.cart.items = this.cart.items.filter( i => i.product.id !== item.product.id)
        }
    },
    computed: {
        
        cartTotalLength() {
            return this.cart.items.reduce( (acc, currentValue) => {
                return acc += currentValue.quantity
            },0)
        },
        cartTotalPrice() {
            return this.cart.items.reduce((acc, currentValue) => {
                return acc += currentValue.product.price * currentValue.quantity
            }, 0)
        }

    }

}
</script>