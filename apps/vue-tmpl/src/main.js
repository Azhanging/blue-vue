import Vue from 'vue';
import Axios from 'axios';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import { useInVue } from '../../../use-in-vue';
import { iosFixed } from '$public/js/ios-fixed';
import { setViewport } from '$public/js/viewport';
import { useInVueProgram } from './use-in-vue-program';

//公共css，项目配置项assets/scss/config
import '@/assets/scss/blue-component.scss';

//预设mint-ui中的css
import '@/assets/scss/mint-ui.scss';

//移动端设置viewport，计算来源查看blue-component中的viewport.scss
setViewport();
//解决ios下fixed的bug
iosFixed();

//使用插件到Vue，相对于公共的插件
useInVue({
  Vue,
  Axios
});

//当前项目构建的插件|组件入口
useInVueProgram({
  Vue
});

Vue.config.productionTip = false;

/*close vue wran and tips*/
/*Vue.config.silent = true;
Vue.config.warnHandler = false;*/

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');


