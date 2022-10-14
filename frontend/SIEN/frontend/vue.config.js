const {
  defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    port: 8888,
  },
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