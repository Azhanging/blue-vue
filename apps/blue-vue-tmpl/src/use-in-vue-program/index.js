import WTabBar from '../components/wap/w-tab-bar/w-tab-bar';
import BvHomeView from '../components/public/bv-home-view/bv-home-view';
import config from '@config';

export function useInVueProgram(opts) {

  const { Vue } = opts;

  //移动端公共组件
  if (config.device.isWap) {
    Vue.component('w-tab-bar', WTabBar);
  } else if (config.device.isPc) {
    //PC端公共组件

  }

  //移动PC公共使用的组件
  Vue.component('bv-home-view', BvHomeView);
}