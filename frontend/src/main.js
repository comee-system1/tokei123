import Vue from 'vue'
import App from './App.vue'
import router from './router/route.js'
import vuetify from './plugins/vuetify'
import commonCss from './assets/scss/common.scss'
import '@grapecity/wijmo.styles/wijmo.css';

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  commonCss,
  render: h => h(App)
}).$mount('#app')
