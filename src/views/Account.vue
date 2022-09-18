<template>
    <div>

        <div class="container text-center">
            <h2 class="font-bold text-gray-900 text-4xl mb-10 mt-10">My Account</h2>
        </div>

            <div class="container text-center">
                <button @click="logout()" class="bg-gray-900 mx-4 text-white rounded mt-4 mb-4 py-1.5 px-4">Log out</button>
            </div>
    
    </div>
</template>


<script>
import axios from 'axios';


export default{
    name: 'Account',
    methods: {
        logout(){
            axios.defaults.headers.common["Authorization"] = ""

            localStorage.removeItem("token")
            localStorage.removeItem("username")
            localStorage.removeItem("userid")
            
            this.$store.commit('removeToken')
            this.$router.push('/')
        }
    }
}


</script>