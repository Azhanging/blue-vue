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
  if (config.env.isWeChat) {
    getWeChatConfig();
    wxShareInVue(Vue);
  }
}

//get wechat config in server
export function getWeChatConfig() {
  axios.get('').then((res) => {
    const { data } = res;
    store.commit('setWeChat', {
      appId: 'wx878c4a26964486ca',
      timestamp: '1544582974',
      nonceStr: 'TSXARpdRw3hIbuUX',
      signature: 'f78e1fbd642ee293549ecf542773f84daecfa41a'
    });
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

  console.log(config);

  wx.onMenuShareTimeline({
    title: opts.title || config.weChat.share.title,
    link: opts.link || config.weChat.share.link,
    imgUrl: opts.imgUrl || config.weChat.share.imgUrl,
    success: function () {
      utils.hook(this, opts.success);
    }
  });

  wx.onMenuShareAppMessage({
    title: opts.title || config.weChat.share.title,
    desc: opts.desc || opts.title || config.weChat.share.desc || config.weChat.share.title,
    link: opts.link || config.weChat.share.link || location.href,
    imgUrl: opts.imgUrl || config.weChat.share.imgUrl,
    type: opts.type || 'link',
    dataUrl: opts.dataUrl || "",
    success: function () {
      utils.hook(this, opts.success);
    }
  });
}

