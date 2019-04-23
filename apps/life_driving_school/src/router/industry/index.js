const Industry = () => import(`@/views/industry/industry`);
const IndustryDetail = () => import(`@/views/industry/detail/detail`);

const industry = {
  path: '/industry/:id',
  name: 'industry',
  component: Industry,
  meta: {
    pathID: [2]
  },
  children: [
    {
      path: 'detail/:article_id',
      name: 'industry-detail',
      component: IndustryDetail,
      meta: {
        tabBar: false
      }
    }
  ]
};

export default industry;