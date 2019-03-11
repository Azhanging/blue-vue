import { useVueAwesomeSwiper } from './swiper/index';
import { useAxios } from './axios/index';
import { useMintUi } from './mint-ui/index';
import { useUpload } from '../components/vue-upload-component/upload';
import { inBrowser } from "$assets/js/in-browser";

import { useWeChatInVue } from '$wechat';
import { useConfigInVue } from '../config/index';
import utils from 'blue-utils';

import SwiperScroll from '../components/m-swiper-scroll/m-swiper-scroll';
import Picker from '../components/m-picker/m-picker';
import MHeader from '../components/m-header/m-header';
import MView from '../components/m-view/m-view';
import MNav from '../components/m-nav/m-nav';
import Suspend from '../components/m-suspend/m-suspend';
import Transition from '../components/m-transition/m-transition';
/*import vuePicturePreview from 'vue-picture-preview';*/
import PageList from '../components/m-page-list/m-page-list';
import BlueValidate from 'blue-validate';
import fastclick from 'fastclick';


import { photoSwipe, photoSwipeComponent } from 'blue-photoswipe-component';

// 注：
// 修改过两个对应的插件
// npm install 后，使用前从components/vue-picture-preview/index复制到node_modules指定的包中
// npm install 后，使用前从components/vue-upload-component/vue-upload-component.js复制到node_modules指定的包中
// 具体查看包的package主入口使用


//使用插件到vue上
export function useInVue(opts = {}) {

  const { Vue, Axios } = opts;

  if (inBrowser()) {

    useWeChatInVue(Vue);

    //use fastclick
    fastclick.attach(document.body);

    //图片预览组件
    /*Vue.use(vuePicturePreview);*/

    //图片预览组件PhotoSwipe
    Vue.use(photoSwipe);
    Vue.component('blue-photo-swiper', photoSwipeComponent);

    //验证规则
    Vue.use(BlueValidate);

    //upload
    useUpload(Vue);

    //swiper
    useVueAwesomeSwiper(Vue);
  }

  //extend program in Vue
  useConfigInVue(Vue);

  //extend utils in Vue
  Vue.prototype.$utils = utils;

  //use mint
  useMintUi(Vue);

  //axios
  useAxios(Vue, Axios);

  //公共头部
  Vue.component('m-header', MHeader);

  //主视图
  Vue.component('m-view', MView);

  //底部导航
  Vue.component('m-nav', MNav);

  //浮层
  Vue.component('m-suspend', Suspend);

  //路由过渡动画组件
  Vue.component('m-transition', Transition);

  //多级联动
  Vue.component('m-picker', Picker);

  //分页列表
  Vue.component('m-page-list', PageList);

  //滑动模块
  Vue.component('m-swiper-scroll', SwiperScroll);
}
