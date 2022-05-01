<template>
  <v-footer padless class="mt-auto" style="background-color: transparent">
    <v-col class="stylesFooter" cols="12">  
      <strong> &copy; - {{ new Date().getFullYear() }} Amgen, México S.A de C.V todos los derechos reservados.</strong>
    </v-col>
  </v-footer>
</template>


<script>
  export default {
    data: () => ({
      
    }),
  }
</script>

<style>
    .stylesFooter{
      text-align: center;
      font-weight: 350;
      font-size: 12px;
    }
</style>
