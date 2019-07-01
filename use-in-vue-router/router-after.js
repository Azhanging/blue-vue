//router after each 相关的业务
import utils from 'blue-utils';
import { tabBar } from "$assets/js/tab-bar";
import { $closeLoading } from "$use-in-vue/mint-ui/indicator";
import { $closeToast } from "$use-in-vue/mint-ui/toast";
import { docTitle } from '$assets/js/document';
import { getWeChatConfig } from '$wechat';
import { setFocusStatus } from '$assets/js/device';

//main
export function routerAfterEach(opts = {}) {
  const { router, unAfterHook, afterEach } = opts;
  router.afterEach((to, from) => {
    //关闭loading
    $closeLoading();
    //初始化page位置
    resetPageOffset();
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
  const { title, afterHook, tabBar: tabBarName } = to.meta;

  //文档标题
  docTitle(title);
  //导航状态
  tabBar(tabBarName);

  //目标路由的hook处理
  if (afterHook) {
    utils.hook(null, afterHook);
  } else {
    utils.hook(null, unAfterHook);
  }
}

//初始化的nextTick操作
let resetOffsetTime = 0;

//重置定位，针对keep-alive的优化
function resetPageOffset() {
  clearTimeout(resetOffsetTime);
  resetOffsetTime = setTimeout(() => {
    window.pageXOffset = 0;
    window.pageYOffset = 0;
  }, 10);
}