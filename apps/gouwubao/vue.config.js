const publicVueConfig = require('../../vue-config');
const utils = require('blue-utils');
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

const programPath = `../../../../dajiankang`;

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
    open: true,
    proxy: {
      '/': {
        ws: false,      //避免把hot代理了
        target: 'http://g.dtb315.com' || 'https://pc.dtb315.cn',
        //代理登录状态cookie
        onProxyReq(proxyReq, req, res) {
          proxyReq.setHeader('cookie', 'b72b76241459936962c978f326f7463b=%25B1%25B8%25BCe%25B1%259A%25AB%25AF; 9de70f6546b2452f6e7b98b46ac36070=d18833951146a234fce6b86aa6e62b44; Hm_lvt_bdb7f9abf5cdbcb7d50419d7c6bd1be5=1554687182,1554859815; Hm_lpvt_bdb7f9abf5cdbcb7d50419d7c6bd1be5=1554859815; Hm_lvt_26e7ebdd6d0690ee128988fb6ebcdd4a=1554259051,1554687183,1554706326,1554859816; PHPSESSID=u5lbd5ntbe1pkpc851qkf54mp4; Hm_lpvt_26e7ebdd6d0690ee128988fb6ebcdd4a=1554862879; come_from=1; prev_page=aHR0cDovL2cuZHRiMzE1LmNvbS9tZW1iZXIvaW5kZXguaHRtbD9ib3R0b209MSZ0eXBlPW1lbWNhY2hl; visit_page=aHR0cDovL2cuZHRiMzE1LmNvbS9tZW1iZXIvaW5kZXgvYWxyZWFkeV9rbm93Lmh0bWw%2FdmVyc2lvbj0x');
        }
      }
    }
  },
  outputDir: `${programPath}`,
  indexPath: `./Templates/wap/home/index/home.html`,
  assetsDir: 'Static/spa'
});