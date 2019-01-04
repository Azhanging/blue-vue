import Vue from 'vue';
import Axios from 'axios';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import { useInVue } from '../../../use-in-vue';
import { extendInVue } from '../../../extend-in-vue';

import '@/assets/scss/blue-component.scss';

//css
/*import '@/assets/scss/mint-ui.scss';*/

//使用插件到Vue，相对于公共的插件
useInVue({
  Vue,
  Axios
});

//扩展到vue上
extendInVue({
  Vue
});

Vue.config.productionTip = false;

/*close vue wran and tips*/
Vue.config.silent = true;
Vue.config.warnHandler = false;

/*close localhost wechat alert*/
/*window.alert = (e) => {
  console.log(`wechat error:${e}`)
};*/


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
