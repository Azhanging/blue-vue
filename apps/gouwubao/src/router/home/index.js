import join from './join';
import config from '@config';

const Home = () => import(`../../views/home/index.vue`);

const home = {
  path: '/',
  name: 'home',
  //回到旧项目的办公室
  redirect() {
    location.href = `${config.path.base}`;
  },
  component: Home,
  children: [
    join
  ]
};

export default home;