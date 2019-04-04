import { weChatShare } from '$wechat';

const Components = () => import(`../../views/components/components.vue`);
const Swiper = () => import(`../../views/components/vue-awesome-swiper/vue-awesome-swiper.vue`);
const Upload = () => import(`../../views/components/vue-upload-component/vue-upload-component.vue`);
const Scroll = () => import(`../../views/components/scroll/scroll`);
const Picker = () => import(`../../views/components/picker/picker.vue`);
const PageList = () => import(`../../views/components/page-list/page-list.vue`);
const Validate = () => import(`../../views/components/validate/validate.vue`);
const SwiperScroll = () => import(`../../views/components/swiper-scroll/swiper-scroll.vue`);

const components = {
  path: '/components',
  name: 'components',
  component: Components,
  meta: {
    afterHook() {
      weChatShare({
        title: 'components'
      });
    },
    title: 'component',
    tabBar: 'components'
  },
  children: [{
    path: 'blue-validate',
    component: Validate,
    meta: {
      afterHook() {     //router after each 钩子
        weChatShare({       //特定的微信分享
          title: 'blue-validate'
        });
      },
      title: '验证标题',
      tabBar: false
    }
  }, {
    path: 'page-list',
    component: PageList,
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
    path: 'vue-awesome-swiper',
    component: Swiper,
    meta: {
      title: '滑动组件',
      afterHook() {
        weChatShare({       //特定的微信分享
          title: 'page-list'
        });
      }
    }
  }, {
    path: 'vue-upload-component',
    component: Upload,
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
    path: 'picker',
    component: Picker,
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
    path: 'swiper-scroll',
    component: SwiperScroll,
    children: [{
      path: ':id',
      component: SwiperScroll
    }]
  }, {
    path: 'scroll',
    component: Scroll,
    meta: {
      title: 'scroll',
      tabBar: 'components',
      afterHook() {
        weChatShare({
          title: 'scroll'
        });
      }
    }
  }]
};

export default components;