

 const industry = {
  path: '/industry',
  name: 'industry',
  component: resolve => require(['@/views/industry-research/industry-research.vue'], resolve),
  children:[
   {
    path: '/industry/detail/:type',
    name: 'industry-detail',
    component: resolve => require(['@/views/industry-research/detail.vue'], resolve)
   }
  ]
};

export default industry;