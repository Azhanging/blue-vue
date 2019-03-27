import store from '@store';
import config from '@config';

//导航的状态
export function tabBar(name) {
  //默认的导航配置
  if (name === undefined) {
    store.commit('setTabBar', config.view.tabBar);
  } else {    //设置对应的导航
    store.commit('setTabBar', name);
  }
}