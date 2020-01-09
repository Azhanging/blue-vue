import utils from 'blue-utils';

//公共的mutation
const mutations = {

  //设置微信config
  SET_WECHAT(state, weChat) {
    state.weChat = weChat;
  },

  //设置导航状态
  SET_TAB_BAR(state, tabBar) {
    state.view.tabBar = utils.extend(state.view.tabBar, tabBar);
  },

  //设置scroll
  SET_SUSPEND(state, suspend = {}) {
    state.view.suspend = utils.extend(state.view.suspend, suspend);
  },

  //设置导航子菜单状态
  SET_TAB_BAR_SUBMENU_INDEX(state, index) {
    state.view.tabBarSubmenuIndex = index;
  },

  //设置page底部fixed状态，focus相关
  SET_PAGE_FIXED(state, status) {
    state.view.pageFixed = status;
  },

  //设置用户信息
  SET_USER_INFO(state, uerInfo) {
    state.userInfo = uerInfo;
  },

  //设置用户手机
  SET_PHONE(state, phone) {
    state.userInfo.phone = phone;
  }

};

export default mutations;