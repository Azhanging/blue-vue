import { Indicator } from 'mint-ui';

export function setIndicator(Vue) {

  //indicator
  Vue.prototype.$indicator = Indicator;

  //open loadding
  Vue.prototype.$loadding = $loadding;

  //close loadding
  Vue.prototype.$closeLoadding = $closeLoadding;

}

export function $closeLoadding() {
  Indicator.close();
}

export function $loadding(opts = {}) {
  let config = {
    text: opts.text || '加载中...',
    spinnerType: opts.spinnerType || 'snake'
  };
  if(!opts.text){
    delete config.text;
  }
  Indicator.open(config);
}