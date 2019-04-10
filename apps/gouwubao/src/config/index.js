import utils from 'blue-utils';
import publicConfig from '$config';
import router from '@router';

//环境
const env = require('./env');

//环境域名路径
const path = (() => {
  let path = '';
  if (env.dev) {
    path = 'https://pc.dtb315.cn';
  } else if (env.beta) {
    path = 'https://beta.dtb315.cn';
  } else {
    path = 'https://www.dtb315.com';
  }
  return path;
})();

//静态资源路径
const staticPath = `${path}/Static/spa`;

//合并公共的配置
const config = utils.extend(publicConfig, {
  view: {
    title: "大健康·点通宝·购物宝",
    tabBar: 'home'
  },
  env,
  path: {
    base: location.origin,
    static: staticPath
  },
  share: {
    title: "blue-vue-tmpl",
    deps: "blue-vue-tmpl is vue public template",
    imgUrl: "",
    link() {
      return router.$getHref();
    }
  }
});

export default config;