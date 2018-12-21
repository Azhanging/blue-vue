const path = require('path');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

//public webpack config
//$开头的为公共别名路径
module.exports = {
  resolve: {
    alias: {
      '$components': resolve(`./components`),
      '$load': resolve(`./components/use-in-vue/mint-ui/m-scroll/load`),
      '$public': resolve(`./public`),
      '$utils': resolve(`./public/js/utils/index-esm`),
      '$upload': resolve(`./components/vue-upload-component/upload`),
      '$wechat': resolve(`./public/js/wechat`)
    }
  }
};