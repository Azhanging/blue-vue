import Vue from 'vue';
import Axios from 'axios';
import App from './App.vue';
import config from '@config';
import router from './router/index';
import store from './store/index';
import { useInVue } from '../../../use-in-vue';
import { setViewport } from '$public/js/set-viewport';
import { programComponent } from './components';
import '@/assets/scss/blue-component.scss';

//css
/*import '@/assets/scss/mint-ui.scss';*/

//移动端设置viewport
setViewport();

//使用插件到Vue，相对于公共的插件
useInVue({
  Vue,
  Axios
});

//当前项目组件
programComponent({
  Vue
});

Vue.config.productionTip = false;

/*close vue wran and tips*/
Vue.config.silent = true;
Vue.config.warnHandler = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
