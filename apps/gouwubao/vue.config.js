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
        target: 'https://pc.dtb315.cn',
        //代理登录状态cookie
        onProxyReq(proxyReq, req, res) {
          proxyReq.setHeader('cookie', 'b72b76241459936962c978f326f7463b=%257D%25B9%25BEg%25AF%257C%2581%25AE; PHPSESSID=9d9r4n4uphq5flfmd3eb1dcql2; 9de70f6546b2452f6e7b98b46ac36070=d204fd2159760cd1917e43e752ee1abb; Hm_lvt_26e7ebdd6d0690ee128988fb6ebcdd4a=1554704946,1554859441,1554946174,1555053944; Hm_lpvt_26e7ebdd6d0690ee128988fb6ebcdd4a=1555060428; come_from=1; prev_page=aHR0cDovL3BjLmR0YjMxNS5jbi9tZW1iZXIvaW5kZXguaHRtbD9ib3R0b209MSZ0eXBlPW1lbWNhY2hl; visit_page=aHR0cDovL3BjLmR0YjMxNS5jbi9tZW1iZXIvbWVtYmVyL2NvbW1vbg%3D%3D');
        },
        proxyTimeout: 100000
      }
    }
  },
  outputDir: `${programPath}`,
  indexPath: `./Templates/wap/home/index/home.html`,
  assetsDir: 'Static/spa'
});