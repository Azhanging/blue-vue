const Zixun  = () => import('@/views/zixun/zixun');
const ZixunDetail = () => import(`@views/zixun/zixun-detail`);


const info = {
  path: '/zixun',
  name: 'zixun',
  component: Zixun,
  children: [{
    path: 'detail',
    name: 'zixun-detail',
    component: ZixunDetail
  }]
};

export default info ;