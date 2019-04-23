import utils from 'blue-utils';
import publicConfig from '$config';
import router from '@router';

//环境
import env from './env';

//环境域名路径
const path = (() => {
  let path = '';
  if (env.dev) {
    path = 'https://pc.lifest.dtb315.cn';
  } else if (env.beta) {
    path = 'https://beta.jiaxiao.dtb315.cn';
  } else {
    path = 'https://jiaxiao.dtb315.com ';
  }
  return path;
})();

//环境域名路径
const dtbPath = (() => {
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
const staticPath = `${path}/static`;

//登录path
const loginPath = (() => {
  return `${dtbPath}/home/common/index`;
})();

//绑定手机
const bindPhonePath = (() => {
  return `${dtbPath}/common/wechatlogin`;
})();

//合并公共的配置
const config = utils.extend(publicConfig, {
  user:{
    url:'/api/Apipublic'
  },
  view: {
    title: "生命驾校",
    tabBar: 'home'
  },
  env,
  path: {
    base: location.origin,
    static: staticPath,
    login: loginPath,
    bindPhone: bindPhonePath
  },
  //微信相关
  weChat: {
    getConfig: {
      type: 'get',
      url: '/api/Index/wechat',
      data: {}
    }
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
