export const config = {
  view: {
    title: "blue vue tmpl title"       //public document title
  },
  env: {
    isWeChat: /MicroMessenger/ig.test(navigator.userAgent),       //是否在微信端
    isWap: /iPhone|Android|Windows Phone|KFAPWI|MeeGo/.test(navigator.userAgent),  //是否为移动设备
    isIphone: /iPhone/ig.test(navigator.userAgent),
    isAndroid: /Android/ig.test(navigator.userAgent)
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
    share: {      //公共的分享相关
      title: "blue-vue-tmpl",
      deps: "blue-vue-tmpl is vue public template",
      imgUrl: "",
      link: "" || function (link) {
        return `${link}?p=1`;
      }
    },
    getConfig: {
      type: 'get',
      url: '',
      data: {}
    }
  },
  error: {},
  axios: {
    timeout: 10000
  }
};

// this.programConfig 为当前项目配置信息
export function useConfigInVue(Vue) {
  Vue.mixin({
    data() {
      return {
        programConfig: config
      }
    }
  });
}