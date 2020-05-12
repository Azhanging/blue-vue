import { photoSwipe, photoSwipeComponent } from 'blue-photoswipe-component';
import BvSwiperScroll from '$components/BvSwiperScroll/BvSwiperScroll';
import BvPicker from '$components/BvPicker/BvPicker';
import BvPickerWindows from '$components/BvPickerWindows/BvPickerWindows';
import BvHeader from '$components/BvHeader/BvHeader';
import BvView from '$components/BvView/BvView';
import BvTabBar from '$components/BvTabBar/BvTabBar';
import BvSuspend from '$components/BvSuspend/BvSuspend';
import BvTransition from '$components/BvTransition/BvTransition';
import BvOverlay from '$components/BvOverlay/BvOverlay';

export function useComponentsInVue(Vue) {
  //图片预览组件PhotoSwipe
  Vue.use(photoSwipe);
  Vue.component('BvPhotoSwipe', photoSwipeComponent);
  //公共头部
  Vue.component('BvHeader', BvHeader);
  //主视图
  Vue.component('BvView', BvView);
  //底部导航
  Vue.component('BvTabBar', BvTabBar);
  //浮层
  Vue.component('BvSuspend', BvSuspend);
  //过渡动画组件
  Vue.component('BvTransition', BvTransition);
  //多view-级联动
  Vue.component('BvPicker', BvPicker);
  Vue.component('BvPickerWindows', BvPickerWindows);
  //滑动模块
  Vue.component('BvSwiperScroll', BvSwiperScroll);
  //弹窗
  Vue.component('BvOverlay', BvOverlay);
}

