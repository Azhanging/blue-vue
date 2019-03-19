import store from '@store';
import $Axios from '$axios';
import utils from 'blue-utils';
import config from '@config';
import { shareLink } from '$assets/js/share';

const { state } = store;

//微信ready状态
let readyStatus = false;

//share queue
class WeChatQueueTask {
  constructor() {
    this.queue = [];
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
      weChatShare();
    }];
  }
}

//微信任务队列
const weChatTask = new WeChatQueueTask();

//微信 分享 in vue
export function weChatShareInVue(Vue) {
  Vue.prototype.$weChatShare = weChatShare;
}

//if in wechat ,get wechat config in program
export function useWeChatInVue(Vue) {
  try {
    if (config.device.isWeChat && wx) {
      getWeChatConfig();
      weChatShareInVue(Vue);
      window.alert = (e) => {
        console.log(`blue-vue-tmpl wechat error:${e}`)
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
  $Axios({
    method: getConfig.type || 'get',
    url: getConfig.url || '',
    data: getConfig.data || ''
  }).then((res) => {
    const { data } = res.data;
    store.commit('setWeChat', data);
  }).then(() => {
    setWeChatSdkConfig();
  });
}

//set wechat config
export function setWeChatSdkConfig() {

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
export function weChatShare(opts = {}) {
  if (readyStatus === false) {
    weChatTask.add(() => {
      setWeChatShare(opts);
    });
  } else {
    setWeChatShare(opts);
  }
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




