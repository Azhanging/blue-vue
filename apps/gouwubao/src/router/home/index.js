import join from './join';

const Home = () => import(`../../views/home/index.vue`);

const home = {
  path: '/',
  name: 'home',
  component: Home,
  children: [
    join
  ]
};

export default home;