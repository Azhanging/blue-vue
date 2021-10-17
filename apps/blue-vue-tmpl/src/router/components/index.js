import { weChatShare } from '$wechat';

const tabBar = {
  name: `components`
};

const tabBarHidden = {
  name: false
};

const components = [{
  path: '/components',
  component: () => import(`@/views/components/components.vue`),
  meta: {
    title: 'component',
    tabBar,
    name: `components`
  }
}, {
  path: '/components/blue-validate',
  component: () => import(`@/views/components/validate/validate.vue`),
  meta: {
    title: '验证标题',
    tabBar: tabBarHidden
  }
}, {
  path: '/components/picker',
  component: () => import(`@/views/components/picker/picker.vue`),
  meta: {
    title: '滚动组件',
    tabBar: tabBarHidden
  }
}, {
  path: '/components/swiper-scroll',
  component: () => import(`@/views/components/swiper-scroll/swiper-scroll.vue`),
  children: [{
    path: ':id',
    component: () => import(`@/views/components/swiper-scroll/swiper-scroll.vue`)
  }]
}, {
  path: '/components/scroll/:id',
  component: () => import(`@/views/components/scroll/scroll`),
  meta: {
    title: 'scroll',
    tabBar
  }
}];

export default components;