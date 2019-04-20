const Home = () => import(`@/views/home/home`);
const Sign = () => import ('@/views/sign/sign');
const Search = () => import ('@/views/search/search');
const SearchDetail = () => import ('@/views/search/detail/search-detail');

const home = {
  path: '/',
  name: 'home',
  component: Home,
  children: [{
    path: 'sign',
    name: 'sign',
    component: Sign,
    meta: {
      tabBar: false
    }
  }, {
    path: 'search',
    name: 'search',
    component: Search,
    meta: {
      tabBar: false
    },
    children: [{
      path: 'detail/:article_id',
      name: 'search-detail',
      component: SearchDetail,
      meta: {
        tabBar: false
      }
    }]
  }]
};

export default home;