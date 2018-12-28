import { useWeChatInVue } from '$wechat';
import { extendConfigInVue } from '../config/index';
import { extendUtilsInVue } from '../public/js/utils/index-esm';
import { inBrowser } from "../public/js/in-browser";

export function extendInVue(opts = {}) {
  const { Vue } = opts;
  if (inBrowser()) {
    //extend in Vue
    useWeChatInVue(Vue);
  }
  //extend program in Vue
  extendConfigInVue(Vue);
//extend utils in Vue
  extendUtilsInVue(Vue);
}