import store from '@store';
import config from '@config';
import inBrowser from "$assets/js/in-browser";
import NativeApp from '$assets/js/native-app';
import Vue from 'vue';

//main
export function device(opts) {

  const { Vue } = opts;

  //移动设备相关
  if (inBrowser() && config.device.isWap) {
    //设置webview相关
    setNativeApp();
    //设置blue-component的viewport
    setViewport();
    //移动端相关的focus处理
    mobileFocus(Vue);
  }
}

//设置webview相关
function setNativeApp() {
  window.navtiveApp = new NativeApp();
  navtiveApp.addTask(() => {
    config.device.isApp = true;
  });
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
    isPc: false,      //是否为电脑端
    isApp: false,     //是否为app端webview
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
      isPc: !isWap,
      isApp: false,     //是否为app端webview
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
  const device = config.device;
  if (device.isIPhone || device.isIPad) {
    iosFocus(Vue);
  } else if (device.isAndroid) {
    androidResize();
  }
}

//ios device
function iosFocus() {

  let lastNav;
  document.body.addEventListener('focusin', (event) => {
    lastNav = store.state.view.tabBar;
    focusHook({
      type: 'focusin',
      event
    });
    mockMoveScroll();
  });

  document.body.addEventListener('focusout', (event) => {
    focusHook({
      type: 'focusout',
      lastNav,
      event
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
  const { type, lastNav, event } = opts;
  const target = event.target;
  const tagName = target.tagName;
  const elmType = target.getAttribute('type');

  const types = [
    'text', 'number', 'password', 'datetime',
    'date', 'email', 'month', 'week', 'time',
    'datetime-local', 'url'
  ];

  if ((tagName === 'INPUT' && types.indexOf(elmType) !== -1) || (
      tagName === 'SELECT'
    ) || (
      tagName === 'TEXTAREA'
    )
  ) {
    if (type === 'focusout') {
      store.commit('setTabBar', lastNav);
      store.commit('setPageFixed', true);
    } else if (type === 'focusin') {
      store.commit('setTabBar', false);
      store.commit('setPageFixed', false);
    }
  }
}

//模拟移动
export function mockMoveScroll() {
  Vue.nextTick(() => {
    const scrollElm = document.querySelectorAll('.bv-view-scroll');
    [].forEach.call(scrollElm, (viewElm) => {
      viewElm.scrollTop += 1;
      viewElm.scrollTop -= 1;
    });
  });
}