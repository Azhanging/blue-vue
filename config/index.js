import { getCurrentDevice } from '$assets/js/device';

const config = {

  //视图相关
  view: {
    title: "blue-vue-tmpl-title",       //默认的文档标题
    tabBar: false                    //默认的导航名，定义到的bv-tab-bar中使用
  },

  //设备
  device: getCurrentDevice(),

  //环境相关
  env: {
    dev: true,                     //开发环境
    beta: false,                    //beta环境
    prod: false                     //生产环境
  },

  //路径相关
  path: {
    base: '',                     //域名
    static: ''                    //静态资源域名
  },

  //登录状态 （方案暂不采用http header处理）
  session: {
    storage: {}
  },

  //微信相关
  weChat: {
    getConfig: {
      type: 'get',
      url: '/api/wechat_config/index',
      data: {}
    }
  },

  //公共的分享相关
  share: {
    title: "blue-vue-tmpl",
    deps: "blue-vue-tmpl is vue public template",
    imgUrl: "",
    link: "" || function (link) {
      return link;
    },
    //分享相关的参数的
    params: {
      phone: 'n',                     //绑定参数
      redirectUrl: 'redirect_url'     //绑定后重定向回来的参数
    }
  },

  //绑定相关
  bind: {

    //角色绑定
    relation: {
      url: ''
    },

    //绑定手机
    phone: {
      path: '/bind-phone',      //绑定手机的path
      url: '/member/personal/deitor_phone'
    }
  },

  //错误相关
  error: {
    404: {
      path: '/error-page/error-page-404'
    }
  },

  //request相关
  axios: {
    timeout: 100000
  }

};

export default config;