//修改过 vue-picture-preview，修改了自定义指令的bind bug
import vuePicturePreview from './index';

export function usePicturePreviewInVue(Vue) {
  Vue.use(vuePicturePreview);
}