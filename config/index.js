import { getCurrentDevice } from '$assets/js/device';

const config = {

  //是否为混合开发
  //（使用区分绑定手机和跳转登录的是跳到base还是indexPath）
  mixedDevelopment: false,

  //获取用户用户信息
  user: {
    url: ''
  },

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
    test: false,
    beta: false,                    //beta环境
    prod: false                     //生产环境
  },

  //路径相关
  path: {
    base: location.origin,                     //域名
    indexPath: location.origin,                 //服务器的html入口
    static: location.origin,                    //静态资源域名
    login: ``,                                  //登陆地址
    bindPhone: ``                               //绑定手机地址
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
    origin: '',                         //分享的域名
    title: "blue-vue-tmpl",             //分享的标题
    deps: "blue-vue-tmpl is vue public template",     //分享的简介
    imgUrl: "",                         //分享图片
    //分享相关的参数的
    params: {
      phone: 'n',                     //绑定参数
      redirectUrl: 'redirect_url',    //绑定后重定向回来的参数
      wantUrl: 'want_url'             //想要跳转的地址
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
    timeout: 100000000
  }

};

export default config;