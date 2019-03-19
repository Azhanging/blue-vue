const Home = () => import(`../../views/home/index.vue`);

const home = {
  path: '/home',
  name: 'home',
  component: Home,
  children:[]
};

export default home;