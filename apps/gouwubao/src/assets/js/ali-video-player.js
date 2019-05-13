import utils from 'blue-utils';
import config from '@config';

//默认的配置
const defaultOptions = {
  id: ``,               //dom elm
  autoplay: false,        //自动播放
  isLive: false,
  width: '100%',
  height: '200px',
  playsinline: true,
  controlBarVisibility: 'hover',
  rePlay: false,
  //直播
  source: false,
  //点播
  vid: false,
  playauth: '',

  useH5Prism: true,           //使用h5播放
  useFlashPrism: false,       //使用flash播放

  x5_type: '', //通过 video 属性 “x5-video-player-type” 声明启用同层H5播放器，支持的值：h5 https://x5.tencent.com/tbs/guide/video.html
  x5_video_position: 'center',
  x5_fullscreen: true,      //声明视频播放时是否进入到 TBS 的全屏模式，支持的值：true
  x5_orientation: 'portraint',    //声明 TBS 播放器支持的方向
  cover: '',
  useHlsPluginForSafari: true, //Safari浏览器可以启用Hls插件播放，Safari 11除外
  "skinLayout": [  //取消错误显示样式
    {
      "name": "bigPlayButton",
      "align": "blabs",
      "x": 30,
      "y": 80
    },
    {
      "name": "H5Loading",
      "align": "cc"
    },
    {
      "name": "infoDisplay"
    },
    {
      "name": "tooltip",
      "align": "blabs",
      "x": 0,
      "y": 56
    },
    {
      "name": "thumbnail"
    },
    {
      "name": "controlBar",
      "align": "blabs",
      "x": 0,
      "y": 0,
      "children": [
        {
          "name": "progress",
          "align": "blabs",
          "x": 0,
          "y": 44
        },
        {
          "name": "playButton",
          "align": "tl",
          "x": 15,
          "y": 12
        },
        {
          "name": "timeDisplay",
          "align": "tl",
          "x": 10,
          "y": 7
        },
        {
          "name": "fullScreenButton",
          "align": "tr",
          "x": 10,
          "y": 12
        },
        {
          "name": "subtitle",
          "align": "tr",
          "x": 15,
          "y": 12
        },
        {
          "name": "setting",
          "align": "tr",
          "x": 15,
          "y": 12
        },
        {
          "name": "volume",
          "align": "tr",
          "x": 5,
          "y": 10
        }
      ]
    }
  ]
};

export default class AliVideoPlayer {

  constructor(options) {
    this.player = {};
    this.options = utils.extend(defaultOptions, options);
    this._init();
  }

  loadByUrl(url) {
    this.player && this.player.loadByUrl(url);
  }

  //销毁
  dispose() {
    if (this.player) {
      this.player.dispose();
      try {
        document.querySelector('#' + this.options.id).remove();
      } catch (e) {
        console.warn(e);
      }
    }
  }

  //初始化
  _init() {
    this.player = new Aliplayer(this.options);
    this._bindEvent();
  }

  //绑定事件
  _bindEvent() {

    this.player.on('ready', (e) => {
      console.log('ready');
    });

    this.player.on('play', (e) => {
      console.log('play');
    });

    this.player.on('ended', (e) => {
      console.log('ended');
    });

    this.player.on('pause', (e) => {
      console.log('pause');
    });

    //直播流中断时触发
    this.player.on('liveStreamStop', (e) => {
      if (this.options.isLive) {
        this.options.vue_this.videoEnd = true
        // console.log('直播流中断1')
      }
    });

    //m3u8直播流中断后重试事件，每次断流只触发一次
    this.player.on('m3u8Retry', (e) => {
      // console.log('直播流中断2')
    });

    //微信左上角退出按钮触发是，关闭页面
    /*this.player.tag.addEventListener("x5videoexitfullscreen", () => {
      if (WeixinJSBridge)
        WeixinJSBridge.call('closeWindow');
      else {
        try {
          window.location.refresh();
        } catch (e) {
        }
      }
    });*/
  }

  //解绑事件
  _unbindEvent() {

    let that = this;

    this.player.off('ready', function (e) {
      // 解决ios不自动播放的问题
      if (config.device.isIPhone || config.device.isIPad) {
        that._autoPlay();
      }
      console.log('ready');
    });

    this.player.off('play', function (e) {
      console.log('play');
    });

    this.player.off('ended', function (e) {
      console.log('ended');
    });

    this.player.off('pause', function (e) {
      console.log('pause');
    });

  }
}