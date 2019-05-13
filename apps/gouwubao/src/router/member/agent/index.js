const agent = {
  path: 'agent/:area_id/:level',
  component: () => import("@/views/member/agent/agent"),
  meta:{
    tabBar:'office'
  },
  children: [{
    //历史
    path: 'history',
    component: () => import("@/views/member/agent/history"),//历史收益
    children: [{
      //历史明细
      path: 'history-income',
      component: () => import("@/views/member/agent/history-income"),
    }]
  }, {
    //商城收益
    path: 'shop-income',
    component: () => import("@/views/member/agent/shop-income"),
    children: [{
      //商城收益详情
      path: 'shop-income-detail',
      component: () => import("@/views/member/agent/shop-income-detail"),
      meta: {
        tabBar: false
      }
    }]
  }, {
    //商城收益
    path: 'wait-settle',
    component: () => import("@/views/member/agent/wait-settle"),
  }, {
    //申请退出
    path: 'quit',
    component: () => import("@/views/member/agent/quit"),
    meta: {
      tabBar: false
    }
  }, {
    //代理经费
    path: 'operating-expenses',
    component: () => import("@/views/member/agent/operating-expenses"),
    meta: {
      tabBar: false
    },
    children: [{
      //代理经费
      path: 'operating-expenses-detail',
      component: () => import("@/views/member/agent/operating-expenses-detail"),
      meta: {
        tabBar: false
      }
    }]
  }]
};

export default agent;
