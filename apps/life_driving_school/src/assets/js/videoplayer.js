import utils from 'blue-utils';
const defaultProps = {
	id: ``,               //dom elm
	autoplay: false,        //自动播放
	isLive: false,
	width: '100%',
	// height: '200px',
	cover:"",
	playsinline: true,  //内置播放
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
	x5_video_position: 'normal',
	//x5_fullscreen: true,      //声明视频播放时是否进入到 TBS 的全屏模式，支持的值：true
	//x5_orientation: 'portraint',    //声明 TBS 播放器支持的方向
	useHlsPluginForSafari: true, //Safari浏览器可以启用Hls插件播放，Safari 11除外
	"skinLayout": [
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
	],
	hooks:{}
};



export default class VideoPlayer {
	constructor(props) {
		this.player;
		try{
			this.props = utils.extend(defaultProps, props);
			// this.props = props;
			console.log(this.props)
			this._setup();
			this._firstFullscreen = true;
		}
		catch(error){
			console.log(error)
		}
	}


	loadByUrl(url) {
		if (this.player)
			this.player.loadByUrl(url);
	}

	dispose() {
		if (this.player) {
			this.player.dispose();
			Zepto('#' + this.props.id).empty();
		}
	}

	_setup() {
    this.player = new Aliplayer(this.props);
    this._bindEvent();
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
			if (this.props.isLive) {
				utils.hook(this,this.props.hooks.liveStreamStop);
				this.props.source = false;


				console.log('直播流中断1')
			}
		});
		this.player.on('m3u8Retry', (e) => { //m3u8直播流中断后重试事件，每次断流只触发一次
			console.log('直播流中断2')
		});


		// this.player.on('requestFullScreen', (e)=>{
		// 	    let video=$(that.player.tag);
		// 	    video.addClass('center');
		// });

		// this.player.on('x5cancelFullScreen',(e)=>{
		// 	let service = that.player.fullscreenService;
		// 	if(service.getIsFullScreen())
		// 	{
		// 		service.cancelFullScreen()
		// 	}
		//     $(that.player.el()).removeClass('enter-x5-player');

		// });

		// this.player.on('x5requestFullScreen',(e)=>{
		//     //调整视频的位置
		//     $(that.player.el()).addClass('enter-x5-player');
		//     var screenHeight = document.body.clientHeight*(window.devicePixelRatio||1)+ "px";
		//     that.player.tag.style.height = screenHeight;
		//     let video=$(that.player.tag);
		//     setTimeout(()=>{
		//         video.removeClass('x5-top-left');
		//     });
		// });
		// this.player.on('cancelFullScreen', (e)=>{
		// 	let video=$(that.player.tag);
		//     setTimeout(()=>{
		//         alert(video.length());
		//        video.removeClass('center');
		//        video.removeClass('x5-top-left');
		//     });
		// });


		//微信左上角退出按钮触发是，关闭页面
		this.player.tag.addEventListener("x5videoexitfullscreen", () => {
			if (WeixinJSBridge){
				// WeixinJSBridge.call('closeWindow');
			}

			else {
				try {
					window.location.refresh();
				} catch (e) {
				}
			}
		});

		// $(document).on('WeixinJSBridgeReady', () => {
		// 	let video = $(that.player.el()).find('video')[0];
		// 	video.play();
		// });

		document.body.addEventListener("WeixinJSBridgeReady", function () {
			let video = document.querySelector(that.player.el()).getElementsByTagName('video')[0];
			video.play();
		}, false)

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