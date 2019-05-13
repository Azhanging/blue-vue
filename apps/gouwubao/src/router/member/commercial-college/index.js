const CommercialCollege = {
  //上大夫商学院
  path: 'commercial-college',
  component: () => import("@/views/member/commercial-college/commercial-college"),
  meta: {
    tabBar: 'office'
  },
  children: [
    {
      path: 'returns-detailed',
      component: () => import("@/views/member/commercial-college/returns-detailed"),
      meta: {
        tabBar: false
      },
    },
  ]
};

export default CommercialCollege;
