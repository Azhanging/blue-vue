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
'Hm_lvt_bdb7f9abf5cdbcb7d50419d7c6bd1be5=1557989268,1558575031,1558682267,1559033169; 9de70f6546b2452f6e7b98b46ac36070=b6188cb8895b893a275701e7f510aa63; Hm_lvt_26e7ebdd6d0690ee128988fb6ebcdd4a=1558575031,1558682268,1559033169,1559113666; come_from=1; PHPSESSID=ehbn8qtb5gobqf4dfskd9863i0; b72b76241459936962c978f326f7463b=%25B1%25CE%25A8%25AC%25B2%2584%25BFl; Hm_lpvt_26e7ebdd6d0690ee128988fb6ebcdd4a=1559117821; prev_page=aHR0cDovL2cuZHRiMzE1LmNvbS8%3D; visit_page=aHR0cDovL2cuZHRiMzE1LmNvbS9wYWNrYWdlL2hvbWU%2FaXNfYWpheD0x'
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