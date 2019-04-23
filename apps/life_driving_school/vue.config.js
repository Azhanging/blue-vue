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
         target: 'https://beta.jiaxiao.dtb315.cn',
       // target: 'https://pc.lifest.dtb315.cn',
        //代理登录状态cookie
        onProxyReq(proxyReq, req, res) {
          proxyReq.setHeader('cookie',`9de70f6546b2452f6e7b98b46ac36070=89e2f225b8b16b40971f301cb2287d37; Hm_lvt_26e7ebdd6d0690ee128988fb6ebcdd4a=1555499206,1555558090,1555558091,1555568044; b72b76241459936962c978f326f7463b=%257D%25CF%25AA%25AE%25B0%258Cy%25AF; PHPSESSID=io00ctb4mlguffs13q9kp1c4m7; Hm_lpvt_26e7ebdd6d0690ee128988fb6ebcdd4a=1555570673; come_from=1; prev_page=aHR0cHM6Ly9wYy5kdGIzMTUuY24vbWVtYmVy; visit_page=aHR0cDovL3BjLmR0YjMxNS5jbi9tZW1iZXIvbWVtYmVyL2NvbW1vbg%3D%3D`);
        }
      }
    }
  },
  outputDir: `${programPath}`,
  indexPath: `./app/home/view/index/index.html`,
  assetsDir: 'static'
});