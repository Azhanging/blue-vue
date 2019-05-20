const producers = {
  //生产商
  path: 'producers',
  component: () => import("@/views/member/producers/producers"),
  meta: {
    tabBar: 'office'
  },
  children: [
    {
      path: 'returns-detailed',
      component: () => import("@/views/member/producers/returns-detailed"),
      meta: {
        tabBar: false
      },
    }
  ]
};

export default producers;
