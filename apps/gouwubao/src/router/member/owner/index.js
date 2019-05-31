const owner = {
  //项目金主
  path: 'owner',
  component: () => import("@/views/member/owner/owner"),
  meta: {
    tabBar: 'office'
  },
  children:[
    {
      path: 'recent-news',
      component: () => import("@/views/member/owner/recent-news"),
      meta: {
        tabBar: false
      }
    },
  ]
};

export default owner;
