import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Error from '@/components/Error.vue'
// Modulos
import ModuloUno from '@/views/ModuloUno'
import ModuloDos from '@/views/ModuloDos'
import ModuloTres from '@/views/ModuloTres'
import ModuloCuatro from '@/views/ModuloCuatro'
import ModuloCinco from '@/views/ModuloCinco'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    beforeEnter(to,from,next){
      window.location.href = "https://eventosmedicos2021.com";
    }
  },
  {
    path: '/modulo-1',
    name: 'ModuloUno',
    component: ModuloUno
  },
  {
    path: '/modulo-2',
    name: 'ModuloDos',
    component: ModuloDos
  },
  {
    path: '/modulo-3',
    name: 'ModuloTres',
    component: ModuloTres
  },
  {
    path: '/modulo-4',
    name: 'ModuloCuatro',
    component: ModuloCuatro
  },
  {
    path: '/modulo-5',
    name: 'ModuloCinco',
    component: ModuloCinco
  },
  {
    path: '/error',
    name: 'Error',
    component: Error
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
