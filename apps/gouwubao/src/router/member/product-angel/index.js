const ProductAngel = {
  //产品天使
  path: 'product-angel',
  component: () => import("@/views/member/product-angel/product-angel"),
  meta: {
    tabBar: 'office'
  },
  children: [
    {
      path: 'product-income',
      component: () => import("@/views/member/product-angel/product-income"),
    },
    {
      path: 'product-statistics',
      component: () => import("@/views/member/product-angel/product-statistics"),
      meta: {
        tabBar: false
      },
    }
  ]
};

export default ProductAngel;
