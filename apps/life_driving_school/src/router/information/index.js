const Zixun  = () => import('@/views/zixun/zixun');
const ZixunDetail = () => import(`@views/zixun/detail/zixun-detail`);


const info = {
  path: '/zixun',
  name: 'zixun',
  component: Zixun,
  children: [{
    path: 'detail',
    name: 'zixun-detail',
    component: ZixunDetail,
    meta:{
      tabBar: false
    }
  }]
};

export default info ;