import { Toast } from 'mint-ui';
import { inBrowser } from "../../../public/js/in-browser";

let lastToast;

//set toast in Vue
export function setToast(Vue) {
  Vue.prototype.$toast = $toast;
}

export function $toast(opts) {
  if(inBrowser()){
    if (lastToast) {
      lastToast.close();
    }
    lastToast = Toast(opts);
  }
}