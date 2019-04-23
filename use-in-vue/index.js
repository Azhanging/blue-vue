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
import BvPickerWindows from '../components/bv-picker-windows/bv-picker-windows';

import BvHeader from '../components/bv-header/bv-header';
import BvView from '../components/bv-view/bv-view';
import BvTabBar from '../components/bv-tab-bar/bv-tab-bar';
import BvSuspend from '../components/bv-suspend/bv-suspend';
import BvViewTransition from '../components/bv-view-transition/bv-view-transition';
import BvTransition from '../components/bv-transition/bv-transition';
import BvPageList from '../components/bv-page-list/bv-page-list';
import BvBindPhone from '../components/bv-bind-phone/bv-bind-phone';
import BvLayer from '../components/bv-layer/bv-layer';
import BlueValidate from 'blue-validate';
import fastclick from 'fastclick';

import config from '@config';
import { share } from '$assets/js/share';
import { login } from '$assets/js/login';
import { useFilter } from './filter'


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


  //mixin program in Vue
  Vue.mixin({
    data() {
      //项目config
      return { config: config };
    }
  });

  //extend utils in Vue
  Vue.prototype.$utils = utils;

  //base64
  Vue.prototype.$base64 = Base64;

  //公共的分享规则 app, browser, wechat
  Vue.prototype.$share = share;

  //跳转登录
  Vue.prototype.$login = login;

  //过滤器
  useFilter(Vue);

  //use mint
  useMintUi(Vue);

  //axios
  useAxiosInVue(Vue);

  //公共头部
  Vue.component('bv-header', BvHeader);

  //主视图
  Vue.component('bv-view', BvView);

  //底部导航
  Vue.component('bv-tab-bar', BvTabBar);

  //浮层
  Vue.component('bv-suspend', BvSuspend);

  //路由视图过渡动画组件
  Vue.component('bv-view-transition', BvViewTransition);

  //过渡动画组件
  Vue.component('bv-transition', BvTransition);

  //多view-级联动
  Vue.component('bv-picker', BvPicker);
  Vue.component('bv-picker-windows', BvPickerWindows);

  //分页列表
  Vue.component('bv-page-list', BvPageList);

  //滑动模块
  Vue.component('bv-swiper-scroll', BvSwiperScroll);

  //弹窗
  Vue.component('bv-layer', BvLayer);

  //绑定手机
  Vue.component('bv-bind-phone', BvBindPhone);
}
