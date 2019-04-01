const Home = () => import(`@/views/home/home`);
const Sign = () => import ('@/views/home/sign');
const Search = () => import ('@/views/home/search');

const home = {
  path: '/',
  name: 'home',
  component: Home,
  children:[{
    path: 'sign',
    name: 'home',
    component: Sign,
  },{
    path: 'search',
    name: 'search',
    component: Search
  }]
};

export default home;