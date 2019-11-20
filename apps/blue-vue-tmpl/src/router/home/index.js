const home = [{
  path: '/',
  name: 'home',
  component: () => import(`@/views/home/Home.vue`),
  children: [{
    path: 'test-scroll',
    component: () => import(`@/views/home/test-scroll/test-scroll.vue`),
    children: [{
      path: 'test-scroll-children',
      component: () => import(`@/views/home/test-scroll/test-scroll-children/test-scroll-children.vue`),
    }]
  }]
}, {
  //登录
  path: 'login',
  component: () => import(`@/views/home/Login.vue`)
}];

export default home;