//public store state
const state = {
  //微信相关配置
  weChat: {
    appId: "",
    timestamp: '',
    nonceStr: '',
    signature: ''
  },
  //视图相关
  view: {
    tarBar: '',          //导航   String | Boolean
    pageFixed: true      //独立页面中底部容器显示控制状态，在页面中的按钮可能因为表单的选中隐藏 Boolean
  },
  //用户信息
  userInfo: {}
};

export default state;