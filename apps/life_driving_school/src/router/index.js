import Vue from 'vue';
import Router from 'vue-router';
import { weChatShare } from '$wechat';
import { navigator } from '$assets/js/navigator';
import { useInVueRouter } from '$use-in-vue-router';
import { routerAfterEach } from "$use-in-vue-router/router-after";

//路由地址
import home from './home';
import article from './article';
import zhuanqu from './zhuanqu';
import bindPhone from "./bind-phone";

Vue.use(Router);

//router相关的插件
useInVueRouter(Router);

const router = new Router({
  namespace: true,
  routes: [
    {
      path:'/',
      redirect:'/home'
    },
    home,
	  article,
	  zhuanqu,
    bindPhone
  ]
});

//router after each
routerAfterEach({
  router,
  //根据项目需要的after each（可选）
  afterEach(to, from) {
    console.log(to, from);
  },
  unAfterHook() {
    weChatShare();
  }
});

export default router;
