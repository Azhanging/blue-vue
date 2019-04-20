import store from '@store';
import config from '@config';
import inBrowser from "$assets/js/in-browser";
import nativeApp from '$assets/js/native-app';
import Vue from 'vue';

//main
export function device(opts) {

  const { Vue } = opts;

  //移动设备相关
  if (inBrowser() && config.device.isWap) {

    //给app webview调用，挂载到window全局
    window.nativeApp = nativeApp;

    //添加native任务
    nativeApp.addTask(() => {
      config.device.isApp = true;
    });

    setViewport();
    mobileFocus(Vue);
  }
}

//获取当前设备信息
export function getCurrentDevice() {

  //默认
  let device = {
    isWeChat: false,  //是否在微信端
    isWap: false,     //是否为移动设备
    isIPhone: false,
    isIPad: false,
    isAndroid: false,
    isApp: false,     //是否在app webview
    isPc: false,      //是否为电脑端
    isServer: true    //是否在服务器端 预留ssr处理
  };

  //浏览器内的规则
  if (inBrowser()) {
    const userAgent = navigator.userAgent;
    const isWap = /iPhone|iPad|Android|Windows Phone|KFAPWI|MeeGo/ig.test(userAgent);
    const isWeChat = /MicroMessenger/ig.test(userAgent);
    device = {
      isWeChat,
      isWap,
      isIPhone: /iPhone/ig.test(userAgent),
      isIPad: /iPad/ig.test(userAgent),
      isAndroid: /Android/ig.test(userAgent),
      isApp: false,
      isPc: !isWap,
      isServer: false
    };
  }

  return device;
}

//移动端设置viewport的计算
export function setViewport() {
  const html = document.getElementsByTagName('html')[0];
  html.setAttribute('data-mobile-device', 'true');
}

//处理移动端软键盘问题
function mobileFocus(Vue) {
  if (config.device.isIPhone || config.device.isIPad) {
    iosFocus(Vue);
  } else if (config.device.isAndroid) {
    androidResize();
  }
}

//ios device
function iosFocus() {

  let lastNav;
  document.body.addEventListener('focusin', () => {
    lastNav = store.state.view.tabBar;
    focusHook({
      type: 'focusin'
    });
    mockMoveScroll();
  });

  document.body.addEventListener('focusout', () => {
    focusHook({
      type: 'focusout',
      lastNav
    });
    //ios focus fixed bug
    mockMoveScroll();
  });
}

//android device
function androidResize() {
  let lastNav;
  const originalHeight = getClientHeight();
  window.onresize = function () {
    const resizeHeight = getClientHeight();
    if (resizeHeight - 0 < originalHeight - 0) {
      lastNav = store.state.view.tabBar;
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
  const { type, lastNav } = opts;
  if (type === 'focusout') {
    store.commit('setTabBar', lastNav);
    store.commit('setPageFixed', true);
  } else if (type === 'focusin') {
    store.commit('setTabBar', false);
    store.commit('setPageFixed', false);
  }
}

//模拟移动
export function mockMoveScroll() {
  Vue.nextTick(() => {
    [].forEach.call(document.querySelectorAll('.bv-view-scroll'), (viewElm) => {
      viewElm.scrollTop += 1;
      viewElm.scrollTop -= 1;
    });
  });
}