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
    proxy: {
      '/': {
        ws: false,      //避免把hot代理了
        target: /*'http://192.168.188.233' || */ 'http://g.dtb315.com' || 'https://pc.dtb315.cn',
        //代理登录状态cookie
        onProxyReq(proxyReq, req, res) {
          proxyReq.setHeader('cookie',
'b72b76241459936962c978f326f7463b=%25B1%25B8%25BCe%25B2%259A%25B3l; PHPSESSID=8ch3vgr2a0u0vuph38g1gb8a65; 9de70f6546b2452f6e7b98b46ac36070=36b6ca39ad312bc9d9209c82e37cdb6c; Hm_lvt_26e7ebdd6d0690ee128988fb6ebcdd4a=1555381629,1555639279,1555654812,1555723364; Hm_lpvt_26e7ebdd6d0690ee128988fb6ebcdd4a=1555723627; come_from=1; prev_page=aHR0cDovL2cuZHRiMzE1LmNvbS9tZW1iZXIvaW5kZXguaHRtbD9ib3R0b209MSZ0eXBlPW1lbWNhY2hl; visit_page=aHR0cDovL2cuZHRiMzE1LmNvbS9tZW1iZXIvaW5kZXgvYWxyZWFkeV9rbm93Lmh0bWw%2FdmVyc2lvbj0x'
          );
        },
        timeout: 100000000,
        proxyTimeout: 100000000
      }
    }
  },
  outputDir: `${programPath}`,
  indexPath: `./Templates/wap/home/index/home.html`,
  assetsDir: 'Static/spa'
});