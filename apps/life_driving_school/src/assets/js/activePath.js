//匹配路由,确定底部导航active

import { matchRouter } from '$components/bv-tab-bar';

export function activeTabBar(path) {
  let activeIndex;
  if (matchRouter([
      /^\/shop/       //商城
    ], path)) {
    activeIndex = 1;
  } else if (matchRouter([
      /^\/article\//,   //资讯，公开课
      /^\/$/,            //首页
      /^\/zhuanqu\//,    //专区
    ], path)) {
    activeIndex = 0;
  }
  return activeIndex;
}