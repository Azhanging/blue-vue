import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { useInVue } from '../../../use-in-vue';
import { device } from '$assets/js/device';
import { useInVueProgram } from './use-in-vue-program';
import user from '$assets/js/user';
//公共css，项目配置项assets/scss/config
import '@/assets/css/blue-component.scss';
//预设mint-ui中的css
import '@/assets/css/mint-ui.scss';
//nprogress覆盖scss
import '@/assets/css/nprogress.scss';
//server work PWA
import './registerServiceWorker';

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

Vue.config.devtools = (process.env.NODE_ENV === 'development');

if (process.env.NODE_ENV !== 'development') {
  /*close vue wran and tips*/
  Vue.config.silent = true;
  Vue.config.warnHandler = false;
}

new Vue({
  router,
  store,
  created() {
    //用户相关
    //user();
  },
  render: h => h(App)
}).$mount('#app');

