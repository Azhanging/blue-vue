const publicVueConfig = require('../../vue-config');
const utils = require('../../public/js/utils');

const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  //webpack config extend public webpack config
  configureWebpack: utils.extend(publicVueConfig, {
    resolve: {
      alias: {
        //@开头的为项目的别名路径
        '@': resolve('src'),
        '@router': resolve('src/router'),
        '@store': resolve('src/store'),
        '@config': resolve('src/config')
      }
    }
  }),
  devServer: {
    proxy: 'http://pc.fuwu.dtb315.com'
  },
  assetsDir: 'static'
};