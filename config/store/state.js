//public store state
export const state = {
  weChat: {
    appId: "",
    timestamp: '',
    nonceStr: '',
    signature: ''
  },
  view: {
    navigator: '',          //导航   String | Boolean
    pageFooter: true      //独立页面中底部容器显示控制状态，在页面中的按钮可能因为表单的选中隐藏 Boolean
  }
};