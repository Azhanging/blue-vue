const Industry = () => import(`@/views/industry-research/industry-research`);
const IndustryDetail = () => import(`@/views/industry-research/detail`);

 const industry = {
  path: '/industry',
  name: 'industry',
  component: Industry,
  children:[
   {
    path: '/industry/detail/:type',
    name: 'industry-detail',
    component: IndustryDetail
   }
  ]
};

export default industry;