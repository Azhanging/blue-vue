import utils from 'blue-utils';
import publicConfig from '$config';
import router from '@router';

//环境
import env from './env';

//合并公共的配置
const config = utils.extend(publicConfig, {
  view: {
    title: "我是项目默认标题",
    navigator: 'home'
  },
  env,
  path: {
    base: location.origin,
    static: location.origin
  },
  weChat: {
    getConfig: {
      url: ''
    }
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