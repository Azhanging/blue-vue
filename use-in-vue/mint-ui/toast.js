import { Toast } from 'mint-ui';
import inBrowser from "$assets/js/in-browser";

let lastToast;

//set toast in Vue
export function setToast(Vue) {
  Vue.prototype.$toast = toast;
  Vue.prototype.$closeToast = closeToast;
}

//打开toast
export function toast(opts) {
  if (inBrowser()) {
    closeToast();
    lastToast = Toast(opts);
  }
}

//关闭toast
export function closeToast() {
  if (lastToast) {
    lastToast.close();
  }
}