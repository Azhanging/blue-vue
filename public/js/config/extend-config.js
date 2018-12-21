import programConfig from '@config';

export function extendConfigInVue(Vue) {
  Vue.mixin({
    data() {
      return {
        programConfig
      }
    }
  });
}