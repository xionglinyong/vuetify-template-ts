import Vue from 'vue'
import '@/plugins/axios'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import Toast from '@/plugins/toast/toast.ts'

import '@/stylus/index.styl'
import '@/permission'
import vuetify from '@/plugins/vuetify'

Vue.config.productionTip = false

Vue.use(Toast)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
