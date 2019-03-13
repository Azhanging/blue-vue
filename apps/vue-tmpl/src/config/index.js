import $utils from 'blue-utils';
import publicConfig from '$config';
import router from '@router';

//合并公共的配置
const config = $utils.extend(publicConfig, {
  view: {
    title: "我是项目默认标题",
    navigator: 'home'
  },
  path: {},
  weChat: {
    getConfig: {
      url: ''
    }
  },
  share: {
    link() {
      return router.getHref();
    }
  }
});

export default config;