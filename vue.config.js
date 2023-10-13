const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: "./",
  devServer: {
    port: 8888,
    proxy: {
      '/oss': {
        target: 'http://aibbd.natapp1.cc',
        changeOrigin: true, //允许跨域
        pathRewrite: { // pathRewrite表示路径重写，key表示一个正则，value表示别名
          '^/api': '' // 即用 '/api'表示'http://localhost:3000/api'
        }
      }
    }
  }
});
