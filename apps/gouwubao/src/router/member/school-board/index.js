const SchoolBoard = {
  //荣誉校董
  path: 'school-board',
  component: () => import("@/views/member/school-board/school-board"),
  meta: {
    tabBar: 'office'
  },
  children: [
    {
      path: 'scholarship',
      component: () => import("@/views/member/school-board/scholarship"),
      meta: {
        tabBar: false
      }
    },
    {
      path: 'recent-news',
      component: () => import("@/views/member/school-board/recent-news"),
      meta: {
        tabBar: false
      }
    },
  ],
};

export default SchoolBoard;
