//公共的vue-config
const publicVueConfig = require('../../vue-config');
const utils = require('blue-utils');
const path = require('path');
const hash = require('hash-sum');

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
  devServer: {
    //根据环境配置相关代理
    open: false,
    proxy: {
      '/': {
        ws: false,      //避免把hot代理了
        target: 'https://jiaxiao.dtb315.com',
        //代理登录状态cookie
        onProxyReq(proxyReq) {
          proxyReq.setHeader('cookie', 'b72b76241459936962c978f326f7463b=%25B1%25B8%25BCe%25B1%259A%25AB%25AF; 9de70f6546b2452f6e7b98b46ac36070=f4a41c895ac4db9ab2d191674fc4f5c1; Hm_lvt_bdb7f9abf5cdbcb7d50419d7c6bd1be5=1554687182; PHPSESSID=btac5up10t4qi8ml8lvb1i9ai0; Hm_lvt_26e7ebdd6d0690ee128988fb6ebcdd4a=1553828518,1554259051,1554687183,1554706326; Hm_lpvt_26e7ebdd6d0690ee128988fb6ebcdd4a=1554706326; come_from=1; prev_page=aHR0cDovL2cuZHRiMzE1LmNvbS9tZW1iZXIvaW5kZXguaHRtbD9ib3R0b209MSZ0eXBlPW1lbWNhY2hl; visit_page=aHR0cDovL2cuZHRiMzE1LmNvbS9tZW1iZXIvbWVtYmVyL2NvbW1vbg%3D%3D');
        }
      }
    }
  },
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