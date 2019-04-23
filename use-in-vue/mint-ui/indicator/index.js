import { Indicator } from 'mint-ui';
import inBrowser from "$assets/js/in-browser";

export function setIndicator(Vue) {

  //indicator
  Vue.prototype.$indicator = Indicator;

  //open loadding
  Vue.prototype.$loading = $loading;

  //close loadding
  Vue.prototype.$closeLoading = $closeLoading;

}

//loading的id
let loadingID = 0;

export function $closeLoading(id) {
  if (!inBrowser()) return;
  if (!id || (id === loadingID)) {
    Indicator.close();
  }
}

export function $loading(opts = {}) {
  if (inBrowser()) {
    let config = {
      text: opts.text || '加载中...',
      spinnerType: opts.spinnerType || 'snake'
    };
    if (!opts.text) {
      delete config.text;
    }
    Indicator.open(config);
    return ++loadingID;
  }
  return 0;
}