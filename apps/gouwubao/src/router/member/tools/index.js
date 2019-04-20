const tools = {
  path: 'tools',
  component: () => import('@/views/member/tools/tools'),
  children: [{
    path: 'association',
    component: () => import('@/views/member/tools/association')
  },{
    path: 'generalize',
    component: () => import('@/views/member/tools/generalize')
  },{
    path: 'doing-every-day',
    component: () => import('@/views/member/tools/doing-every-day')
  },{
    path: 'meeting',
    component: () => import('@/views/member/tools/meeting')
  },{
    path: 'introduction',
    component: () => import('@/views/member/tools/introduction')
  }]
};

export default tools;