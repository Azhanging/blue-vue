const publicVueConfig = require('../../vue-config');
const utils = require('blue-utils');
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
        '@router': resolve('./router'),
        '@store': resolve('./store'),
        '@config': resolve('./config')
      }
    }
  })
};
