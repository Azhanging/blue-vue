import store from "@store";
import config from "@config";
import inBrowser from "$assets/js/in-browser";

//main
export function device(opts) {
  const { Vue } = opts;

  //移动设备相关
  if (inBrowser() && config.device.isWap) {
    //设置blue-zone的viewport
    setViewport();
    //移动端相关的focus处理
    mobileFocus(Vue);
  }
}

//获取当前设备信息
export function getCurrentDevice() {
  //默认
  let device = {
    isWeChat: false, //是否在微信端
    isWap: false, //是否为移动设备
    isIPhone: false,
    isIPad: false,
    isAndroid: false,
    isPc: false, //是否为电脑端
    isApp: false, //是否为app端webview
    isServer: true, //是否在服务器端 预留ssr处理
  };

  //浏览器内的规则
  if (inBrowser()) {
    const userAgent = navigator.userAgent;
    const isWap = /iPhone|iPad|Android|Windows Phone|KFAPWI|MeeGo/gi.test(
      userAgent
    );
    device = {
      //微信
      isWeChat: /MicroMessenger/gi.test(userAgent),
      //支付宝
      isAliPay: /AlipayClient/.test(userAgent),
      //手机端
      isWap,
      //苹果手机
      isIPhone: /iPhone/gi.test(userAgent),
      //ipad
      isIPad: /iPad/gi.test(userAgent),
      //安卓手机
      isAndroid: /Android/gi.test(userAgent),
      //电脑端
      isPc: !isWap,
      //服务器端
      isServer: false,
    };
  }

  return device;
}

//移动端设置viewport的计算
export function setViewport() {
  const html = document.getElementsByTagName("html")[0];
  html.setAttribute("data-mobile-device", "true");
}

//表单的focus状态
let focusStatus = false;

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

  document.body.addEventListener(
    "focusin",
    (event) => {
      lastNav = store.state.view.tabBar;
      focusHook({
        type: "focusin",
        event,
      });
      //设置focus状态
      setFocusStatus(true);
    },
    false
  );

  document.body.addEventListener("focusout", (event) => {
    focusHook(
      {
        type: "focusout",
        lastNav,
        event,
      },
      false
    );
    //设置focus状态
    setFocusStatus(false);
  });
}

//android device
function androidResize() {
  let lastNav;
  const originalHeight = getClientHeight();
  window.onresize = function (event) {
    const resizeHeight = getClientHeight();
    if (resizeHeight - 0 < originalHeight - 0) {
      lastNav = store.state.view.tabBar;
      focusHook({
        type: "focusin",
        event,
      });
      //设置focus状态
      setFocusStatus(true);
    } else {
      focusHook({
        type: "focusout",
        lastNav,
        event,
      });
      //设置focus状态
      setFocusStatus(false);
    }
  };
}

//获取窗口的大小
function getClientHeight() {
  return document.documentElement.clientHeight || document.body.clientHeight;
}

//切换状态后的钩子
function focusHook(opts) {
  const { type, lastNav, event } = opts;
  const target = event.target;
  if (target === window) return;
  const tagName = target.tagName;
  const elmType = target.getAttribute("type");

  const types = [
    "text",
    "number",
    "password",
    "datetime",
    "date",
    "email",
    "month",
    "week",
    "time",
    "datetime-local",
    "url",
  ];

  if (
    (tagName === "INPUT" && types.indexOf(elmType) !== -1) ||
    tagName === "SELECT" ||
    tagName === "TEXTAREA"
  ) {
    if (type === "focusout") {
      store.commit("SET_TAB_BAR", {
        name: lastNav,
      });
      store.commit("SET_PAGE_FIXED", true);
    } else if (type === "focusin") {
      store.commit("SET_TAB_BAR", {
        name: false,
      });
      store.commit("SET_PAGE_FIXED", false);
    }
  }
}

//设置focus状态
export function setFocusStatus(status) {
  focusStatus = status;
}
