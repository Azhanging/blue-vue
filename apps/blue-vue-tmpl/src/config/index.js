import utils from 'blue-utils';
import publicConfig from '$config';
//环境
const env = require('./env');

//合并公共的配置
const config = utils.extend(publicConfig, {
  app: {
    title: "DEFAULT TITLE",
    tabBar: {
      name: `home`
    },
    keepAlive: {
      exclude: [
        'validate',
        `page3`
      ]
    }
  },
  env,
  path: {
    base: location.origin,
    static: location.origin
  },
  share: {
    title: "blue-vue-tmpl",
    deps: "blue-vue-tmpl is vue public template",
    imgUrl: ""
  }
});

export default config;