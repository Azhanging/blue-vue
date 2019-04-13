//router before each 相关的业务
import utils from 'blue-utils';
import RouterNext from './router-next';
import { setTabBarSubmenuIndex } from '$components/bv-tab-bar';
import { bind } from '$assets/js/bind';
import { routerID } from '@router';
import { serverRedirect } from '$assets/js/redirect';

//main
export function routerBeforeEach(opts = {}) {
  const { router, beforeEach } = opts;

  //存在重定向的不在走router beforeEach
  router.beforeEach((to, from, next) => {
    //设置子菜单的状态
    setTabBarSubmenuIndex({
      tabBarSubMenuStatus: -1
    });
    //设置路由标识
    routerID.setCurrentRouterID(to.meta.id);

    //实例化router next
    const routerNext = new RouterNext({
      to,
      from
    });

    //检查重定向参数
    routerNext.add([
      serverRedirect()
    ]);

    //项目内使用的before each
    routerNext.add([
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
  routerNext.add([
    //绑定相关
    bind(opts)
  ]);
  return routerNext.nextStatus();
}