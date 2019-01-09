import { Indicator } from 'mint-ui';
import { inBrowser } from "$public/js/in-browser";

export function setIndicator(Vue) {

  //indicator
  Vue.prototype.$indicator = Indicator;

  //open loadding
  Vue.prototype.$loadding = $loadding;

  //close loadding
  Vue.prototype.$closeLoadding = $closeLoadding;

}

export function $closeLoadding() {
  if(inBrowser()){
    Indicator.close();
  }
}

export function $loadding(opts = {}) {
  if(inBrowser()){
    let config = {
      text: opts.text || '加载中...',
      spinnerType: opts.spinnerType || 'snake'
    };
    if (!opts.text) {
      delete config.text;
    }
    Indicator.open(config);
  }
}