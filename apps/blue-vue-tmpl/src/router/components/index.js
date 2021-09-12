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
    afterHook() {
      weChatShare({
        title: 'components'
      });
    },
    title: 'component',
    tabBar,
    name: `components`
  }
}, {
  path: '/components/blue-validate',
  component: () => import(`@/views/components/validate/validate.vue`),
  meta: {
    afterHook() {     //router after each 钩子
      weChatShare({       //特定的微信分享
        title: 'blue-validate'
      });
    },
    title: '验证标题',
    tabBar: tabBarHidden
  }
}, {
  path: '/components/picker',
  component: () => import(`@/views/components/picker/picker.vue`),
  meta: {
    title: '滚动组件',
    tabBar: tabBarHidden,
    afterHook() {
      weChatShare({       //特定的微信分享
        title: '滚动组件'
      });
    }
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
    tabBar,
    afterHook() {
      weChatShare({
        title: 'scroll'
      });
    }
  }
}];

export default components;