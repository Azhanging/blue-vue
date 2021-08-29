const path = require('path');
const time = new Date().getTime();
const hash = require('hash-sum');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

//public webpack config
//$开头的为公共别名路径
module.exports = {
  configureWebpack: {
    devtool: "source-map",
    resolve: {
      alias: {
        '$config': resolve(`./config`),
        '$components': resolve(`./components`),
        '$assets': resolve(`./assets`),
        '$wechat': resolve(`./use-in-vue/open-api/wechat`),
        '$use-in-vue': resolve(`./use-in-vue`),
        '$use-in-vue-router': resolve(`./use-in-vue-router`),
        '$axios': resolve(`./use-in-vue/axios`),
        '$api': resolve(`./api`),
        '$code': resolve(`./code`)
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@css/index.scss";`
      }
    }
  },
  pwa: {
    assetsVersion: hash(time)
  },
  filenameHashing: true
};