const join = {
  path: 'join',
  component: () => import("@/views/home/join/join.vue"),
  children: [{
    path: 'agent',          //VIP介绍
    component: () => import("@/views/home/join/agent.vue"),
    meta: {
      tabBar: false
    },
  }, {
    path: 'agent-apply',      //代理申请
    component: () => import("@/views/home/join/agent-apply.vue"),
    meta: {
      tabBar: false
    },
    children: [{
      //代理申请成功
      path: 'agent-apply-success',
      component: () => import('@/views/home/join/agent-apply-success.vue'),
      meta: {
        tabBar: false
      },
    }]
  }, {
    path: 'vip',          //VIP介绍
    component: () => import("@/views/home/join/vip.vue"),
    meta: {
      tabBar: false
    },
  }, {
    path: 'vip-buy',    //VIP购买
    component: () => import("@/views/home/join/vip-buy.vue"),
    meta: {
      tabBar: false
    },
  }, {
    path: 'creator',    //创客介绍
    component: () => import("@/views/home/join/creator.vue"),
    meta: {
      tabBar: false
    },
  }, {
    path: 'creator-buy',    //创客购买
    component: () => import("@/views/home/join/creator-buy.vue"),
    meta: {
      tabBar: false
    },
  }]
};

export default join;

