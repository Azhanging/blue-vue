export default class VideoPlayer {
	constructor(props) {
		this.player;
		this.props = props;
		this._setup();
		this._bindEvent();
		this._firstFullscreen = true;
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
		this.player = new Aliplayer(this.props, function (player) {
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
			if (this.props.isLive) {
				this.props.vue_this.videoEnd = true
				// console.log('直播流中断1')
			}
		});
		this.player.on('m3u8Retry', (e) => { //m3u8直播流中断后重试事件，每次断流只触发一次
			// console.log('直播流中断2')
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