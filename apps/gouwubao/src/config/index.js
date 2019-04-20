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

//登录path
const loginPath = (() => {
  return `${path}/home/common/index`;
})();

//绑定手机
const bindPhonePath = (() => {
  return `${path}/common/wechatlogin`;
})();

//静态资源路径
const staticPath = `${path}/Static/spa`;

//合并公共的配置
const config = utils.extend(publicConfig, {

  //是否为混合开发
  mixedDevelopment: true,

  //获取用户信息
  user: {
    url: '/api/member_info/index'
  },

  view: {
    title: "大健康·点通宝·购物宝",
    tabBar: 'home'
  },
  env,
  path: {
    base: location.origin,
    indexPath: `${location.origin}/home/index/home`,
    static: staticPath,
    login: loginPath,
    bindPhone: bindPhonePath
  },
  share: {
    title: "大健康·点通宝·购物宝",
    deps: "大健康·点通宝·购物宝",
    imgUrl: `${path}/Style/weixin/images/wx_list.png`,
    link() {
      return router.getHref();
    }
  }
});

export default config;