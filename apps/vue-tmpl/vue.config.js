const publicVueConfig = require('../../vue-config');
const utils = require('blue-utils');
const path = require('path');
const env = require('$config/env');

function resolve(dir) {
  return path.join(__dirname, dir);
}

//合并两个配置
module.exports = utils.extend(publicVueConfig, {
  //webpack config extend public webpack config
  configureWebpack: {
    resolve: {
      alias: {
        //@开头的为项目的别名路径
        '@': resolve('src'),
        '@router': resolve('src/router'),
        '@store': resolve('src/store'),
        '@config': resolve('src/config'),
        '@assets': resolve('src/assets'),
        '@css': resolve('src/assets/css')
      }
    }
  },
  devServer: {
    proxy: (() => {
      if (env.dev) {
        return 'https://pc.dtb315.cn';
      } else if (env.beta) {
        return 'https://beta.dtb315.cn';
      } else {
        return 'https://www.dtb315.com';
      }
    })()
  },
  assetsDir: 'static'
});