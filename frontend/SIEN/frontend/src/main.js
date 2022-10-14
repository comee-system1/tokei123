import Vue from 'vue'
import App from './App.vue'
import router from './router/route.js'
import vuetify from './plugins/vuetify'
import commons from './assets/scss/_commons.scss'
import dialogs from './assets/scss/_dialogs.scss'
import VueLogger from 'vuejs-logger';
import * as Keycloak from 'keycloak-js';

import '@grapecity/wijmo.styles/wijmo.css';
Vue.use(VueLogger);
let initOptions = {
  url: 'http://localhost:8080/auth',
  realm: 'keycloak-demo',
  clientId: 'app-vue',
  onLoad: 'login-required',
  CheckLoginiframe: false
}

let keycloak = Keycloak(initOptions);
keycloak.init({
  onLoad: initOptions.onLoad,
  checkLoginIframe: initOptions.CheckLoginiframe
}).then((auth) => {
  console.log(auth);
  if (!auth) {
    window.location.reload();
  } else {
    Vue.$log.info("Authenticated");

    new Vue({
      el: '#app',
      router,
      vuetify,
      commons,
      dialogs,
      render: h => h(App, {
        props: {
          keycloak: keycloak
        }
      })
    })
  }

  //Token Refresh
  setInterval(() => {
    keycloak.updateToken(70).then((refreshed) => {
      if (refreshed) {
        Vue.$log.info('Token refreshed' + refreshed);
      } else {
        Vue.$log.warn('Token not refreshed, valid for ' +
          Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
      }
    }).catch(() => {
      Vue.$log.error('Failed to refresh token');
    });
  }, 6000)

}).catch(() => {
  Vue.$log.error("Authenticated Failed");
});


// new Vue({
//   router,
//   vuetify,
//   commons,
//   dialogs,
//   render: h => h(App)
// }).$mount('#app')