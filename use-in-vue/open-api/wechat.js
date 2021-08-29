//加载微信
import config from "@config/index";
import $axios from "$use-in-vue/axios";
import BlueQueuePipe from 'blue-queue-pipe';
import { shareLink } from "$assets/js/share";

//加载微信sdk
function loadWeChatSDK() {
  const script = document.createElement(`script`);
  script.src = `//res.wx.qq.com/open/js/jweixin-1.4.0.js`;
  script.onload = () => {
    getWeChatConfig();
  };
  document.body.appendChild(script);
}

//加载微信sdk
loadWeChatSDK();

//微信 分享 in vue
export function weChatShareInVue(Vue) {
  Vue.prototype.$weChatShare = weChatShare;
}

//if in wechat ,get wechat config in program
export function useWeChatInVue(Vue) {
  weChatShareInVue(Vue);
  try {
    if (config.device.isWeChat && wx) {
      window.alert = (e) => {
        console.log(`wechat error:`, e);
      };
    }
  } catch (e) {
    console.warn(e);
  }
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
    if (!this.isEmpty()) return;
    this.useMethod('reset');
  }
});

//get wechat config in server
export function getWeChatConfig() {
  if (!config.device.isWeChat || !wx) return;
  //重新改变ready的状态
  weChatQueue.data.status = false;
  const weChat = config.weChat;
  const getConfig = weChat.getConfig;
  $axios({
    method: getConfig.type || 'get',
    url: getConfig.url || '',
    data: getConfig.data || '',
    isShowLoading: false
  }).then((res) => {
    const { data } = res;
    setWeChatSdkConfig({
      id: ++weChatQueue.data.id,
      weChatData: data
    });
  });
}

//set wechat config
export function setWeChatSdkConfig(opts) {
  //任务的id
  const { id, weChatData } = opts;

  wx.config({
    debug: config.env.prod,
    appId: weChatData.appId,
    timestamp: weChatData.timestamp,
    nonceStr: weChatData.nonceStr,
    signature: weChatData.signature,
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