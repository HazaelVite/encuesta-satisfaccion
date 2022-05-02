<template>
  <v-container class="mt-10">
    <v-card flat style="background-color: transparent">
      <v-card-text>
        <v-row class="text-center text-h5 mt-2" justify="center">
          Lo sentimos la encuesta del modulo que solicito aún no se encuentra disponible. <br>
          Intente más tarde.
        </v-row>
        <v-row class="text-center text-h5 mt-5" justify="center">
          <p>
          Puede consultar los horarios en la agenda dando click <a href="https://eventosmedicos2021.com/schedule">aqui</a>
          </p>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
    name: "Error",
    data (){
      return{

      }
    }, 

}
</script>

<style>

</style>