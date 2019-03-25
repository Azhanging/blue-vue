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
        '@components': resolve('src/components'),
      }
    }
  },
  devServer: {
    //根据环境配置相关代理
    proxy: {
      '/': {
        ws: false,      //避免把hot代理了
        target: 'https://pc.dtb315.cn',
        //代理登录状态cookie
        onProxyReq(proxyReq, req, res) {
          proxyReq.setHeader('cookie', 'b72b76241459936962c978f326f7463b=%257D%25B9%25B6g%25B0%258C%2591i; PHPSESSID=49logci0uq59hrt56bihf9qth1; 9de70f6546b2452f6e7b98b46ac36070=e3a0fc5313ae412141695ca757407c51; Hm_lvt_26e7ebdd6d0690ee128988fb6ebcdd4a=1553142092,1553235724,1553326340,1553481703; Hm_lpvt_26e7ebdd6d0690ee128988fb6ebcdd4a=1553481845; come_from=1; prev_page=aHR0cHM6Ly9wYy5kdGIzMTUuY24vbWVtYmVyL2luZGV4Lmh0bWw%2FYm90dG9tPTEmdHlwZT1tZW1jYWNoZQ%3D%3D; visit_page=aHR0cDovL3BjLmR0YjMxNS5jbi9tZW1iZXIvaW5kZXguaHRtbD9ib3R0b209MSZ0eXBlPW1lbWNhY2hlJl89MTU1MzQ4MTg0NDQ3OQ%3D%3D')
        }
      }
    }
  },
  outputDir: `${programPath}`,
  indexPath: `./Templates/wap/home/index/home.html`,
  assetsDir: 'Static/spa/vue-tmpl'
});