import utils from 'blue-utils';
import publicConfig from '$config';
import router from '@router';

//环境
const env = require('./env');

//合并公共的配置
const config = utils.extend(publicConfig, {
  view: {
    title: "我是项目默认标题",
    tabBar: 'home'
  },
  env,
  path: {
    base: location.origin,
    static: location.origin
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