const Home = () => import(`../../views/home/index.vue`);
const TestScroll = () => import(`../../views/home/test-scroll/test-scroll.vue`);
const TestScrollChildren = () => import(`../../views/home/test-scroll/test-scroll-children/test-scroll-children.vue`);
const TestLogin = () => import(`../../views/home/test-login/test-login.vue`);

const home = {
  path: '/',
  name: 'home',
  component: Home,
  children: [{
    path: 'test-scroll',
    component: TestScroll,
    children: [{
      path: 'test-scroll-children',
      component: TestScrollChildren,
    }]
  },{
    path: 'test-login',
    component: TestLogin
  }]
};

export default home;