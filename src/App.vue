<template>
  <div class="">

    <div class="container mt-4 mb-4 rounded">
      <img data-src="https://ng.jumia.is/cms/0-5-brand-festival/2022/1brand-days/sept-17-bacardi/Bacardi-top-strip.gif" src="https://ng.jumia.is/cms/0-5-brand-festival/2022/1brand-days/sept-17-bacardi/Bacardi-top-strip.gif" class="_ni" alt="Desktop Top Strip Bacardi (ADS_BAC)">
    </div>
  

    <header class="sticky top-0 z-50">
      <NavBar />
    </header>
    

    <router-view/>


    <Footer />
</div>
</template>

<script>
import NavBar from './components/Navbar.vue';
import Footer from "./components/Footer.vue";


  export default {
    components: {
    NavBar,
    Footer,
},
  }
</script>

