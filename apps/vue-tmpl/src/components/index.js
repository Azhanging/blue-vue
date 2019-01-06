import MNavigator from './m-navigator/m-navigator';
import MHomeView from './m-home-view/m-home-view';

export function programComponent(opts) {
  const { Vue } = opts;
  Vue.component('m-navigator', MNavigator);
  Vue.component('m-home-view', MHomeView);
}