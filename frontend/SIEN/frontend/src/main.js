import Vue from 'vue'
import App from './App.vue'
import router from './router/route.js'
import vuetify from './plugins/vuetify'
import commons from './assets/scss/_commons.scss'
import dialogs from './assets/scss/_dialogs.scss'

import '@grapecity/wijmo.styles/wijmo.css';


Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  commons,
  dialogs,
  render: h => h(App)
}).$mount('#app')