<template>
    <tr>
        <td><router-link :to="item.product.get_absolute_url">{{ item.product.name}}</router-link></td>
        <td class="p-2">
            <div class="text-left text-blue-500">{{ item.quantity }} &nbsp;
                <a class="text-red-500" @click="decrementQuantity(item)">-</a> &nbsp;
            <a class="text-green-500" @click="incrementQuantity(item)">+</a>
            </div>
        </td>
        <td class="p-2">
            <div class="text-left font-medium text-yellow-900">
                ${{ getItemTotal(item).toFixed(2) }}
            </div>
        </td>
        <td><div class="flex justify-center">
            <button @click="removeFromCart(item)">
                <svg class="text-red-600 w-8 h-8 hover:text-blue-600 rounded-full hover:bg-gray-100 p-1"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                    </path>
                </svg>
            </button>
            </div>
        </td>

    </tr>    
</template>

<script>
export default {
    name: 'CartItem',
    props: {
        initialItem: Object // received
    },
    data() {
        return {    
            item: this.initialItem
        }
    },
    methods: {
        getItemTotal(item) {
            return item.quantity * item.product.price
        },
        decrementQuantity(item) {
            item.quantity -= 1
            if(item.quantity === 0) {
                this.$emit('removeFromCart', item)
            }
            this.updateCart()
        },
        incrementQuantity(item) {
            item.quantity += 1

            this.updateCart()
        },
        updateCart() { // update vuex
            localStorage.setItem('cart', JSON.stringify(this.$store.state.cart))
        },
        removeFromCart(item) {
            this.$emit('removeFromCart', item) // call parent function
            this.updateCart()
        },
    }
}
</script>