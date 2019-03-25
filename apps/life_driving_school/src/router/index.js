import Vue from 'vue';
import Router from 'vue-router';
import { weChatShare } from '$wechat';
import { navigator } from '$assets/js/navigator';
import { useInVueRouter } from '$use-in-vue-router';
import RouterID from '$use-in-vue-router/router-id';
import { routerBeforeEach } from "$use-in-vue-router/router-before";
import { routerAfterEach } from "$use-in-vue-router/router-after";

Vue.use(Router);

//路由地址
import errorPage from "./error-page";
import lifeRouter from './life_school/index'
import bindPhone from "./bind-phone";
//商城
import shopRouter from './shop/index'

//router相关的插件
useInVueRouter(Router);

//路由标记
export const routerID = new RouterID();

const router = new Router({
  namespace: true,
  routes: routerID.addIds([
    ...lifeRouter,
    ...shopRouter,
    bindPhone,
    errorPage   //错误页
  ])
});

//router before each
routerBeforeEach({
  router,
  beforeEach(to, from) {
    //四种情况，path，false，Error参照官方文档中的next处理 true 或者 undefined 走默认的next()处理
    //处理多层级的的next状态查看一下RouterNext的处理
    return true;
  }
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
