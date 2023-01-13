import {
    createApp, h
} from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import '@grapecity/wijmo.styles/wijmo.css';
import commons from './assets/scss/_commons.scss'

import {
    loadFonts
} from './plugins/webfontloader'

import router from './router'
import keycloak from 'keycloak-js';


loadFonts();


let str = location.href.match(/\/([^/]+)\/?$/)[1];
if (str.match(/#/)) {
    str = str.substring(0, str.indexOf('#'));
}
let initOptions = {
    url: 'http://localhost:8884/',
    realm: str,
    clientId: 'account',
    onLoad: 'login-required',
};

let kc = keycloak(initOptions);

kc
    .init({
        onLoad: initOptions.onLoad,
        checkLoginIframe: initOptions.CheckLoginiframe,
    })
    .then((auth) => {
        if (!auth) {
            window.location.reload();
        }
        console.log(kc);
        console.log(kc.idToken);

        createApp({
            render: () => h(App, { color: 'red', keycloak: kc })
        })
            .use(router)
            .use(vuetify)
            .use(commons)
            .mount('#app');


    })
    .catch(() => {
        //  Vue.$log.error("Authenticated Failed");
    });


/*
createApp(App)
    .use(router)
    .use(vuetify)
    .use(commons)
*/

