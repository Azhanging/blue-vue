//公共的vue-config
const publicVueConfig = require('../../vue-config');
const utils = require('blue-utils');
const path = require('path');
const hash = require('hash-sum');
const devServer = require(`./dev-server`);

//当前打包的时间戳
const time = new Date().getTime();
//版本号hash
const versionHash = hash(time);

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
        '@components': resolve('src/components')
      }
    }
  },
  devServer,
  //PWA离线应用配置
  pwa: {
    //workbox配置
    workboxOptions: {
      //设置cache manifest的存放位置
      precacheManifestFilename: `static/${versionHash}/precache-manifest.[manifestHash].js`
    }
  },
  outputDir: `./server`,
  indexPath: `./views/index.tmpl`,
  assetsDir: `static/${versionHash}`
});