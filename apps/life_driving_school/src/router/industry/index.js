

 const industry = {
  path: '/industry',
  name: 'industry',
  component: resolve => require(['@/views/industry/industry.vue'], resolve),
  children:[
   {
    path: 'detail/:type',
    name: 'industry-detail',
    component: resolve => require(['@/views/industry/detail/detail.vue'], resolve)
   }
  ]
};

export default industry;