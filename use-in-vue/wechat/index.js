import store from '@store';
import axios from 'axios';
import utils from '$utils';
import config from '@config';

const { state } = store;

let readyStatus = false;

//share queue
class ShareQueueTask {
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

const shareTask = new ShareQueueTask();

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
  const weChatConfig = config.weChat;
  const getConfig = weChatConfig.getConfigApi;
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
    shareTask.task();
  });

}

export function wxShare(opts = {}) {
  if (readyStatus == false) {
    shareTask.add(() => {
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

