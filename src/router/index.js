import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import Product from '../views/ProductView.vue'
import Category from '../views/CategoryView.vue'
import Search from '../views/SearchView.vue'
import Cart from '../views/Cart.vue'
import SignUp from '../views/SignUp.vue'
import LogIn from '../views/LogIn.vue'
import Account from '../views/Account'
import store from '@/store'
import Checkout from '../views/CheckOut.vue'
import Success from '../views/Success.vue'



const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/:category_slug/:product_slug',
    name: 'product',
    component: Product
  },
  {
    path: '/:category_slug/',
    name: 'category',
    component: Category
  },
  {
    path: '/search',
    name: 'search',
    component: Search
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart
  },
  {
    path: '/sign-up',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/log-in',
    name: 'login',
    component: LogIn
  },
  {
    path: '/cart/checkout',
    name: 'Checkout',
    component: Checkout,
    meta:{
      requireLogin: true
    }
  },
  {
    path: '/cart/success',
    name: 'success',
    component: Success
  },
  {
    path: '/account',
    name: 'account',
    component: Account,
    meta:{
      requireLogin: true
    }
  },




]







const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) =>{
  if(to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated){
    next({name: 'LogIn', query: { to: to.path }});
  }else {
    next()
  }
})
export default router
