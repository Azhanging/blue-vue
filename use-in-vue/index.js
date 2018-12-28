import { useVueAwesomeSwiper } from './swiper/index';
import { useAxios } from './axios/index';
import { useMintUi } from './mint-ui/index';
import { useUpload } from '../components/vue-upload-component/upload';
import { inBrowser } from "$public/js/in-browser";

import Picker from '../components/m-picker/m-picker';
import Transition from '../components/m-transition/m-transition';
import vuePicturePreview from 'vue-picture-preview';
import PageList from '../components/m-page-list/m-page-list';

import BlueValidate from 'blue-validate';
/*import BlueValidate from '../../blue-validate/src/index';*/
import fastclick from 'fastclick';

//使用插件到vue上
export function useInVue(opts = {}) {

  const { Vue, Axios } = opts;

  if (inBrowser()) {
    //use fastclick
    fastclick.attach(document.body);
    //图片预览组件
    Vue.use(vuePicturePreview);
    //验证规则
    Vue.use(BlueValidate);
    //upload
    useUpload(Vue);
    //swiper
    useVueAwesomeSwiper(Vue);
  }

  //use mint
  useMintUi(Vue);
  //路由过渡动画组件
  Vue.component('m-transition', Transition);
  //多级联动
  Vue.component('m-picker', Picker);
  //分页列表
  Vue.component('m-page-list', PageList);
  //axios
  useAxios(Vue, Axios);
}
