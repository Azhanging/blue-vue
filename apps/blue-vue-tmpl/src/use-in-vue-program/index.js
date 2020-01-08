import WTabBar from '../components/wap/WTabBar/WTabBar';
import config from '@config';

export function useInVueProgram(opts) {

  const { Vue } = opts;

  //移动端公共组件
  if (config.device.isWap) {
    Vue.component('WTabBar', WTabBar);
  } else if (config.device.isPc) {
    //PC端公共组件

  }
}