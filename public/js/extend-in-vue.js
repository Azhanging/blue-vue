import { useWeChatInVue } from '$wechat';
import { extendConfigInVue } from './config/extend-config';
import { extendUtilsInVue } from './utils/index-esm';

export function extendInVue(Vue) {
  //extend in Vue
  useWeChatInVue(Vue);
  //extend program in Vue
  extendConfigInVue(Vue);
//extend utils in Vue
  extendUtilsInVue(Vue);
}