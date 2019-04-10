import utils from 'blue-utils';
import publicConfig from '$config';
import router from '@router';

//环境
import env from './env';

//环境域名路径
const path = (() => {
  let path = '';
  if (env.dev) {
    path = 'http://pc.lifest.dtb315.com';
  } else if (env.beta) {
    path = 'http://beta.lifest.dtb315.com';
  } else {
    path = 'http://lifest.dtb315.com';
  }
  return path;
})();

//静态资源路径
const staticPath = `${path}/static`;

//合并公共的配置
const config = utils.extend(publicConfig, {
  view: {
    title: "生命驾校",
    tabBar: 'home'
  },
  env,
  path: {
    base: location.origin,
    static: staticPath
  },
  share: {
    title: "生命驾校·智慧导航",
    deps: "智慧引领生活，幸福从心成长——生命驾校幸福工程。",
    imgUrl: `${staticPath}/img/public/share/default-share-img.png`,
    link() {
      return router.getHref();
    }
  }
});

export default config;