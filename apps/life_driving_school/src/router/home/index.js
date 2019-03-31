// const Home = () => import(`@/views/home`);

const home = {
  path: '/',
  name: 'home',
  component: resolve => require(['@/views/home/home.vue'], resolve),
  children:[{
    path: 'sign',
    name: 'home',
    component: resolve => require(['@/views/home/sign/sign.vue'], resolve),
  }]
};

export default home;