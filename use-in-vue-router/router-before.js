//router before each 相关的业务

import utils from 'blue-utils';

import { bind } from '$assets/js/bind';

import RouterNext from './router-next';

//main
export function routerBeforeEach(opts = {}) {
  const { router, beforeEach } = opts;
  router.beforeEach((to, from, next) => {
    const routerNext = new RouterNext({
      to,
      from
    });

    //项目内使用的before each
    routerNext.add([
      (to, from) => {
        console.log(to, from);
        return true;
      },
      utils.hook(null, beforeEach, [to, from]),
      //公共的after hook
      routerBeforeHook({
        to,
        from
      })
    ]);

    const nextStatue = routerNext.run();

    //next的状态
    if (RouterNext.preventRouterNext(nextStatue)) {
      next(nextStatue);
    } else {
      next();
    }

  });
}

//router after hook
export function routerBeforeHook(opts) {

  const routerNext = new RouterNext(opts);

  routerNext.add([
    //绑定相关
    bind(opts)
  ]);

  return routerNext.run();
}