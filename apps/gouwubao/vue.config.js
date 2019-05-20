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
'9de70f6546b2452f6e7b98b46ac36070=50e7d54285dc6f3a182788c002477bd5; Hm_lvt_26e7ebdd6d0690ee128988fb6ebcdd4a=1557453980,1557535775,1557708871,1557711516; PHPSESSID=3g003qpg35b62fsc2t5rv22fc4; b72b76241459936962c978f326f7463b=%25B1%25CE%25A8%25AC%25B2%2584%25A7%25AF; Hm_lpvt_26e7ebdd6d0690ee128988fb6ebcdd4a=1557711723; come_from=1; prev_page=aHR0cDovL2cuZHRiMzE1LmNvbS9tZW1iZXIvaW5kZXguaHRtbD9ib3R0b209MSZ0eXBlPW1lbWNhY2hl; visit_page=aHR0cDovL2cuZHRiMzE1LmNvbS9tZW1iZXIvaW5kZXgvYWxyZWFkeV9rbm93Lmh0bWw%2FdmVyc2lvbj0x'
          );
        },
        timeout: 100000000,
        proxyTimeout: 100000000
      }
    }
  },
  outputDir: `${programPath}`,
  indexPath: `./Templates/wap/home/index/home.html`,
  assetsDir: `Static/spa/${versionHash}`
});