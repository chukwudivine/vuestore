import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './assets/tailwind.css'

axios.defaults.baseURL = 'https://vine.pythonanywhere.com/'

createApp(App).use(store).use(router, axios).mount('#app')
