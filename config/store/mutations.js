//公共的mutation
const mutations = {

  //设置微信config
  setWeChat(state, weChat) {
    state.weChat = weChat;
  },

  //设置导航状态
  setNavigator(state, navigator) {
    state.view.navigator = navigator;
  },

  //设置page底部fixed状态，focus相关
  setPageFixed(state, status) {
    state.view.pageFixed = status;
  },

  //设置用户信息
  setUserInfo(state, uerInfo) {
    state.userInfo = uerInfo;
  }
};

export default mutations;