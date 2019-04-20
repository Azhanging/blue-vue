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
"yunsuo_session_verify=46c431323f4e4e05690462b5907e777b; thinkphp_show_page_trace=0|0; PHPSESSID=ugme1n51qfu1dh1r0kad5lr3r4; 9de70f6546b2452f6e7b98b46ac36070=5b1a99d1b46f8f3cb1d82e676c4949b9; b72b76241459936962c978f326f7463b=%257D%25CF%25AA%25AE%25B0%258Cy%25AF; come_from=2; prev_page=aHR0cDovL2xvY2FsaG9zdDo4MDgwLw%3D%3D; visit_page=aHR0cDovL3BjLmR0YjMxNS5jbi9ob21lL2NvbW1vbi9pbmRleD91cmw9aHR0cCUzQSUyRiUyRmxvY2FsaG9zdCUzQTgwODAlMkYlMjMlMkZncm93JTJGMTIlMkZzaG9ydCUyRjE3; p_h5_u=123A881B-45EA-4D50-A66D-D2E13E15E723"
          );
        }
      }
    }
  },
  outputDir: `${programPath}`,
  indexPath: `./app/home/view/index/index.html`,
  assetsDir: 'static'
});