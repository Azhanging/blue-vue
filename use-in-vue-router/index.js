import Vue from 'vue';
import utils from 'blue-utils';
import config from '@config';
import { setCurrentViewScroll } from '$components/bv-view';

//扩展vue-router
export function useInVueRouter(Router) {

  //针对keepAlive，处理掉组件实例化缓存问题
  Vue.mixin({
    beforeRouteLeave(to, from, next) {
      if (from.meta.keepAlive === false) {
        this.$destroy();
      }
      next();
    }
  });

  //获取当前地址href，直接获取location.href会出现路由未更新前的地址
  Router.prototype.getHref = function () {
    const fullPath = this.currentRoute.fullPath;
    const origin = location.origin;
    if (this.mode === 'hash') {
      return `${origin}/#${fullPath}`;
    } else if (this.mode === 'history') {
      return `${origin}${fullPath}`;
    }
  };

  //路由后退规则,如果有具体的路由，走具体的路由规则或者fn回调，否则走根路径
  Router.prototype.routerBack = function (path) {
    if (path && (utils.isStr(path) || utils.isFunction(path))) {
      this.routerTo(path);
    } else if (history.length > 1) {
      this.back();
    } else {
      this.push('/');
    }
  };

  //跳转到指定的地址
  Router.prototype.routerTo = function (path) {
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
  Router.prototype.matchRoutes = function (routesRegExp = []) {
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

  //混合开发设置地址跳转
  Router.prototype.mixedDevelopmentPath = function (name) {
    const path = config.path[name];
    //不存在默认返回到首页
    if (!path) return '/';
    const mode = this.mode;
    const currentRoute = this.currentRoute;
    //回跳的参数
    const URL_PARAM = `url`;
    //混合模式下，使用的是indexPath的路径
    if (config.mixedDevelopment) {
      return `${path}?${URL_PARAM}=${encodeURIComponent(`${config.path.indexPath}/${mode === 'hash' ? '#' : ''}${currentRoute.fullPath}`)}`;
    } else {
      return `${path}?${URL_PARAM}=${encodeURIComponent(this.getHref())}`
    }
  };

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

