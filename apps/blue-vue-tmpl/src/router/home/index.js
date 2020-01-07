const home = [{
  path: '/',
  name: 'home',
  component: () => import(`@/views/home/Home.vue`)
}, {
  path: '/scroll1',
  component: () => import(`@/views/home/Scroll1.vue`)
}, {
  path: '/scroll2',
  component: () => import(`@/views/home/Scroll2.vue`),
  meta: {
    scroll: {
      status: true
    }
  }
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