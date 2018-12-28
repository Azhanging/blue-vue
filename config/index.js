export const config = {
  env: {
    isWeChat: /MicroMessenger/ig.test(navigator.userAgent)
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