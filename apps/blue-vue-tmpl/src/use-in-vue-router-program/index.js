/*
* 项目里面vue-router
* */
export function useInVueRouterProgram(opts = {}) {

  const { Router, routerID } = opts;

  //路由id实例
  Router.prototype.routerID = routerID;

}