const publicVueConfig = require('../../vue-config');
const utils = require('blue-utils');

const path = require('path');

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
	      '@css': resolve('src/assets/css'),
        '@components':resolve('src/components'),
	      '@views':resolve('src/views')

      }
    }
  },
  devServer: {
    proxy: 'https://www.dtb315.com'
  },
  assetsDir: 'static'
});