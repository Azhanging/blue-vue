//匹配的路由
export function matchRouter(routesRegExp = [], path) {
  for (let i = 0; i < routesRegExp.length; i++) {
    const routerRegExp = routesRegExp[0];
    routerRegExp.lastIndex = 0;
    if (routerRegExp.test(path)){
      return true;
    }
  }
  return false;
}