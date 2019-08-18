/*进度条*/
import NProgress from 'nprogress';
import "nprogress/nprogress.css";

import { useVueAwesomeSwiper } from './swiper';
import { useAxiosInVue } from './axios';
import { useMintUi } from './mint-ui';
import { useUpload } from '$components/VueUploadComponent/upload';
import { Base64 } from 'js-base64';   //base64
import inBrowser from "$assets/js/in-browser";
import { useWeChatInVue } from '$wechat';
import utils from 'blue-utils';

import BvSwiperScroll from '../components/BvSwiperScroll/BvSwiperScroll';
import BvPicker from '../components/BvPicker/BvPicker';
import BvPickerWindows from '../components/BvPickerWindows/BvPickerWindows';

import BvHeader from '../components/BvHeader/BvHeader';
import BvView from '../components/BvView/BvView';
import BvTabBar from '../components/BvTabBar/BvTabBar';
import BvSuspend from '../components/BvSuspend/BvSuspend';
import BvViewTransition from '../components/BvViewTransition/BvViewTransition';
import BvTransition from '../components/BvTransition/BvTransition';
import BvPageList from '../components/BvPageList/BvPageList';
import BvBindPhone from '../components/BvBindPhone/BvBindPhone';
import BvLayer from '../components/BvLayer/BvLayer';
import BlueValidate from 'blue-validate';
import fastclick from 'fastclick';

import config from '@config';
import { share } from '$assets/js/share';
import { login } from '$assets/js/login';
import { useFilter } from './filter'


import { photoSwipe, photoSwipeComponent } from 'blue-photoswipe-component';

// 注：
// 修改过两个对应的插件
// npm install 后，使用前从npm-package/vue-upload-component/vue-upload-component.js复制到node_modules指定的包中
// 具体查看包的package主入口使用


//使用插件到vue上
export function useInVue(opts = {}) {

  const { Vue } = opts;

  if (inBrowser()) {

    NProgress.configure({
      showSpinner: false
    });

    useWeChatInVue(Vue);

    //use fastclick
    fastclick.attach(document.body);

    //图片预览组件PhotoSwipe
    Vue.use(photoSwipe);

    Vue.component('BluePhotoSwipe', photoSwipeComponent);

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
      return {
        config
      };
    }
  });

  //extend utils in Vue
  Vue.prototype.$utils = utils;

  //base64
  Vue.prototype.$base64 = Base64;

  //公共的分享规则 app, browser, wechat
  Vue.prototype.$share = share;

  //过滤器
  useFilter(Vue);

  //use mint
  useMintUi(Vue);

  //axios
  useAxiosInVue(Vue);

  //公共头部
  Vue.component('BvHeader', BvHeader);

  //主视图
  Vue.component('BvView', BvView);

  //底部导航
  Vue.component('BvTabBar', BvTabBar);

  //浮层
  Vue.component('BvSuspend', BvSuspend);

  //路由视图过渡动画组件
  Vue.component('BvViewTransition', BvViewTransition);

  //过渡动画组件
  Vue.component('BvTransition', BvTransition);

  //多view-级联动
  Vue.component('BvPicker', BvPicker);
  Vue.component('BvPickerWindows', BvPickerWindows);

  //分页列表
  Vue.component('BvPageList', BvPageList);

  //滑动模块
  Vue.component('BvSwiperScroll', BvSwiperScroll);

  //弹窗
  Vue.component('BvLayer', BvLayer);

  //绑定手机
  Vue.component('BvBindPhone', BvBindPhone);
}
