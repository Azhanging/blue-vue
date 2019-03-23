import utils from 'blue-utils';

class RouterId {
  constructor(opts) {
    this.options = opts;
    //计算id累计
    this.id = 0;
    //当前的路由id
    this.currentRouterId = 0;
  }

  addIds(routes = []) {
    utils.each(routes, (router) => {
      if (!router.meta) router.meta = {};
      //避免Router.prototype.addRoutes动态路由后id混乱
      if (!router.meta.id) router.meta.id = ++this.id;
      const routerChildren = router.children;
      if (utils.isArray(routerChildren)) {
        this.addIds(routerChildren);
      }
    });
      return routes;
  }

  //设置当前路由id
  setCurrentRouterId(id) {
    this.currentRouterId = id;
  }

  //判断是否为当前的路由
  isCurrentRoute(id) {
    return this.currentRouterId === id;
  }

  //获取当前的路由id
  getCurrentRouterId(){
    return this.currentRouterId;
  }
}

export default RouterId;