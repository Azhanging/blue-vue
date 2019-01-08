//扩展vue-router
export function useInVueRouter(Router) {

  //获取当前地址href，直接获取location.href会出现路由未更新前的地址
  Router.prototype.getHref = function () {
    const fullPath = this.currentRoute.fullPath;
    if (this.mode === 'hash') {
      return `${location.host}/#${fullPath}`;
    } else if (this.mode === 'history') {
      return `${location.host}/${fullPath}`;
    }
  }
}