const config = {
  view: {
    title: "blue vue tmpl title"       //public document title
  },
  env: {
    isWeChat: /MicroMessenger/ig.test(navigator.userAgent),       //是否在微信端
    isWap: /iPhone|iPad|Android|Windows Phone|KFAPWI|MeeGo/ig.test(navigator.userAgent),  //是否为移动设备
    isIPhone: /iPhone/ig.test(navigator.userAgent),
    isIPad: /iPad/ig.test(navigator.userAgent),
    isAndroid: /Android/ig.test(navigator.userAgent)
  },
  path: {
    base: '',
    static: ''
  },
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
  error: {
    404: {
      page: ''
    }
  },
  axios: {
    timeout: 10000
  }
};

export default config;