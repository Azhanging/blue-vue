//public store state
const state = {
  //视图相关
  view: {
    //浮层相关
    suspend: {
      status: false,
      distance: 0,
    },
    tabBar: {
      name: "",
    },
    pageFixed: true, //独立页面中底部容器显示控制状态，在页面中的按钮可能因为表单的选中隐藏 Boolean
  },
  //用户信息
  auth: {
    userInfo: null,
  },
};

export default state;
