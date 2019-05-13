const consumers = {
  //消费商
  path: 'consumers',
  component: () => import("@/views/member/consumers/consumers"),
  meta: {
    tabBar: 'office'
  },
  children: [
    {
      path: 'invitation-vip',
      component: () => import("@/views/member/consumers/invitation-vip"),
    },
    {
      path: 'earnings',
      component: () => import("@/views/member/consumers/earnings"),
      meta: {
        tabBar: false
      },
    },
    {
      path: 'history',
      component: () => import("@/views/member/consumers/history"),
      meta: {
        tabBar: false
      },
      children: [
        {
          path: 'tb-earnings',
          component: () => import("@/views/member/consumers/tb-earnings"),
        },
        {
          path: 'sc-earnings',
          component: () => import("@/views/member/consumers/sc-earnings"),
        }
      ]
    }
  ]
};

export default consumers;
