import utils from 'blue-utils';

//扩展vue-router
export function useInVueRouter(Router) {

  //获取当前地址href，直接获取location.href会出现路由未更新前的地址
  Router.prototype.$getHref = function () {
    const fullPath = this.currentRoute.fullPath;
    const origin = location.origin;
    if (this.mode === 'hash') {
      return `${origin}/#${fullPath}`;
    } else if (this.mode === 'history') {
      return `${origin}${fullPath}`;
    }
  };


  //路由后退规则,如果有具体的路由，走具体的路由规则或者fn回调，否则走根路径
  Router.prototype.$routerBack = function (leftControl) {
    if (leftControl && utils.isStr(leftControl)) {
      this.push(leftControl);
    } else if (utils.isFunction(leftControl)) {
      leftControl.call(this);
    } else if (history.length > 1) {
      this.back();
    } else {
      this.push('/');
    }
  };

}