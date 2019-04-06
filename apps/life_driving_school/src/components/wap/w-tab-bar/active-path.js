//匹配路由,确定底部导航active

import router from '@router';

export function activeTabBar() {
  let activeIndex;
  if (router.matchRoutes([
      /^\/shop/       //商城
    ])) {
    activeIndex = 1;
  } else if (router.matchRoutes([
      /^\/article\//,   //资讯，公开课
      /^\/$/,            //首页
      /^\/zhuanqu\//,    //专区
    ])) {
    activeIndex = 0;
  }
  return activeIndex;
}