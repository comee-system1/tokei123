const {
  defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    port: 8080,
  },
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: {
    resolve: {
      alias: {
        '@backend': '../../../backend/',
        '@connect': '../connect/',
        'va': 'vue2-admin-lte/src'
      }
    }
  },
  pages: {
    index: {
      entry: 'src/main.js', // 必須パラメータ
      title: '福祉見聞録',
    }
  },
  // publicPath: './',
})