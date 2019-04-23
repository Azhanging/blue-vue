const contract = {
  path: 'contract',
  component: () => import('@/views/member/contract/contract'),
  children: [{
    path: 'creator',
    component: () => import('@/views/member/contract/creator')
  }, {
    path: 'consumer',
    component: () => import('@/views/member/contract/consumer')
  }, {
    path: 'agent',
    component: () => import('@/views/member/contract/agent')
  }]
};

export default contract;