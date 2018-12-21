import Vue from 'vue';
import Router from 'vue-router';
import { afterEach } from "./router-after-each";

const Home = () => import(`../views/home/index.vue`);
const Components = () => import(`../views/components/components.vue`);
const PullTo = () => import(`../views/components/vue-pull-to/vue-pull-to.vue`);
const Swiper = () => import(`../views/components/vue-awesome-swiper/vue-awesome-swiper.vue`);
const Upload = () => import(`../views/components/vue-upload-component/vue-upload-component.vue`);
const MintUi = () => import(`../views/components/mint-ui/mint-ui.vue`);
const Scroll = () => import(`../views/components/mint-ui/scroll/scroll.vue`);
const Picker = () => import(`../views/components/mint-ui/picker/picker.vue`);

const Validate = () => import(`../views/components/validate/validate.vue`);



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
    children: [{
      path: 'vue-pull-to',
      component: PullTo
    }, {
      path: 'blue-validate',
      component: Validate
    },{
      path: 'vue-awesome-swiper',
      component: Swiper
    }, {
      path: 'vue-upload-component',
      component: Upload
    }, {
      path: 'mint-ui',
      component: MintUi,
      children: [{
        path: 'scroll',
        component: Scroll
      }, {
        path: 'picker',
        component: Picker
      }]
    }]
  }]
});

afterEach(router);

export default router;
