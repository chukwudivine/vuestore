<template>

    <!-- component -->
<div class="leading-loose">
    <form class="max-w-xl m-4 p-10 bg-white rounded shadow-xl">
      <p class="text-gray-800 font-medium">Customer information</p>
      <div class="">
        <label class="block text-sm text-gray-00" for="cus_name">First name</label>
        <input v-model="first_name" class="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" id="cus_name" type="text" required="" placeholder="first name" aria-label="Name">
      </div>
      <div class="">
        <label class="block text-sm text-gray-00" for="cus_name">Last name</label>
        <input v-model="last_name" class="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" id="cus_name" type="text" required="" placeholder="last name" aria-label="Name">
      </div>
      
      <div class="mt-2">
        <label class="block text-sm text-gray-600" for="cus_email">Email</label>
        <input v-model="email" class="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded" id="cus_email" name="cus_email" type="text" required="" placeholder="Your Email" aria-label="Email">
      </div>
      <div class="mt-2">
        <label class=" block text-sm text-gray-600" for="cus_email">Address</label>
        <input v-model="address" class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded" id="cus_email" name="cus_email" type="text" required="" placeholder="Street" aria-label="Email">
      </div>
      <div class="mt-2">
        <label class="hidden text-sm block text-gray-600" for="cus_email">City</label>
        <input v-model="place" class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded" id="cus_email" name="cus_email" type="text" required="" placeholder="City" aria-label="Email">
      </div>
      <div class="inline-block mt-2 -mx-1 pl-1 w-1/2">
        <label class="hidden block text-sm text-gray-600" for="cus_email">Zip</label>
        <input v-model="zipcode" class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded" id="cus_email"  name="cus_email" type="text" required="" placeholder="Zip" aria-label="Email">
      </div>
      <p class="mt-4 text-gray-800 font-medium">Payment information</p>
      <div class="">
        <label class="block text-sm text-gray-600" for="cus_name">Card</label>
        <input class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded" id="cus_name" name="cus_name" type="text" required="" placeholder="Card Number MM/YY CVC" aria-label="Name">
      </div>
      <div class="mt-4">
        <button @click="submitForm" class="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded" type="submit">Proceed</button>
      </div>
    </form>
  </div>
<div class="container text-center">
    <p class="text-red-500 font-bold text-3xl">Payment not implimented yet!</p>
</div>


</template>
