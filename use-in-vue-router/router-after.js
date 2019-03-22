//router after each 相关的业务
import utils from 'blue-utils';
import { navigator } from "$assets/js/navigator";
import { $closeLoadding } from "$use-in-vue/mint-ui/indicator";
import { bind } from '$assets/js/bind';
import { docTitle } from '$assets/js/document';
import { getWeChatConfig } from '$wechat';

//main
export function routerAfterEach(opts = {}) {
  const { router, unAfterHook, afterEach } = opts;
  router.afterEach((to, from) => {

    $closeLoadding();

    //项目内使用的after each
    utils.hook(null, afterEach, [to, from]);

    //获取微信配置，只针对微信端处理（针对url不一致的，每次路由访问都会走一遍）
    getWeChatConfig();

    //公共的after hook
    routerAfterHook({
      to,
      from,
      unAfterHook
    });

  });
}

//router after hook
export function routerAfterHook(opts) {
  const { to, unAfterHook } = opts;
  const { title, afterHook, navigator: navigatorName } = to.meta;

  //文档标题
  docTitle(title);

  //导航状态
  navigator(navigatorName);

  //绑定相关
  //bind(opts);

  //目标路由的hook处理
  if (afterHook) {
    utils.hook(null, afterHook);
  } else {
    utils.hook(null, unAfterHook);
  }
}