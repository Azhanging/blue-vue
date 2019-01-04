export const config = {
  view: {
    title: "blue vue tmpl title"       //public document title
  },
  env: {
    isWeChat: /MicroMessenger/ig.test(navigator.userAgent),
    isWap: /iPhone|Android|Windows Phone|KFAPWI|MeeGo/.test(navigator.userAgent)
  },
  path: {
    base: '',
    static: '',
    ['404']: ''
  },
  session: {
    storage: {}
  },
  weChat: {     //微信相关
    share: {      //分享相关
      title: "blue-vue-tmpl",
      deps: "blue-vue-tmpl is vue public template",
      imgUrl: "",
      link: ""
    }
  },
  error: {},
  axios: {
    timeout: 6000
  }
};

export function extendConfigInVue(Vue) {
  Vue.mixin({
    data() {
      return {
        programConfig: config
      }
    }
  });
}