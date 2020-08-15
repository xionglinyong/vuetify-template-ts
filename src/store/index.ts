import Vue from 'vue'
import Vuex from 'vuex'
import User from '@/store/modules/user'
import Permission from '@/store/modules/permission'
import getters from '@/store/getters'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  getters,
  modules: {
    User,
    Permission
  }
})
