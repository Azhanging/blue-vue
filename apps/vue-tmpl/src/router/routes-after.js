//router after each 相关的业务

import config from '@config';
import utils from '$utils';
import { navigator } from "../../../../public/js/navigator";

export function routerAfterEach(opts) {
  const { router, unMatchHook } = opts;
  router.afterEach((to) => {
    afterHook({
      to,
      unMatchHook
    });
  });
}

export function afterHook(opts) {
  const { to, unMatchHook } = opts;
  const { title, afterHook, nav } = to.meta;
  docTitle(title);
  navigator(nav);
  if (afterHook) {
    routerAfterHook(afterHook);
  } else {
    unMatchRouter(unMatchHook);
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
function unMatchRouter(unMatchHook) {
  utils.hook(null, unMatchHook);
}