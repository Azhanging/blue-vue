import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import { useInVue } from '../../../use-in-vue'; //公共组件，头部，滚动等
import { device } from '$assets/js/device';  //当前环境
import { useInVueProgram } from './use-in-vue-program';  //m-navigator m-home-view

//公共css，项目配置项assets/scss/config
import '@/assets/css/blue-component.scss';

//预设mint-ui中的css
import '@/assets/css/mint-ui.scss';


//设备相关
device({
  Vue
});

//使用插件到Vue，相对于公共的插件
useInVue({
  Vue
});

//当前项目构建的插件|组件入口
useInVueProgram({
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

