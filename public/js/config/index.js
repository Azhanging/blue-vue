export const config = {
  env:{
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
    share: {
      title: "blue-vue-tmpl",
      deps: "blue-vue-tmpl is vue public template"
    }
  },
  error: {}
};