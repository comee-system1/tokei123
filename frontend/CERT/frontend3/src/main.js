import {
    createApp
} from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import '@grapecity/wijmo.styles/wijmo.css';
import commons from './assets/scss/_commons.scss'

import '@grapecity/wijmo.styles/wijmo.css';
import '@grapecity/wijmo.vue2.grid';
import '@grapecity/wijmo.vue2.grid.grouppanel';
import '@grapecity/wijmo.vue2.grid.filter';
import '@grapecity/wijmo.vue2.grid.search';
import '@grapecity/wijmo.vue2.core';

import {
    loadFonts
} from './plugins/webfontloader'

import router from './router'

loadFonts();

createApp(App)
    .use(router)
    .use(vuetify)
    .use(commons)
    .mount('#app')