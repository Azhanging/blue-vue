const Zixun  = () => import('@/views/zixun/zixun');
const ZixunDetail = () => import(`@views/zixun/detail/zixun-detail`);


const info = {
  path: '/zixun/:id',
  name: 'zixun',
  component: Zixun,
  meta: {
    pathID: 1
  },
  children: [{
    path: 'detail/:article_id',
    name: 'zixun-detail',
    component: ZixunDetail,
    meta:{
      tabBar: false
    }
  }]
};

export default info ;