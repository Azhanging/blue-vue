import { useVueAwesomeSwiper } from './swiper';
import { useFastclick } from './fastclick';
import { useAxios } from './axios';
import { useMintUi } from './mint-ui';
import { useUpload } from '../vue-upload-component/upload';
import { useTransitionInVue } from '../m-transition';
import { usePickerInVue } from '../m-picker';
import { usePicturePreviewInVue } from '../vue-picture-preview/picture-preview';

import BlueValidate from 'blue-validate';


//使用插件到vue上
export function useInVue(Vue) {
  useTransitionInVue(Vue);
  usePickerInVue(Vue);
  usePicturePreviewInVue(Vue);

  //测试验证
  Vue.use(BlueValidate);

  //use mint
  useMintUi(Vue);
  //axios
  useAxios(Vue);
  //swiper
  useVueAwesomeSwiper(Vue);
  //use fastclick
  useFastclick();
  //upload
  useUpload(Vue);
}
