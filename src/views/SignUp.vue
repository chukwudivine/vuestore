<template>



    <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Create an account
                    </h1>
                    <form @submit.prevent="submitForm" class="space-y-4 md:space-y-6">
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                            <input type="text"  v-model="username" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter username" required="">
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password"  v-model="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                        </div>
                        <div>
                            <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                            <input type="password" v-model="password2" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                        </div>
                        <div class="bg-red-600 rounded text-center" v-if="errors.length">
                            <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                        </div>
                        <button type="submit" class="w-full text-white bg-green-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                            Already have an account? <a href="/log-in" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
      </section>
</template>


<script>
import axios from 'axios';
import { toast } from 'bulma-toast';

export default{
    name: 'SignUp',
    data() {
        return{
            username: '',
            password: '',
            password2: '',
            errors: []
        }
    },
    mounted(){
        document.title = 'Sign up | Diveck Stores'
    },
    methods:{
        submitForm() {
            this.errors = []

            if (this.password !== this.password2){
                this.errors.push('The password doesn\'t match')
            }
            if (this.password.length < 8){
                this.errors.push('The password is too short')
            }

            if (!this.errors.length) {
                const formData = {
                    username: this.username,
                    password: this.password
                }

                axios.post('/api/users/', formData)
                .then(res => {
                    toast({
                        message: 'Account created please log in',
                        type: 'is-success',
                        dismissible: true,
                        pauseOnHover: true,
                        duration: 2000,
                        position: 'bottom-right',
                    })

                    this.$router.push('/log-in')
                })
                .catch(error => {
                    if(error.res){
                        for (const property in error.res.data){
                            this.errors.push(`${property}: ${error.res.data[property]}`)
                        }

                        console.log(JSON.stringify(error.res.data))
                    }else if(error.message){
                        this.errors.push('Something went wrong. Please try again')

                        console.log(JSON.stringify(error))
                    }
                })
            }
        }
    }
}

</script>
