import { parse } from '@vue/compiler-dom'
import { createStore } from 'vuex'

export default createStore({
  state: {
    cart: {
      items: [],
    },
    isAuthenticated: false,
    token: '',
    isLoading: false
  },
  getters: {
  },
  mutations: {
    initializeStore(state) {
      if (localStorage.getItem('cart')){
        state.cart = JSON.parse(localStorage.getItem('cart'))
      } else {
        localStorage.setItem('cart', JSON.stringify(state.cart))
      }

      if (localStorage.getItem('token')) {
        state.token = localStorage.getItem('token')
        state.isAuthenticated =true
      } else {
        state.token = ''
        state.isAuthenticated = false
      }
    },
    addToCart(state, item) {
      const exist = state.cart.items.filter(i => i.product.id === item.product.id)
      if (exist.length) {
        exist[0].quatity = parseInt(exist[0].quatity) + parseInt(item.quatity)
      } else {
        state.cart.items.push(item)
      }
      localStorage.setItem('cart',JSON.stringify(state.cart))
    },
    setIsLoading(state, status) {
      state.isLoading = status
    },
    setToken(state, token){
      state.token = token
      state.isAuthenticated = true
    },
    removeToken(state, token){
      state.token = token
      state.isAuthenticated = false
    },
    clearCart(state){
      state.cart = { items: [] }

      localStorage.setItem('cart', JSON.stringify(state.cart))
    }


  },
  actions: {
  },
  modules: {
  }
})
