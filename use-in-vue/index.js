/*进度条*/
import '$assets/css/app.scss';
import utils from 'blue-utils';
import "nprogress/nprogress.css";
import NProgress from 'nprogress';
import BlueValidate from 'blue-validate';
import fastclick from 'fastclick';
import { useVueAwesomeSwiper } from './swiper';
import { useAxiosInVue } from './axios';
import { useMintUi } from './mint-ui';
import { useUpload } from '$components/VueUploadComponent/upload';
import { Base64 } from 'js-base64';   //base64
import inBrowser from "$assets/js/in-browser";
import { useWeChatInVue } from '$wechat';
import { useComponentsInVue } from './components';
import config from '@config';
import { share } from '$assets/js/share';
import { login } from '$assets/js/login';
import { view } from '$assets/js/view';
import { useFilter } from './filter'


// 注：
// 修改过两个对应的插件
// npm install 后，使用前从npm-package/vue-upload-component/vue-upload-component.js复制到node_modules指定的包中
// 具体查看包的package主入口使用

//使用插件到vue上
export function useInVue(opts = {}) {
  const { Vue } = opts;
  if (inBrowser()) {
    //视图相关
    view();
    //进度条
    NProgress.configure();
    //扩展微信
    useWeChatInVue(Vue);
    //use fastclick
    fastclick.attach(document.body);
    //验证规则
    Vue.use(BlueValidate);
    //upload
    useUpload(Vue);
    //swiper
    useVueAwesomeSwiper(Vue);
  }
  //mixin program in Vue
  Vue.mixin({
    data() {
      //项目config
      return {
        config
      };
    }
  });
  //extend utils in Vue
  Vue.prototype.$utils = utils;
  //base64
  Vue.prototype.$base64 = Base64;
  //公共的分享规则 app, browser, wechat
  Vue.prototype.$share = share;
  //过滤器
  useFilter(Vue);
  //use mint
  useMintUi(Vue);
  //axios
  useAxiosInVue(Vue);
  //components
  useComponentsInVue(Vue);
}
