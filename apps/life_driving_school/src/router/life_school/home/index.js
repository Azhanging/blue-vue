// const Home = () => import(`@/views/life_school/home`);

const home = {
  path: '/',
  name: 'home',
  component: resolve => require(['@/views/life_school/home'], resolve),
  children:[]
};

export default home;