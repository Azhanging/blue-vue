import Vant from 'vant';
//vant样式
import 'vant/lib/index.css';
import { useToast } from './toast';

//使用vant
export function useInVant(Vue) {
  Vue.use(Vant);
  //设置loading
  useToast(Vue);
}