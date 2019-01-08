import store from '@store';
import axios from 'axios';
import utils from '$utils';
import config from '@config';

const { state } = store;

let readyStatus = false;

//share queue
class WeChatQueueTask {
  constructor() {
    this.reset();
  }

  add(fn) {
    this.queue.push(fn);
  }

  task() {
    for (let i = 0; i < this.queue.length; i++) {
      this.queue[i]();
    }
    this.reset();
  }

  reset() {
    this.queue = [() => {
      share();
    }];
  }
}

//微信任务队列
const weChatTask = new WeChatQueueTask();

//微信 分享
export function wxShareInVue(Vue) {
  Vue.prototype.$wxShare = wxShare;
}

//if in wechat ,get wechat config in program
export function useWeChatInVue(Vue) {
  try {
    if (config.env.isWeChat && wx) {
      getWeChatConfig();
      wxShareInVue(Vue);
      window.alert = (e) => {
        console.log(`wechat error:${e}`)
      };
    }
  } catch (e) {
    console.warn(e);
  }
}

//get wechat config in server
export function getWeChatConfig() {
  const weChat = config.weChat;
  const getConfig = weChat.getConfig;
  axios({
    method: getConfig.type,
    url: getConfig.url,
    data: getConfig.data
  }).then((res) => {
    const { data } = res;
    store.commit('setWeChat', data);
  }).then(() => {
    setWxSdkConfig();
  });
}

//set wechat config
export function setWxSdkConfig() {

  wx.config({
    debug: true,
    appId: state.weChat.appId,
    timestamp: state.weChat.timestamp,
    nonceStr: state.weChat.nonceStr,
    signature: state.weChat.signature,
    jsApiList: [
      'onMenuShareTimeline',
      'onMenuShareAppMessage'
    ]
  });

  wx.ready(() => {
    readyStatus = true;
    weChatTask.task();
  });

}

export function wxShare(opts = {}) {
  if (readyStatus == false) {
    weChatTask.add(() => {
      share(opts);
    });
  } else {
    share(opts);
  }
}

//set share
export function share(opts = {}) {
  try {
    const title = opts.title || config.weChat.share.title;
    const desc = opts.desc || opts.title || config.weChat.share.desc || title;
    const link = opts.link || config.weChat.share.link || location.href;
    const imgUrl = opts.imgUrl || config.weChat.share.imgUrl;

    wx.onMenuShareTimeline({
      title,
      link,
      imgUrl,
      success() {
        utils.hook(this, opts.success);
      }
    });

    wx.onMenuShareAppMessage({
      title,
      desc,
      link,
      imgUrl,
      type: opts.type || 'link',
      dataUrl: opts.dataUrl || "",
      success() {
        utils.hook(this, opts.success);
      }
    });
  } catch (e) {
    console.warn(e);
  }
}

