import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Error from '@/components/Error.vue'

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
    name: 'Home',
    component: Home
  },
  {
    path: '/modulo-2',
    name: 'Home',
    component: Home
  },
  {
    path: '/modulo-3',
    name: 'Home',
    component: Home
  },
  {
    path: '/modulo-4',
    name: 'Home',
    component: Home
  },
  {
    path: '/modulo-5',
    name: 'Home',
    component: Home
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
