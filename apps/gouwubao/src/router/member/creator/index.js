const creator = {
  //创客
  path: 'creator',
  component: () => import("@/views/member/creator/creator"),
  children: [{
    //辅导收益
    path: 'coach-income',
    component: () => import("@/views/member/creator/coach-income")
  }, {
    //辅导收益明细
    path: 'coach-income-detail',
    component: () => import("@/views/member/creator/coach-income-detail"),
    meta: {
      tabBar: false
    }
  }, {
    //待收益
    path: 'wait-settle',
    component: () => import("@/views/member/creator/wait-settle")
  }, {
    //商城收益
    path: 'shop-income',
    component: () => import("@/views/member/creator/shop-income")
  }, {
    //商城收益明细
    path: 'shop-income-detail',
    component: () => import("@/views/member/creator/shop-income-detail"),
    meta: {
      tabBar: false
    }
  }, {
    //我的社群
    path: 'association',
    component: () => import("@/views/member/creator/association")
  }, {
    //添加社群
    path: 'association-add',
    component: () => import("@/views/member/creator/association-add"),
    meta: {
      tabBar: false
    }
  }]
};

export default creator;
