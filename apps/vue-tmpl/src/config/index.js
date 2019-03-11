import $utils from 'blue-utils';
import { config } from '$config';
import router from '@router';

const programConfig = $utils.extend(config, {
  view: {
    title: "我是项目默认标题",
    navigator: 'home'
  },
  path: {

  },
  weChat: {
    getConfig: {
      url: ''
    },
    share: {
      link() {
        return router.getHref();
      }
    }
  }
});

export default programConfig;