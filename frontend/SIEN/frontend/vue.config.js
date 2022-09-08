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
      }
    }
  },
  pages: {
    index: {
      entry: "src/main.js",
      title: "福祉見聞録",
    }
  }
})