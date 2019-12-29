import { MessageBox } from 'mint-ui';

export function setMessage(Vue) {
  Vue.prototype.$messageBox = MessageBox;
}