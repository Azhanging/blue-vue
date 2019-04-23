import utils from 'blue-utils';

//默认的配置
const defaultOptions = {
  id: ``,
  autoplay: false,
  isLive: false,
  width: '100%',
  playsinline: true,
  controlBarVisibility: 'hover',
  rePlay: false,
  //直播
  source: false,
  //点播
  vid: false,
  playauth: '',

  useH5Prism: true,
  useFlashPrism: false,
  x5_video_position: 'normal',
  //prismplayer 2.0.1版本支持的属性，主要用户实现在android 微信上的同层播放
  x5_type: 'h5', //通过 video 属性 “x5-video-player-type” 声明启用同层H5播放器，支持的值：h5 https://x5.tencent.com/tbs/guide/video.html
  cover: '',
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
    this._setup();
    this._bindEvent();
  }

  loadByUrl(url) {
    if (this.player)
      this.player.loadByUrl(url);
  }

  dispose() {
    if (this.player) {
      this.player.dispose();
      Zepto('#' + this.options.id).empty();
    }
  }

  _setup() {
    this.player = new Aliplayer(this.options, function (player) {
      player._switchLevel = 0;
    });
  }

  _bindEvent() {
    let that = this;
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

    this.player.on('liveStreamStop', (e) => { //直播流中断时触发
      if (this.options.isLive) {
        this.options.vue_this.videoEnd = true
        // console.log('直播流中断1')
      }
    });
    this.player.on('m3u8Retry', (e) => { //m3u8直播流中断后重试事件，每次断流只触发一次
      // console.log('直播流中断2')
    });

    //微信左上角退出按钮触发是，关闭页面
    this.player.tag.addEventListener("x5videoexitfullscreen", () => {
      if (WeixinJSBridge)
        WeixinJSBridge.call('closeWindow');
      else {
        try {
          window.location.refresh();
        } catch (e) {
        }
      }
    });

    $(document).on('WeixinJSBridgeReady', () => {
      let video = $(that.player.el()).find('video')[0];
      video.play();
    });
  }

  _unbindEvent() {
    let that = this;
    this.player.off('ready', function (e) {
      // 解决ios不自动播放的问题
      if ($.os.ios)
        that._autoPlay();
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