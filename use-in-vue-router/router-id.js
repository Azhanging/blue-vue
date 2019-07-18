/*
* 路由id
* 存在两种id为路由id，一种为路径id
* */
import utils from 'blue-utils';

//path id添加
function pathID(router) {
  const { meta } = router;
  const { pathID } = meta;
  //初始就是首页开头的，直接写路径
  (pathID || []).forEach((id) => {
    if (/^\//g.test(router.path)) {
      this.routesID[id] = router.path;
    } else {
      const isBasePath = (this._routerPath === '/');
      const routesID = this.routesID;
      if (!routesID[id]) {
        routesID[id] = `${this._routerPath}${ isBasePath ? '' : '/'}${router.path}`;
      } else {
        console.warn(`has same pathID in meta(meta中存在相同的pathID)`);
      }
    }
  });
}

//添加id（router id 以及 path id）
function addID(routes) {
  utils.each(routes, (router) => {
    if (!router.meta) router.meta = {};

    //避免Router.prototype.addRoutes动态路由后id混乱
    if (!router.meta.routerID) {
      router.meta.routerID = ++this.routerID;
    }

    if (/^\//g.test(router.path)) {
      this._routerPath = router.path;
    }

    //刷新页面状态
    router.meta.refresh = false;

    //存在链路的id
    if (router.meta.pathID) {
      pathID.call(this, router);
    }

    const routerChildren = router.children;
    if (utils.isArray(routerChildren)) {
      this.addID(routerChildren);
    }
  });
}

class RouterID {
  constructor(opts) {
    this.options = opts;
    //计算路由id累计
    this.routerID = 0;
    //当前的路由id
    this.currentRouterID = 0;
    //链路id
    this.routesID = {};
    //临时链路地址累计
    this._routerPath = '';
  }

  addID(routes = []) {
    addID.call(this, routes);
    //初始化临时累计地址
    setTimeout(() => {
      this._routerPath = '';
    }, 0);
    return routes;
  }

  //设置当前路由id
  setCurrentRouterID(id) {
    this.currentRouterID = id;
  }

  //判断是否为当前的路由
  isCurrentRouteID(id) {
    return this.currentRouterID === id;
  }

  //获取当前的路由id
  getCurrentRouterID() {
    return this.currentRouterID;
  }

  //获取
  getPathID(opts = {}) {
    const { id, params = {}, query = {}, path = '/' } = opts;
    let routerPath = this.routesID[id];
    if (!routerPath) return path;
    routerPath = routerPath.split('/');

    //替换params
    utils.each(params, (val, key) => {
      let index = routerPath.indexOf(`:${key}`);
      while (index !== -1) {
        routerPath[index] = val;
        index = routerPath.indexOf(`:${key}`);
      }
    });

    routerPath = routerPath.join('/');

    //添加query
    if (!utils.nullPlainObject(query)) {
      routerPath += `?${utils.stringifyParams(query)}`;
    }
    return routerPath;
  }
}

export default RouterID;