//公共的mutation
const mutations = {

  //设置微信config
  setWeChat(state, weChat) {
    state.weChat = weChat;
  },

  //设置导航状态
  setTabBar(state, tabBar) {
    state.view.tabBar = tabBar;
  },

  //设置page底部fixed状态，focus相关
  setPageFixed(state, status) {
    state.view.pageFixed = status;
  },

  //设置用户信息
  setUserInfo(state, uerInfo) {
    state.userInfo = uerInfo;
  },

  //设置用户手机
  setPhone(state, phone) {
    state.userInfo.phone = phone;
  }

};

export default mutations;