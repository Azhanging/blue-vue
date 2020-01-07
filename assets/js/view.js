import store from '@store';
import utils from 'blue-utils';
import config from '@config';
import { setTabBarSubmenuIndex } from '$components/BvTabBar';

//设置视图相关
export function view() {
  setEvent();
}

//scroll事件的处理
const scrollHandler = utils.debounce(function () {
  const top = document.documentElement.scrollTop;
  //设置scroll top
  store.commit('SET_SCROLL', {
    distance: top || 0
  });
  //设置子菜单的状态
  setTabBarSubmenuIndex(-1);
}, 200);

//scroll事件的处理
const clickHandler = utils.debounce(function () {
  //设置子菜单的状态
  setTabBarSubmenuIndex(-1);
}, 200);

//设置scroll事件
function setEvent() {
  window.addEventListener('scroll', scrollHandler, false);
  window.addEventListener('click', clickHandler, false);
}

//浮层相关
export function suspendStatus(status) {
  store.commit('SET_SCROLL', {
    status: status !== false
  });
}

//导航的状态
export function tabBar(name) {
  store.commit('SET_TAB_BAR', (() => {
    if (name === undefined) {
      return {
        name: config.view.tabBar
      };
    }
    return {
      name
    };
  }));
}

