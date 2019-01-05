import MNavHome from './m-nav-home/m-nav-home';
import MViewHome from './m-view-home/m-view-home';

export function programComponent(opts) {
  const { Vue } = opts;
  Vue.component('m-nav-home', MNavHome);
  Vue.component('m-view-home', MViewHome);
}