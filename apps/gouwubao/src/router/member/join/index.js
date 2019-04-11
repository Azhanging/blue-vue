const join = {
  path: 'join',
  component: () => import("@/views/member/join/join.vue"),
  children: [{
    path: 'agent',
    component: () => import("@/views/member/join/agent/agent.vue"),
    meta: {
      tabBar: false
    },
  }]
};

export default join;

