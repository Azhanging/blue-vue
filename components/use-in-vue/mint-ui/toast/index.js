import { Toast } from 'mint-ui';

//set toast in Vue
export function setToast(Vue) {
  let lastToast;
  Vue.prototype.$toast = function (opts) {
    if (lastToast) {
      lastToast.close();
    }
    lastToast = Toast(opts);
  };
}