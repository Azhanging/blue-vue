import Vue from 'vue';
import Router from 'vue-router';
import { weChatShare } from '$wechat';
import { useInVueRouter, scrollBehavior } from '$use-in-vue-router';
import RouterID from '$use-in-vue-router/router-id';
import { routerBeforeEach } from "$use-in-vue-router/router-before";
import { routerAfterEach } from "$use-in-vue-router/router-after";
import { useInVueRouterProgram } from '../use-in-vue-router-program';

//路由地址
import routes from './routes';

Vue.use(Router);

//router相关的插件
useInVueRouter(Router);

//路由标记
export const routerID = new RouterID();

//路由实例
const router = new Router({
  mode: 'history',
  namespace: true,
  routes,
  scrollBehavior
});

//项目扩展router
useInVueRouterProgram({
  Router
});

//router before each
routerBeforeEach({
  router,
  beforeEach(to, from) {
    //四种情况，path，false，Error参照官方文档中的next处理
    // true 或者 undefined 走默认的next()处理
    //处理多层级的的next状态查看一下RouterNext的处理
    return true;
  }
});

//router after each
routerAfterEach({
  router,
  //根据项目需要的after each（可选）
  afterEach(to, from) {
    //console.log(to, from);
  },
  unAfterHook() {
    weChatShare();
  }
});

export default router;
