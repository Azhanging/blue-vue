//router after each 相关的业务
import utils from 'blue-utils';
import { tabBar, suspend } from "$assets/js/view";
import { hideLoading } from "$use-in-vue/mint-ui/indicator";
import { docTitle } from '$assets/js/document';
import { getWeChatConfig } from '$wechat';
import { setFocusStatus } from '$assets/js/device';
import NProgress from 'nprogress';

//main
export function routerAfterEach(opts = {}) {
  const { router, unAfterHook, afterEach } = opts;
  router.afterEach((to, from, next) => {
    //关闭loading
    hideLoading(true);
    //设置focus状态
    setFocusStatus(false);
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
  const { title, afterHook, tabBar: tabBarName, suspend: suspendState = {} } = to.meta;
  //进度条
  NProgress.done();
  //文档标题
  docTitle(title);
  //导航状态
  tabBar(tabBarName);
  //浮层状态
  suspend({
    status: suspendState.status,
    distance: 0
  });
  //目标路由的hook处理
  if (afterHook) {
    utils.hook(null, afterHook);
  } else {
    utils.hook(null, unAfterHook);
  }
}