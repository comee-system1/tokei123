const {
  defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: {
    resolve: {
      alias: {
        '@backend': '../../../backend/',
        '@connect': '../../../connect/',
        'va': 'vue2-admin-lte/src'
      }
    }
  },
})