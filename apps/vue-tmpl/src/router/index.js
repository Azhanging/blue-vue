import Vue from 'vue';
import Router from 'vue-router';
import { wxShare } from '$wechat';
import { routerAfterEach } from "./routes-after";

const Home = () => import(`../views/home/index.vue`);
const Components = () => import(`../views/components/components.vue`);
const Swiper = () => import(`../views/components/vue-awesome-swiper/vue-awesome-swiper.vue`);
const Upload = () => import(`../views/components/vue-upload-component/vue-upload-component.vue`);
const Scroll = () => import(`../views/components/scroll/scroll`);
const Picker = () => import(`../views/components/picker/picker.vue`);
const PageList = () => import(`../views/components/page-list/page-list.vue`);
const Validate = () => import(`../views/components/validate/validate.vue`);
const SwiperScroll = () => import(`../views/components/swiper-scroll/swiper-scroll.vue`);

Vue.use(Router);

const router = new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: Home
  }, {
    path: '/components',
    name: 'components',
    component: Components,
    meta: {
      afterHook() {
        wxShare({
          title: 'components'
        });
      },
      title: 'component'
    },
    children: [{
      path: 'blue-validate',
      component: Validate,
      meta: {
        afterHook() {
          wxShare({
            title: 'blue-validate'
          });
        },
        title: '验证标题'
      }
    }, {
      path: 'page-list',
      component: PageList,
      meta: {
        title: 'page list'
      }
    }, {
      path: 'vue-awesome-swiper',
      component: Swiper
    }, {
      path: 'vue-upload-component',
      component: Upload
    }, {
      path: 'picker',
      component: Picker
    }, {
      path: 'swiper-scroll',
      component: SwiperScroll,
      children: [{
        path: ':id',
        component: SwiperScroll
      }]
    }, {
      path: 'scroll',
      component: Scroll
    }]
  }]
});

//router after each
routerAfterEach({
  router,
  unMatchHook() {
    wxShare();
  }
});

export default router;
