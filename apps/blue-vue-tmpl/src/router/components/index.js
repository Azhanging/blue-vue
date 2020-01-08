import { weChatShare } from '$wechat';

const components = [{
  path: '/components',
  name: 'components',
  component: () => import(`@/views/components/components.vue`),
  meta: {
    afterHook() {
      weChatShare({
        title: 'components'
      });
    },
    title: 'component',
    tabBar: 'components'
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
    tabBar: false,
    keepAlive: false
  }
}, {
  path: '/components/page-list',
  component: () => import(`@/views/components/page-list/page-list.vue`),
  meta: {
    title: 'page list',
    tabBar: 'page',     //不存在的导航，默认设置为false
    afterHook() {
      weChatShare({       //特定的微信分享
        title: 'page-list'
      });
    }
  }
}, {
  path: '/components/vue-awesome-swiper',
  component: () => import(`@/views/components/vue-awesome-swiper/vue-awesome-swiper.vue`),
  meta: {
    title: '滑动组件',
    afterHook() {
      weChatShare({       //特定的微信分享
        title: 'page-list'
      });
    }
  }
}, {
  path: '/components/vue-upload-component',
  component: () => import(`@/views/components/vue-upload-component/vue-upload-component.vue`),
  meta: {
    title: '上传组件',
    tabBar: false,
    afterHook() {
      weChatShare({       //特定的微信分享
        title: '上传组件'
      });
    }
  }
}, {
  path: '/components/picker',
  component: () => import(`@/views/components/picker/picker.vue`),
  meta: {
    title: '滚动组件',
    tabBar: false,
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
    tabBar: 'components',
    afterHook() {
      weChatShare({
        title: 'scroll'
      });
    }
  }
}];

export default components;