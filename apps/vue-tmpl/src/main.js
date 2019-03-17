import Vue from 'vue';
import App from './App.vue';
import router, { createRouter } from './router/index';
import store, { createStore } from './store/index';
import { useInVue } from '../../../use-in-vue';
import { device } from '$assets/js/device';
import { useInVueProgram } from './use-in-vue-program';

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


//test vue in ssr
export function createApp() {

  const router = createRouter();

  const store = createStore();

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  });

  return {
    app,
    router
  };
}

