import MNavigator from '../components/m-navigator/m-navigator';
import MHomeView from '../components/m-home-view/m-home-view';

export function useInVueProgram(opts) {
  const { Vue } = opts;
  Vue.component('m-navigator', MNavigator);
  Vue.component('m-home-view', MHomeView);
}