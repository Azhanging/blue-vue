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
        target: 'http://pc.lifest.dtb315.com',
        //代理登录状态cookie
        onProxyReq(proxyReq, req, res) {
          proxyReq.setHeader('cookie', 'b72b76241459936962c978f326f7463b=%257D%25B9%25BEg%25B0%25A2%2581%25B1; PHPSESSID=p6uf7lrvgo9sbjk5krf7di6ab5; 9de70f6546b2452f6e7b98b46ac36070=22eb0de6dbac4bb6c587f2e7d59e4dc5; prev_page=aHR0cDovL3BjLmR0YjMxNS5jbi8%3D; Hm_lvt_26e7ebdd6d0690ee128988fb6ebcdd4a=1553653584,1553679473,1553827238,1554085209; Hm_lpvt_26e7ebdd6d0690ee128988fb6ebcdd4a=1554085209; come_from=0; visit_page=aHR0cDovL3BjLmR0YjMxNS5jbi9ob21lL2hvbWUvZ2V0UmVjb21tZW5kRm9yWW91P3BhZ2U9MSZQPTEmcD0xJlBhZ2U9MSZfPTE1NTQwODUyMTIzMjU%3D');
        }
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@css/index.scss";`
      }
    }
  },
  outputDir: `${programPath}`,
  indexPath: `./app/home/view/index/index.html`,
  assetsDir: 'static'
});