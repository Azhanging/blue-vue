//router before each 相关的业务
import utils from 'blue-utils';
import RouterNext from './router-next';
import { routerID } from '@router';
import NProgress from 'nprogress';

//main
export function routerBeforeEach(opts = {}) {
  const { router, beforeEach } = opts;

  //存在重定向的不在走router beforeEach
  router.beforeEach((to, from, next) => {

    //设置路由标识
    routerID.setCurrentID();

    //实例化router next
    const routerNext = new RouterNext({
      to,
      from
    });

    routerNext.add([
      //项目内使用的before each
      utils.hook(null, beforeEach, [to, from]),
      //公共的after hook
      routerBeforeHook({
        to,
        from
      })
    ]);

    //路由的下一跳状态，决定路由何去何从
    const nextStatue = routerNext.nextStatus();

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
  NProgress.start();
  return routerNext.nextStatus();
}

