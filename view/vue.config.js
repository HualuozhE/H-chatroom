const path = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@styles': path.resolve(__dirname, './src/assets/styles')
      }
    },
    devServer: {
      proxy: {
        '/api/': {
          target: 'http://127.0.0.1:80',
          ws: true,
          changeOrigin: true
        }
      }
    }
  }
}
