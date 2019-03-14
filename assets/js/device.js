import store from '@store';
import config from '@config';
import inBrowser from "$assets/js/in-browser";
import nativeApp from '$assets/js/native-app';

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
function iosFocus(Vue) {

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

    //ios focus fixed bug
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
    store.commit('setPageFixed', true);
  } else if (opts.type === 'focusin') {
    store.commit('setNavigator', false);
    store.commit('setPageFixed', false);
  }
}