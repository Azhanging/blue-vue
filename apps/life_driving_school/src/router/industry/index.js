const Industry = () => import(`@/views/industry/industry`);
const IndustryDetail = () => import(`@/views/industry/detail/detail`);

 const industry = {
  path: '/industry',
  name: 'industry',
  component: Industry,
  children:[
   {
    path: '/industry/detail/:type',
    name: 'industry-detail',
    component: IndustryDetail,
    meta: {
     tabBar: false
    }
   }
  ]
};

export default industry;