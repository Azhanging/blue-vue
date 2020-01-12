const home = [{
  //首页
  path: '/',
  name: 'home',
  component: () => import(`@/views/home/Home.vue`),
  meta: {
    tabBar: { name: false }
  }
}, {
  //登录
  path: '/login',
  name: 'login',
  component: () => import(`@/views/home/Login.vue`),
  meta: {
    tabBar: { name: false }
  }
}, {
  //注册
  name: 'register',
  path: '/register',
  component: () => import(`@/views/home/Register.vue`),
  meta: {
    tabBar: { name: false }
  }
}];

export default home;