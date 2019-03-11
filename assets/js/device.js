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

//ios device
function iosFocus() {

  let lastNav;
  document.body.addEventListener('focusin', () => {
    lastNav = store.state.view.navigator;
    focusHook({
      type: 'focusin'
    });
  });

  document.body.addEventListener('focusout', () => {
    focusHook({
      type: 'focusout',
      lastNav
    });
    Vue.nextTick(() => {
      setTimeout(() => {
        document.body.scrollTop = document.body.scrollHeight;
      }, 50);
    });
  });
}

//android device
function androidResize() {
  let lastNav;
  const originalHeight = getClientHeight();
  window.onresize = function () {
    const resizeHeight = getClientHeight();
    if (resizeHeight - 0 < originalHeight - 0) {
      lastNav = store.state.view.navigator;
      focusHook({
        type: 'focusin'
      });
    } else {
      focusHook({
        type: 'focusout',
        lastNav
      });
    }
  }
}

//获取窗口的大小
function getClientHeight() {
  return document.documentElement.clientHeight || document.body.clientHeight;
}

//切换状态后的钩子
function focusHook(opts) {
  if (opts.type === 'focusout') {
    store.commit('setNavigator', opts.lastNav);
    store.commit('setPageFooter', true);
  } else if (opts.type === 'focusin') {
    store.commit('setNavigator', false);
    store.commit('setPageFooter', false);
  }
}