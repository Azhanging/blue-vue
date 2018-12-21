import hooks from './hooks';
import utils from '$utils';

export function afterEachHooks(to, form) {
  const toRouterLen = to.matched.length;
  if(toRouterLen){
    const currentPathRegex = to.matched[toRouterLen - 1].regex;
    runRouteHooks(currentPathRegex);
  }
}

//查找路由对应的hook
function runRouteHooks(currentPathRegex) {
  let matchStatus = false;
  hooks.routes.forEach((router) => {
    if (!currentPathRegex.test(router.path)) return;
    matchStatus = true;
    router.hooks.forEach((hook) => {
      utils.hook(this, hook);
    });
  });

  //un match router path
  if (!matchStatus) {
    hooks.unMatchHooks.forEach((hook) => {
      utils.hook(this, hook);
    });
  }
}