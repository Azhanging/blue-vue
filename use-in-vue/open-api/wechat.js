//加载微信
import config from "@config/index";
import $axios from "$use-in-vue/axios";
import BlueQueuePipe from "blue-queue-pipe";
import { shareLink } from "$assets/js/share";

//加载微信sdk
function loadWeChatSDK() {
  if (!config.device.isWeChat) return;
  const script = document.createElement(`script`);
  script.src = `//res.wx.qq.com/open/js/jweixin-1.4.0.js`;
  script.onload = () => {
    //加载完设置配置
    getWeChatConfig();
  };
  document.body.appendChild(script);
}

//加载微信sdk
loadWeChatSDK();

//if in wechat ,get wechat config in program
export function useWeChatInVue(Vue) {
  //Vue.prototype.$weChatShare = weChatShare;
}

let id = 0;
let status = false;

//get wechat config in server
export function getWeChatConfig() {
  if (!config.device.isWeChat) return;
  const weChat = config.weChat;
  const getConfig = weChat.getConfig;
  status = false;
  $axios({
    method: getConfig.type || "get",
    url: getConfig.url || "",
    data: getConfig.data || "",
    showLoading: false,
  }).then((res) => {
    weChatConfig({
      id: ++id,
      weChatOptions: res.data,
    });
  });
}

const weChatReadyQueue = new BlueQueuePipe();

export function weChatReady(callback) {
  if (status) {
    callback();
  } else {
    weChatReadyQueue.enqueue((opts = {}) => {
      if (opts.id !== id) return;
      callback();
    });
  }
}

//set wechat config
export function weChatConfig(opts) {
  //任务的id
  const { id: currentId, weChatOptions } = opts;

  wx.config({
    debug: process.env.NODE_ENV === `development`,
    appId: weChatOptions.appId,
    timestamp: weChatOptions.timestamp,
    nonceStr: weChatOptions.nonceStr,
    signature: weChatOptions.signature,
    jsApiList: [`onMenuShareTimeline`, `onMenuShareAppMessage`],
  });

  wx.ready(() => {
    //当前的任务处理
    if (currentId !== id) return;
    //设置加载完的状态
    status = true;
    //执行所有的队列
    weChatReadyQueue.run({
      id: currentId
    });
  });
}

//微信分享配置
function setWeChatShare(opts = {}) {
  try {
    const title = opts.title || config.share.title;
    const desc = opts.desc || opts.title || config.share.desc || title;
    const link = shareLink(opts);
    const imgUrl = opts.imgUrl || config.share.imgUrl;

    //朋友圈分享
    wx.onMenuShareTimeline({
      title,
      link,
      imgUrl,
      success() {
        utils.hook(this, opts.success);
      },
    });

    //朋友分享
    wx.onMenuShareAppMessage({
      title,
      desc,
      link,
      imgUrl,
      type: opts.type || "link",
      dataUrl: opts.dataUrl || "",
      success() {
        utils.hook(this, opts.success);
      },
    });
  } catch (e) {
    console.warn(e);
  }
}
