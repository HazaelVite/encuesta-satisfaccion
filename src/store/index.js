import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import { baseURL } from '@/general';

axios.defaults.baseURL = baseURL;

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
