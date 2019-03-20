const Home = () => import(`../../views/home/index.vue`);
const TestScroll = () => import(`../../views/home/test-scroll/test-scroll.vue`);
const TestScrollChildren = () => import(`../../views/home/test-scroll/test-scroll-children/test-scroll-children.vue`);

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
  }]
};

export default home;