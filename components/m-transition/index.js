import Transition from './m-transition';

export function useTransitionInVue(Vue) {
  Vue.component('m-transition', Transition);
}