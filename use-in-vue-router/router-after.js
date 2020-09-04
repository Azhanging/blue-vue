//router after each 相关的业务
import utils from 'blue-utils';
import { suspend, tabBar } from "$assets/js/view";
import config from '@config';
import { hideLoading } from "$use-in-vue/vant/toast";
import { getWeChatConfig } from '$wechat';
import { setFocusStatus } from '$assets/js/device';
import NProgress from 'nprogress';

//main
export function routerAfterEach(opts = {}) {
  const { router, unAfterHook, afterEach } = opts;
  router.afterEach((to, from) => {
    const { title, tabBar: tabBarState, suspend: suspendState = {} } = to.meta;
    //关闭loading
    hideLoading(true);
    //设置focus状态
    setFocusStatus(false);
    //项目内使用的after each
    utils.hook(null, afterEach, [to, from]);
    //获取微信配置，只针对微信端处理（针对url不一致的，每次路由访问都会走一遍）
    getWeChatConfig();
    //进度条
    NProgress.done();
    //设置标题
    document.title = title || config.view.title;
    //导航状态
    tabBar(tabBarState);
    //浮层状态
    suspend({
      status: suspendState.status,
      distance: 0
    });
    //执行after hook
    afterHook({
      to,
      from,
      unAfterHook
    });
  });
}

//router after hook
export function afterHook(opts) {
  const { unAfterHook, to } = opts;
  const { afterHook } = to.meta;
  //目标路由的hook处理
  if (afterHook) {
    utils.hook(null, afterHook);
  } else {
    utils.hook(null, unAfterHook);
  }
}