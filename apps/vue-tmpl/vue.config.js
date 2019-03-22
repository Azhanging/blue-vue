const publicVueConfig = require('../../vue-config');
const utils = require('blue-utils');
const path = require('path');
const env = require('./src/config/env');

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
        '@components': resolve('src/components'),
      }
    }
  },
  devServer: {
    //根据环境配置相关代理
    proxy: {
      '/': {
        ws: false,      //避免把hot代理了
        target: (() => {
          let path = '';
          if (env.dev) {
            path = 'http://192.168.177.21' ||'https://pc.dtb315.cn';
          } else if (env.beta) {
            path = 'https://beta.dtb315.cn';
          } else {
            path = 'https://www.dtb315.com';
          }
          return path;
        })(),
        //代理登录状态cookie
        onProxyReq(proxyReq, req, res) {
          proxyReq.setHeader('cookie', 'yunsuo_session_verify=4f6a22bd14db50b5b54e0fd8a95199d9; PHPSESSID=28hlrb7tqi4pea1jal4l0mek87; 9de70f6546b2452f6e7b98b46ac36070=8ad44c5a8f1097e673d049fd3237a789; come_from=1; prev_page=aHR0cDovL3BjLmR0YjMxNS5jbi8%3D; Hm_lvt_26e7ebdd6d0690ee128988fb6ebcdd4a=1552827298; Hm_lpvt_26e7ebdd6d0690ee128988fb6ebcdd4a=1552827298; visit_page=aHR0cDovL3BjLmR0YjMxNS5jbi9ob21lL2hvbWUvZ2V0cmVjb21tZW5kZm9yeW91Lmh0bWw%2FcGFnZT0zJlA9MyZwPTMmUGFnZT0zJl89MTU1MjgyNzI5NzI3Mg%3D%3D')
        }
      }
    }
  },
  outputDir: `${programPath}`,
  indexPath: `./Templates/wap/home/index/home.html`,
  assetsDir: 'Static/spa/vue-tmpl'
});