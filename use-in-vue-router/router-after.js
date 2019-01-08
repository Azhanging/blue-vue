//router after each 相关的业务

import config from '@config';
import utils from '$utils';
import { navigator } from "$public/js/navigator";

//main
export function routerAfterEach(opts) {
  const { router, unAfterHook } = opts;
  router.afterEach((to) => {
    afterHook({
      to,
      unAfterHook
    });
  });
}

//hook
export function afterHook(opts) {
  const { to, unAfterHook } = opts;
  const { title, afterHook, nav } = to.meta;
  docTitle(title);
  navigator(nav);
  if (afterHook) {
    routerAfterHook(afterHook);
  } else {
    unRouterAfterHook(unAfterHook);
  }
}

//document title
function docTitle(title) {
  document.title = title || config.view.title;
}

//after hook
function routerAfterHook(afterHook) {
  utils.hook(null, afterHook);
}

//没有匹配到的路由
function unRouterAfterHook(unAfterHook) {
  utils.hook(null, unAfterHook);
}