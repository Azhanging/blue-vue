const publicVueConfig = require('../../vue-config');
const utils = require('blue-utils');

const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

const programPath = `../../../../lifest`;

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
        '@components':resolve('src/components'),
	      '@views':resolve('src/views')

      }
    }
  },
  devServer: {
    //根据环境配置相关代理
    open: true,
    proxy: {
      '/': {
        ws: false,      //避免把hot代理了
        target: 'http://pc.lifest.dtb315.cn',
        //代理登录状态cookie
        onProxyReq(proxyReq, req, res) {
          proxyReq.setHeader('cookie',
"b72b76241459936962c978f326f7463b=%257D%25B9%25BEg%25AF%257C%2581%25AE; yunsuo_session_verify=986e507cffeee6501760a92f529273a2; PHPSESSID=8thadbo0a6cie44h7hg0mh5ak6; 9de70f6546b2452f6e7b98b46ac36070=5ac013881b9086a8b47beb9f10e5303b; Hm_lvt_26e7ebdd6d0690ee128988fb6ebcdd4a=1554350086,1554690781,1554967950,1555036752; prev_page=aHR0cHM6Ly9wYy5kdGIzMTUuY24v; Hm_lpvt_26e7ebdd6d0690ee128988fb6ebcdd4a=1555037953; come_from=0; visit_page=aHR0cDovL3BjLmR0YjMxNS5jbi9ob21lL2hvbWUvZ2V0UmVjb21tZW5kRm9yWW91P3BhZ2U9MSZQPTEmcD0xJlBhZ2U9MSZfPTE1NTUwMzc5NTY3NjA%3D"
          );
        }
      }
    }
  },
  outputDir: `${programPath}`,
  indexPath: `./app/home/view/index/index.html`,
  assetsDir: 'static'
});