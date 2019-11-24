import Vue from 'vue';
import utils from 'blue-utils';
import { setCurrentViewScroll } from '$components/BvView';
import BlueKeepAlive from './blue-keep-alive';

//vue-router的config
const routerConfig = {
  params: {
    backUrl: `backUrl`
  }
};

//扩展vue-router
export function useInVueRouter(Router, opts = {}) {

  //设置router中的配置信息
  Router.config = utils.extend(routerConfig, opts);

  //缓存机制
  Vue.use(BlueKeepAlive);

  //扩展vue router
  extendVueRouter(Router);
}

//keep-alive保存position
export function scrollBehavior(to, from, savedPosition) {
  if (savedPosition) {
    //设置view层scroll
    setCurrentViewScroll(savedPosition);
  }
  return {
    x: 0,
    y: 0
  };
}

//扩展vue router
function extendVueRouter(Router) {
//获取当前地址href，直接获取location.href会出现路由未更新前的地址（分享全路径需要使用）
  Router.prototype.$getHref = function () {
    const origin = window.location.origin;
    return `${origin}${this.$getModePath()}`;
  };

  //路由后退规则,如果有具体的路由，否则走根路径
  Router.prototype.$goBack = function () {
    if (history.length > 1) {
      window.history.back();
    } else {
      this.push('/');
    }
  };

  //跳转到指定的地址
  Router.prototype.$routerTo = function (path) {
    if (utils.isStr(path)) {
      if (/^http/.test(path)) {
        location.href = path;
      } else {
        const { route } = this.resolve(path, this.currentRoute, true);
        this.push(route.fullPath);
      }
    } else if (utils.isFunction(path)) {
      path.call(this);
    }
  };

  //匹配路由的路径组，返回布尔值
  Router.prototype.$matchRoutes = function (routesRegExp = []) {
    const path = this.currentRoute.fullPath;
    for (let i = 0; i < routesRegExp.length; i++) {
      const routerRegExp = routesRegExp[i];
      routerRegExp.lastIndex = 0;
      if (routerRegExp.test(path)) {
        return true;
      }
    }
    return false;
  };

  //获取params中的某个参数
  Router.prototype.$getParam = function (key) {
    return this.currentRoute.params[key] || '';
  };

  //获取meta
  Router.prototype.$getMeta = function () {
    return this.currentRoute.meta;
  };

  //获取mode相关的path
  Router.prototype.$getModePath = function () {
    const mode = this.mode;
    const fullPath = this.currentRoute.fullPath;
    if (mode === 'hash') {
      return `/#${fullPath}`;
    } else if (mode === 'history') {
      return `${fullPath}`;
    }
  };

  //查询query中是否有对于的backUrl参数，有则会跳转到对于的backUrl地址上，否则走$goBack的逻辑
  Router.prototype.$goBackUrl = function (opts = {}) {
    const { backUrl } = this.constructor.config.params;
    const { type = 'push' } = opts;
    if (!(type === 'push' || type === 'replace')) return;
    const path = this.currentRoute.query[backUrl];
    if (path) {
      this[type](path);
    } else {
      this.$goBack();
    }
  };

}
