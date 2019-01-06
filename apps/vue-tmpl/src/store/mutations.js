const mutations = {
  setWeChat(state, weChat) {
    state.weChat = weChat;
  },
  setNavigator(state, navigator) {
    state.view.navigator = navigator;
  },
  setRouterLevel(state, level) {
    state.router.level = level;
  }
};

export default mutations;