<template>
  <v-container>
    <p class="text-center text-h3" style="color: #b52f26">
      Encuesta de Satisfacción Modulo {{modulo}}<br>
      {{nombreEvento}}
    </p>
    <v-card class="mt-5">
      <v-toolbar dark style="background-color: #b52f26" height="100">
        <v-row align="center" justify="center" class="text-center">
            <v-col cols="12" align="center">
              <div class="text-h5">
                Ponente<br>
                {{nombrePonente}}
              </div>
            </v-col>    
          </v-row>
      </v-toolbar>
      <v-card-text class="">
        <v-container>
          <v-form ref="formEncuesta" v-model="validE" @submit.prevent> 
            <v-container style="max-width: 1200px;">
              <v-row >
                <v-col cols="12" >
                  <p class="text-left text-h5" style="color: #b52f26">
                    ¿Cómo evalúa el contenido científico de la plática? 
                  </p>
                  <v-radio-group dense v-model="question1" :rules="[rules.required]" row>
                    <v-radio color="#b52f26" label="Pésimo" value="1"></v-radio>
                    <v-radio color="#b52f26" label="Malo" value="2"></v-radio>
                    <v-radio color="#b52f26" label="Regular" value="3"></v-radio>
                    <v-radio color="#b52f26" label="Bueno" value="4"></v-radio>
                    <v-radio color="#b52f26" label="Excelente" value="5"></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
               <v-row >
                <v-col cols="12" >
                  <p class="text-left text-h5" style="color: #b52f26">
                    ¿Cómo califica en general la claridad y exposición del ponente? 
                  </p>
                  <v-radio-group dense v-model="question2" row :rules="[rules.required]">
                    <v-radio color="#b52f26" label="Pésimo" value="1"></v-radio>
                    <v-radio color="#b52f26" label="Malo" value="2"></v-radio>
                    <v-radio color="#b52f26" label="Regular" value="3"></v-radio>
                    <v-radio color="#b52f26" label="Bueno" value="4"></v-radio>
                    <v-radio color="#b52f26" label="Excelente" value="5"></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
               <v-row >
                <v-col cols="12" >
                  <p class="text-left text-h5" style="color: #b52f26">
                    ¿Cómo evalúa la utilidad del contenido de esta plática en su práctica diaria?
                  </p>
                  <v-radio-group dense v-model="question3" row :rules="[rules.required]">
                    <v-radio color="#b52f26" label="Nada útil" value="1"></v-radio>
                    <v-radio color="#b52f26" label="Útil" value="2"></v-radio>
                    <v-radio color="#b52f26" label="Muy Útil" value="3"></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions class="pb-5 mr-5">
        <v-spacer></v-spacer>
        <v-btn  :disabled="!validE" color="#b52f26" class="mr-4 white--text" @click="enviaEncuesta()">Enviar</v-btn>
      </v-card-actions>
    </v-card>
    <div>
      <v-snackbar v-model="mensaje" centered :color="color" timeout="2000"> 
        <v-row justify="center" class="text-start" align="center">
          <v-col cols="3" class=" pl-10">
            <v-icon size="50">mdi-check-circle-outline</v-icon>
          </v-col>
          <v-col cols="9" class="text-h6">
            {{texto}}
          </v-col>
        </v-row>
      </v-snackbar>
    </div>
  </v-container>
</template>

<script>
  import axios from 'axios';
  import { createForm } from '@/general';
  
  export default {
    name: "Home",
    data (){
      return{
        idEvento: '',
        nombreEvento: '',
        nombrePonente: '',
        modulo: '',
        fechaInicio: '', 
        fechaFin: '', 
        // variables para el form de la encuesta
        validE: '',
        question1: '',
        question2: '',
        question3: '',
        mensaje: false,
        color: '',
        texto: '',
        rules: {
          required: v => !!v || 'Casilla requerida',
        }
      }
    }, 

    created(){
      this.getEventos()
      
    },

    methods: {
      async getEventos() {
       
          let response = await this.eventos();
          if(response.state == '1'){
            const now = new Date()
            delete response['state']
            for(const i in response){
              const fechaIni = new Date(response[i].fechaInicio)
              const fechaFin = new Date(response[i].fechaFin)
              console.log (now);
              if (now >= fechaIni && now <=  fechaFin) {
                this.nombreEvento = response[i].nombre
                this.nombrePonente = response[i].ponente
                this.idEvento = response[i].idEvento
                if(this.$route.path.slice(-1) == response[i].modulo){
                  this.modulo = response[i].modulo 
                }else{
                  this.$router.push('/error')
                }
                            
              }  //else{
              //   this.$router.push('/error')
              // }
            }
          } 
        
      },
      eventos(data){
        return new Promise((resolve, reject) => {
          axios.post('buscaDatosEventos.php', data)
          .then((response) => {
              resolve(response.data);
          }).catch((error) => reject(error));
          });
      },

      async enviaEncuesta(){
        let response = await this.encuesta(createForm({idEvento: this.idEvento,
                                                      respuesta1: this.question1,
                                                      respuesta2: this.question2,
                                                      respuesta3: this.question3}));
      
          if(response.state == '1'){
            this.mensaje = true
            this.texto = 'Encuesta enviada, gracias por su participación'
            this.color = 'success'
            setTimeout(()=>{
              window.location.href = "https://eventosmedicos2021.com";
            },2000)
          }else{
            this.mensaje = true
            this.texto = 'Por favor intente de nuevo'
            this.color = 'error'
            setTimeout(()=>{
              this.$router.go('/')
            },2000)
          }
      },

      encuesta(data){
        return new Promise((resolve, reject) => {
          axios.post('guardaRespuesta.php', data)
          .then((response) => {
              resolve(response.data);
          }).catch((error) => reject(error));
        });
      },

    },
  }
</script>

<style>

</style>