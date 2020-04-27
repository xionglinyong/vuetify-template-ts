import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/modules/user'
import permission from '@/store/modules/permission'
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
    user,
    permission
  }
})
