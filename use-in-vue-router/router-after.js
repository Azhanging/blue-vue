//router after each 相关的业务
import config from "@config";
import { suspend, tabBar } from "$assets/js/view";
import { hideLoading } from "$use-in-vue/vant/toast";
import { getWeChatConfig } from "$wechat";
import { setFocusStatus } from "$assets/js/device";
import NProgress from "nprogress";

//main
export function routerAfterEach(opts = {}) {
  const { router } = opts;
  router.afterEach((to, from) => {
    const { title, tabBar: tabBarState, suspend: suspendState = {} } = to.meta;
    //关闭loading
    hideLoading(true);
    //设置focus状态
    setFocusStatus(false);
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
      distance: 0,
    });
  });
}
