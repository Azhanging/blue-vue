import store from '@store';
import axios from 'axios';
import utils from '$utils';
import config from '@config';
import router from '@router';

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
    store.commit('setWeChat', {
      appId: 'wx878c4a26964486ca',
      timestamp: '1546919285',
      nonceStr: 'Z2j8mU2PEpqv4tVG',
      signature: 'f59dcdd2d19ddb037bf0431dc8516524b9147159'
    } || data);
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

//微信分享，会在ready后执行
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
    const link = weChatShareLink(opts);
    const imgUrl = opts.imgUrl || config.weChat.share.imgUrl;
    //朋友圈分享
    wx.onMenuShareTimeline({
      title,
      link,
      imgUrl,
      success() {
        utils.hook(this, opts.success);
      }
    });
    //朋友分享
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

//微信分享的url可能是动态需要的配置，可以为String或者Function
function weChatShareLink(opts) {
  const link = opts.link || config.weChat.share.link || router.getHref();
  if (utils.isStr(link)) {
    return link;
  } else if (utils.isFunction(link)) {
    return utils.hook(null, link);
  }
}

