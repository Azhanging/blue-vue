import { useVueAwesomeSwiper } from './swiper/index';
import { useAxiosInVue } from './axios/index';
import { useMintUi } from './mint-ui/index';
import { useUpload } from '../components/vue-upload-component/upload';
import { Base64 } from 'js-base64';   //base64
import inBrowser from "$assets/js/in-browser";
import { useWeChatInVue } from '$wechat';
import utils from 'blue-utils';

import BvSwiperScroll from '../components/bv-swiper-scroll/bv-swiper-scroll';
import BvPicker from '../components/bv-picker/bv-picker';
import BvHeader from '../components/bv-header/bv-header';
import BvView from '../components/bv-view/bv-view';
import BvNav from '../components/bv-nav/bv-nav';
import BvSuspend from '../components/bv-suspend/bv-suspend';
import BvTransition from '../components/bv-transition/bv-transition';
import BvPageList from '../components/bv-page-list/bv-page-list';
import BlueValidate from 'blue-validate';
import fastclick from 'fastclick';

import timeFilter from '$assets/js/timer.js'

import config from '@config';
import { share } from '$assets/js/share';


import { photoSwipe, photoSwipeComponent } from 'blue-photoswipe-component';

// 注：
// 修改过两个对应的插件
// npm install 后，使用前从components/vue-picture-preview/index复制到node_modules指定的包中
// npm install 后，使用前从components/vue-upload-component/vue-upload-component.js复制到node_modules指定的包中
// 具体查看包的package主入口使用


//使用插件到vue上
export function useInVue(opts = {}) {

  const { Vue } = opts;

  if (inBrowser()) {

    useWeChatInVue(Vue);

    //use fastclick
    fastclick.attach(document.body);

    //图片预览组件PhotoSwipe
    Vue.use(photoSwipe);
    Vue.component('blue-photo-swipe', photoSwipeComponent);

    //验证规则
    Vue.use(BlueValidate);

    //upload
    useUpload(Vue);

    //swiper
    useVueAwesomeSwiper(Vue);
  }

	Vue.filter('timeFilter', timeFilter)

  //extend program in Vue
  Vue.prototype.$config = config;

  //extend utils in Vue
  Vue.prototype.$utils = utils;

  //base64
  Vue.prototype.$base64 = Base64;

  //公共的分享规则 app, browser, wechat
  Vue.prototype.$share = share;

  //use mint
  useMintUi(Vue);

  //axios
  useAxiosInVue(Vue);

  //公共头部
  Vue.component('bv-header', BvHeader);

  //主视图
  Vue.component('bv-view', BvView);

  //底部导航
  Vue.component('bv-nav', BvNav);

  //浮层
  Vue.component('bv-suspend', BvSuspend);

  //路由过渡动画组件
  Vue.component('bv-transition', BvTransition);

  //多级联动
  Vue.component('bv-picker', BvPicker);

  //分页列表
  Vue.component('bv-page-list', BvPageList);

  //滑动模块
  Vue.component('bv-swiper-scroll', BvSwiperScroll);
}
