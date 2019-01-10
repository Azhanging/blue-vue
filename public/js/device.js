import Vue from 'vue';
import store from '@store';
import config from '@config';

//main
export function device() {
  //移动设备相关
  if (config.env.isWap) {
    setViewport();
    mobileFocus();
  }
}

//移动端设置viewport的计算
export function setViewport() {
  const html = document.getElementsByTagName('html')[0];
  html.setAttribute('data-mobile-device', 'true');
}

//处理移动端软键盘问题
function mobileFocus() {
  if (config.env.isIphone) {
    iosFocus();
  } else if (config.env.isAndroid) {
    androidResize();
  }
}

function iosFocus() {
  let lastNav;
  document.body.addEventListener('focusin', () => {
    lastNav = store.state.view.navigator;
    store.commit('setNavigator', false);
  });

  document.body.addEventListener('focusout', () => {
    store.commit('setNavigator', lastNav);
    Vue.nextTick(() => {
      setTimeout(() => {
        document.body.scrollTop = document.body.scrollHeight;
      }, 50);
    });
  });
}

function androidResize(){
  let lastNav;
  const originalHeight = document.documentElement.clientHeight || document.body.clientHeight;
  window.onresize = function () {
    const resizeHeight = document.documentElement.clientHeight || document.body.clientHeight;
    if (resizeHeight - 0 < originalHeight - 0) {
      lastNav = store.state.view.navigator;
      store.commit('setNavigator', false);
    } else {
      store.commit('setNavigator', lastNav);
    }
  }
}