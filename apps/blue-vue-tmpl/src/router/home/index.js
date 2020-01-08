const home = [{
  path: '/',
  name: 'home',
  component: () => import(`@/views/home/Home.vue`)
}, {
  //登录
  path: '/login',
  component: () => import(`@/views/home/Login.vue`)
}, {
  path: '/bind-phone',
  name: "bind-phone",
  component: () => import(`@/views/home/BindPhone.vue`)
}];

export default home;