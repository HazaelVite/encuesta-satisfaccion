<template >
  <v-container>
    <div v-if="this.hayEvento == '1'">
      <p class="text-center text-h3" style="color: #b52f26">
        Encuesta de Satisfacción Modulo {{ this.cualModulo }}<br />
        {{ nombreEvento }}
      </p>
      <v-card class="mt-5">
        <v-toolbar dark style="background-color: #b52f26" height="100">
          <v-row align="center" justify="center" class="text-center">
            <v-col cols="12" align="center">
              <div class="text-h5">
                Ponente<br />
                {{ nombrePonente }}
              </div>
            </v-col>
          </v-row>
        </v-toolbar>
        <v-card-text class="">
          <v-container>
            <v-form ref="formEncuesta" v-model="validE" @submit.prevent>
              <v-container style="max-width: 1200px">
                <v-row>
                  <v-col cols="12">
                    <p class="text-left text-h5" style="color: #b52f26">
                      ¿Cómo evalúa el contenido científico de la plática?
                    </p>
                    <v-radio-group
                      dense
                      v-model="question1"
                      :rules="[rules.required]"
                      row
                    >
                      <v-radio
                        color="#b52f26"
                        label="Pésimo"
                        value="1"
                      ></v-radio>
                      <v-radio color="#b52f26" label="Malo" value="2"></v-radio>
                      <v-radio
                        color="#b52f26"
                        label="Regular"
                        value="3"
                      ></v-radio>
                      <v-radio
                        color="#b52f26"
                        label="Bueno"
                        value="4"
                      ></v-radio>
                      <v-radio
                        color="#b52f26"
                        label="Excelente"
                        value="5"
                      ></v-radio>
                    </v-radio-group>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <p class="text-left text-h5" style="color: #b52f26">
                      ¿Cómo califica en general la claridad y exposición del
                      ponente?
                    </p>
                    <v-radio-group
                      dense
                      v-model="question2"
                      row
                      :rules="[rules.required]"
                    >
                      <v-radio
                        color="#b52f26"
                        label="Pésimo"
                        value="1"
                      ></v-radio>
                      <v-radio color="#b52f26" label="Malo" value="2"></v-radio>
                      <v-radio
                        color="#b52f26"
                        label="Regular"
                        value="3"
                      ></v-radio>
                      <v-radio
                        color="#b52f26"
                        label="Bueno"
                        value="4"
                      ></v-radio>
                      <v-radio
                        color="#b52f26"
                        label="Excelente"
                        value="5"
                      ></v-radio>
                    </v-radio-group>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <p class="text-left text-h5" style="color: #b52f26">
                      ¿Cómo evalúa la utilidad del contenido de esta plática en
                      su práctica diaria?
                    </p>
                    <v-radio-group
                      dense
                      v-model="question3"
                      row
                      :rules="[rules.required]"
                    >
                      <v-radio
                        color="#b52f26"
                        label="Nada útil"
                        value="1"
                      ></v-radio>
                      <v-radio color="#b52f26" label="Útil" value="2"></v-radio>
                      <v-radio
                        color="#b52f26"
                        label="Muy Útil"
                        value="3"
                      ></v-radio>
                    </v-radio-group>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions class="pb-5 mr-5">
          <v-spacer></v-spacer>
          <v-btn
            :disabled="!validE"
            color="#b52f26"
            class="mr-4 white--text"
            @click="enviaEncuesta()"
            >Enviar</v-btn
          >
        </v-card-actions>
      </v-card>
      <div>
        <v-snackbar v-model="mensaje" centered :color="color" timeout="2000">
          <v-row justify="center" class="text-start" align="center">
            <v-col cols="3" class="pl-10">
              <v-icon size="50">mdi-check-circle-outline</v-icon>
            </v-col>
            <v-col cols="9" class="text-h6">
              {{ texto }}
            </v-col>
          </v-row>
        </v-snackbar>
      </div>
    </div>
    <div v-else>
      <Error />
    </div>
  </v-container>
</template>

<script>
import axios from "axios";
import { createForm } from "@/general";
import Error from "@/components/Error";

export default {
  components: {
    Error,
  },
  name: "Home",
  data() {
    return {
      cualModulo: "",
      hayEvento: "",
      idEvento: "",
      nombreEvento: [],
      nombrePonente: "",
      modulo: "",
      fechaInicio: "",
      fechaFin: "",
      // variables para el form de la encuesta
      validE: "",
      question1: "",
      question2: "",
      question3: "",
      mensaje: false,
      color: "",
      texto: "",
      rules: {
        required: (v) => !!v || "Casilla requerida",
      },
    };
  },

  created() {
    this.getEventos();
  },

  methods: {
    async getEventos() {
      let response = await this.eventos(createForm({ tabla: "evento" }));
      for (const i in response) {
        this.cualModulo = response[i].modulo
        if (this.cualModulo == '5') {
          this.hayEvento = '1'
          this.nombreEvento = response[i].nombre;
          this.nombrePonente = response[i].ponente;
          this.idEvento = response[i].idEvento;
          return this.hayEvento          
        } else {
          this.hayEvento = '0'
          return this.hayEvento  
        }
      }    
    },
    eventos(data) {
      return new Promise((resolve, reject) => {
        axios
          .post("catalogos.php", data)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => reject(error));
      });
    },

    async enviaEncuesta() {
      let response = await this.encuesta(
        createForm({
          idEvento: this.idEvento,
          respuesta1: this.question1,
          respuesta2: this.question2,
          respuesta3: this.question3,
        })
      );

      if (response.state == "1") {
        this.mensaje = true;
        this.texto = "Encuesta enviada, gracias por su participación";
        this.color = "success";
        setTimeout(() => {
          window.location.href = "https://eventosmedicos2021.com";
        }, 2000);
      } else {
        this.mensaje = true;
        this.texto = "Por favor intente de nuevo";
        this.color = "error";
        setTimeout(() => {
          this.$router.go("/");
        }, 2000);
      }
    },

    encuesta(data) {
      return new Promise((resolve, reject) => {
        axios
          .post("guardaRespuesta.php", data)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => reject(error));
      });
    },
  },
};
</script>

<style>
</style>