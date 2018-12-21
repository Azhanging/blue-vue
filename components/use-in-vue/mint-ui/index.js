import 'mint-ui/lib/style.css';
import MintUI from 'mint-ui';
import MScroll from './m-scroll/m-scroll';
import { setToast } from './toast';
import { setIndicator } from './indicator';
import { MessageBox, Lazyload } from 'mint-ui';

export function useMintUi(Vue) {

  //use mint ui
  Vue.use(MintUI);

  //lazy
  Vue.use(Lazyload);

  //Vue infinite-scroll in program
  Vue.component('m-scroll', MScroll);

  //set toast
  setToast(Vue);

  //set Indicator
  setIndicator(Vue);

  //set message
  Vue.prototype.$messageBox = MessageBox;
}