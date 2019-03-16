import MNavigator from '../components/wap/m-navigator/m-navigator';
import MHomeView from '../components/public/m-home-view/m-home-view';
import config from '@config';

export function useInVueProgram(opts) {

  const { Vue } = opts;

  //移动端公共组件
  if (config.device.isWap) {
    Vue.component('m-navigator', MNavigator);
  } else if (config.device.isPc) {
    //PC端公共组件

  }

  //移动PC公共使用的组件
  Vue.component('m-home-view', MHomeView);
}