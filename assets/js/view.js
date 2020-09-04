import store from '@store';
import utils from 'blue-utils';
import config from '@config';

//设置视图相关
export function view() {
  setEvent();
}

//scroll事件的处理
const scrollHandler = utils.debounce(function () {
  const top = document.documentElement.scrollTop;
  //设置scroll top
  store.commit('SET_SUSPEND', {
    distance: top || 0
  });
}, 200);

//设置scroll事件
function setEvent() {
  window.addEventListener('scroll', scrollHandler, false);
}

//浮层相关
export function suspend(state) {
  if (state.status !== false) state.status = true;
  store.commit('SET_SUSPEND', state);
}

//导航的状态
export function tabBar(state = {}) {
  const { name } = state;
  store.commit('SET_TAB_BAR', (() => {
    if (name === undefined) {
      return config.view.tabBar;
    }
    return {
      name
    };
  })());
}

