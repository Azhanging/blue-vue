import utils from 'blue-utils';

//扩展vue-router
export function useInVueRouter(Router) {

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
    if (path && utils.isStr(path)) {
      if (/^http/.test(path)) {
        location.href = path;
      } else {
        const { route } = this.resolve(path, this.currentRoute, true);
        this.push(route.fullPath);
      }
    } else if (utils.isFunction(path)) {
      path.call(this);
    } else if (history.length > 1) {
      this.back();
    } else {
      this.push('/');
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
}