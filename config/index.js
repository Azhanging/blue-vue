const config = {

  //视图相关
  view: {
    title: "blue vue tmpl title",       //public document title
    navigator: false
  },

  //环境相关
  env: {
    isWeChat: /MicroMessenger/ig.test(navigator.userAgent),       //是否在微信端
    isWap: /iPhone|iPad|Android|Windows Phone|KFAPWI|MeeGo/ig.test(navigator.userAgent),  //是否为移动设备
    isIPhone: /iPhone/ig.test(navigator.userAgent),
    isIPad: /iPad/ig.test(navigator.userAgent),
    isAndroid: /Android/ig.test(navigator.userAgent)
  },

  //路径相关
  path: {
    base: '',
    static: ''
  },

  //登录状态 （方案暂不采用http header处理）
  session: {
    storage: {}
  },

  //微信相关
  weChat: {
    getConfig: {
      type: 'get',
      url: '',
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
      phone: 'n'
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
      page: ''
    }
  },

  //request相关
  axios: {
    timeout: 10000
  }

};

export default config;