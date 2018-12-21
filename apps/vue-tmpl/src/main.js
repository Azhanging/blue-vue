import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import { useInVue } from '../../../components/use-in-vue';
import { extendInVue } from '$public/js/extend-in-vue';

//css
import '@/assets/scss/mint-ui.scss';
import '@/assets/css/component.css';

//使用插件到Vue，相对于公共的插件
useInVue(Vue);
extendInVue(Vue);

Vue.config.productionTip = false;

/*close vue wran and tips*/
Vue.config.silent = true;
Vue.config.warnHandler = false;

/*close localhost wechat alert*/
window.alert = (e) => {console.log(`wechat error:${e}`)};

window.app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
