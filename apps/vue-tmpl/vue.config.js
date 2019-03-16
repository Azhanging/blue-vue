const publicVueConfig = require('../../vue-config');
const utils = require('blue-utils');
const path = require('path');
const env = require('./src/config/env');

function resolve(dir) {
  return path.join(__dirname, dir);
}

function parseCookie(cookie) {

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
    //根据环境配置相关代理
    proxy: {
      '/': {
        ws: false,      //避免把hot代理了
        target: (() => {
          let path = ''
          if (env.dev) {
            path = 'https://pc.dtb315.cn';
          } else if (env.beta) {
            path = 'https://beta.dtb315.cn';
          } else {
            path = 'https://www.dtb315.com';
          }
          return path;
        })(),
        //代理登录状态cookie
        onProxyReq(proxyReq, req, res) {
          proxyReq.setHeader('cookie','9de70f6546b2452f6e7b98b46ac36070=22decc8434770d37d6ec6d5998d0c3cc; PHPSESSID=jfmpoitg0jt2nitgss67ot0fr2; b72b76241459936962c978f326f7463b=%257D%25B9%25BEg%25AF%25A2%257D%25AF; Hm_lvt_26e7ebdd6d0690ee128988fb6ebcdd4a=1552547492,1552614786,1552700741; come_from=1; prev_page=aHR0cHM6Ly9wYy5kdGIzMTUuY24vbWVtYmVyL29yZGVyL2luZGV4; visit_page=aHR0cDovL3BjLmR0YjMxNS5jbi9tZW1iZXIvaW5kZXg%3D; Hm_lpvt_26e7ebdd6d0690ee128988fb6ebcdd4a=1552706205')
        }
      }
    }
  },
  assetsDir: 'static'
});