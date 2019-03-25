import utils from 'blue-utils';

class RouterID {
  constructor(opts) {
    this.options = opts;
    //计算id累计
    this.id = 0;
    //当前的路由id
    this.currentRouterID = 0;
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
  setCurrentRouterID(id) {
    this.currentRouterID = id;
  }

  //判断是否为当前的路由
  isCurrentRoute(id) {
    return this.currentRouterID === id;
  }

  //获取当前的路由id
  getCurrentRouterID(){
    return this.currentRouterID;
  }
}

export default RouterID;