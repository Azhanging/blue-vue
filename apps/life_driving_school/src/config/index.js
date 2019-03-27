import utils from 'blue-utils';
import publicConfig from '$config';
import router from '@router';

//环境
import env from './env';

//合并公共的配置
const config = utils.extend(publicConfig, {
  view: {
    title: "生命驾校",
    tabBar: 'home'
  },
  env,
  path: {
    base: location.origin,
    static: (() => {
	    let path = '';
	    if (env.dev) {
		    path = 'https://pc.dtb315.cn';
	    } else if (env.beta) {
		    path = 'https://beta.dtb315.cn';
	    } else {
		    path = 'https://www.dtb315.com';
	    }
	    return `${path}/Static/spa/life_driving_school`;
    })()
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