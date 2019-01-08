const Home = () => import(`../../views/home/index.vue`);

const home = {
  path: '/',
  name: 'home',
  component: Home
};

export default home;