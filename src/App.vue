<template>
  <v-app id="body">
    <v-main>
      <Header/>
      <router-view/>
      <Footer/>
  </v-main>
  </v-app>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
export default {
  name: 'App',

  data: () => ({
    //
  }),
  components: {
    Header,
    Footer
  }
};
</script>
<style>
#body {
  background-image: url("assets/background.jpg");
  background-position: center; 
  background-repeat: no-repeat; 
  background-size: cover; 
}

</style>
