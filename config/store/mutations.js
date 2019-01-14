//公共的mutation
const mutations = {
  setWeChat(state, weChat) {
    state.weChat = weChat;
  },
  setNavigator(state, navigator) {
    state.view.navigator = navigator;
  },
  setPageFooter(state, status) {
    state.view.pageFooter = status;
  }
};

export default mutations;