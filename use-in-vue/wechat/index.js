import store from '@store';
import $Axios from '$axios';
import utils from 'blue-utils';
import config from '@config';
import { shareLink } from '$assets/js/share';
import BlueQueuePipe from 'blue-queue-pipe';

//项目的分享成功执行
import { shareSuccess } from '@assets/js/share';

const { state } = store;

//微信 分享 in vue
export function weChatShareInVue(Vue) {
  Vue.prototype.$weChatShare = weChatShare;
}

//微信任务队列
const weChatQueue = new BlueQueuePipe({
  data: {
    id: 0,
    status: false
  },
  methods: {
    reset() {
      this.queue = [() => {
        weChatShare();
      }];
    }
  },
  ran() {
    if (this.isEmpty()) {
      this.useMethod('reset');
    }
  }
});

//if in wechat ,get wechat config in program
export function useWeChatInVue(Vue) {
  weChatShareInVue(Vue);
  try {
    if (config.device.isWeChat && wx) {
      window.alert = (e) => {
        console.log(`blue-vue-tmpl wechat error:`, e);
      };
    }
  } catch (e) {
    console.warn(e);
  }
}

//get wechat config in server
export function getWeChatConfig() {
  if (!config.device.isWeChat || !wx) return;
  //重新改变ready的状态
  weChatQueue.data.status = false;
  const weChat = config.weChat;
  const getConfig = weChat.getConfig;
  $Axios({
    method: getConfig.type || 'get',
    url: getConfig.url || '',
    data: getConfig.data || '',
    isLoading: false
  }).then((res) => {
    const { data } = res;
    store.commit('setWeChat', data);
  }).then(() => {
    setWeChatSdkConfig({
      id: ++weChatQueue.data.id
    });
  });
}

//set wechat config
export function setWeChatSdkConfig(opts) {

  //任务的id
  const { id } = opts;

  wx.config({
    debug: config.env.prod,
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
    //当前的任务处理
    if (id !== weChatQueue.data.id) return;
    weChatQueue.data.status = true;
    weChatQueue.run();
  });

}

//微信分享，会在ready后执行
export function weChatShare(opts = {}) {
  if (weChatQueue.data.status === false) {
    weChatQueue.enqueue(() => {
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
        utils.hook(this, shareSuccess);
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
        utils.hook(this, shareSuccess);
        utils.hook(this, opts.success);
      }
    });
  } catch (e) {
    console.warn(e);
  }
}




