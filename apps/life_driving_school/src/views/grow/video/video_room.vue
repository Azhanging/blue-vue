<template>
	<bv-home-view class='wap' :router-level='3' slot-scope='scope' style='background-color: #f4f4f4;'>
		
		<template slot='default' slot-scope='scopeMsg' >
			<!--{{scopeMsg.scroll.top}}-->
			
			<div ref='viewBox' id="videoH" >
			
				<w-home-header :header='header'>
					<!--<div slot='right-control' class='bc-t-r'>-->
					<!--<i class='iconfont iconfenxiang bc-t-base bc-f-20rp bc-mg-r-10rp'  @click='$share'></i>-->
					<!--</div>-->
					<div :class='["video_wrap"]'>
						<!--未开播-->
						<div class='bc-ps-r  videoHeight' v-if='!haveVideo'>
							<img width='100%' class='bc-block bc-ps-a bgImg' :src="`${config.path.static}/img/grow/video.png`" alt=''>
							<div class='bc-ps-a time bc-f-12rp bc-t-white bc-v-m'>
								<i class='iconfont iconshijian'></i>
								<span class='bc-mg-l-6rp'>倒计时：{{diffTime | backTimeFilter}}</span>
							</div>
						</div>
						
						<!--开播-->
						<div  v-show='hiddenVideo'  :class='["bc-ps-r"]'>
							<div :class='[!config.device.isPc ? "video_max_height":"","prism-player","video"]' v-if='haveVideo' id="J_prismPlayer">
							</div>
							<span v-if='videoEnd' class='bc-f-12rp bc-ps-a bc-t-white videoEnd'>直播已结束</span>
						</div>
					

						<!--刷新，观看人数-->
						<div class='bc-flex bc-flex-jc-sb bc-flex-ai-c bc-pd-8rp playVideoWrap' style='background-color:#666;'>
							<div class='refresh bc-pd-lr-8rp' @click='$router.go(0)'>
								<i class='iconfont iconshuaxin'></i>&nbsp;<span class='bc-f-12rp'>刷新</span>
							</div>
							<span class='lookNum bc-pd-lr-6rp'>
								<i class='iconfont icongeren'></i>&nbsp;<span class='bc-f-12rp'>{{chatData.uid_count}}</span>
							</span>
						</div>
					
					</div>
					
					<div class='bc-flex tab bc-flex-ai-c bc-bg-white bc-f-16rp'>
						<div class='bc-flex-1 bc-t-c ' :class='tabNum == 1 ? "tabActive":""' @click='video_tab(1)'>互动</div>
						<div class='bc-flex-1 bc-t-c' :class='tabNum == 2 ? "tabActive":""' @click='video_tab(2)'>内容概要</div>
					</div>
				</w-home-header>
				
				
				<div class='cont_wrap'>
					<!--聊天-->
					<div v-if='tabNum == 1'>
						<!--未开播-->
						<div class='bc-t-c' v-if='!haveVideo'>
							<p class='bc-f-16rp bc-mg-t-30rp'>{{resVideo.title}}</p>
							<span class='bc-t-999'>本次直播将于 {{resVideo.start_time * 1000 | timeFilter("Y年M月D日 h:min")}} 开始</span>
						</div>
						<!--直播聊天-->
						<div v-if='haveVideo'>
							<chat :chatList='chatData.chatList' :userInfoId='userInfoId'></chat>
						</div>
					</div>
					
					<!--内容概要-->
					<div v-else class='bc-pd-tb-30rp bc-pd-lr-15rp'>
						<div class='bc-f-16rp bc-mg-b-15rp'>主题介绍</div>
						<div class='bc-f-14rp bc-t-999  intro'>
							{{resVideo.content}}
						</div>
					</div>
				</div>
			</div>
		</template>
		
		
		
		<template slot='other'>
			<!--底部发送-->
			<div v-if='haveVideo && tabNum != 2' class='send_wrap bc-ps-f bc-pd-lr-15rp bc-pd-tb-10rp  bc-flex bc-flex-ai-c bc-bg-white'>
				<textarea id='chatContent' class='bc-mg-lr-15rp bc-flex-1' v-model="textareaVal" :rows='textareaRow'  @focus="textareaFocus" @blur="textareaBlur" placeholder='来说点什么'></textarea>
				<div class='sendBtn bc-t-white bc-t-c' @click='send'>发送</div>
			</div>
		</template>
	</bv-home-view>
	
	<!--<bv-home-view v-else='config.device.isPc' class='pc'>-->
	<!---->
	<!---->
	<!--</bv-home-view>-->


</template>

<script>

	import chat from "@components/wap/grow/w-chat"
	import WebSocketChat from '@assets/js/chat.js';
	import VideoPlayer from '@assets/js/videoplayer';
	import utils from 'blue-utils';
	import store from '@store';
	import programUrl from '@config/program-url';



	export default {
		name: "videoRoom",
		components: {
			chat
		},
		data() {
			return {
				header: {
					title: {
						value: '直播间'
					}
				},
				userInfoId: -1,
				resVideo: {},
				player: null,
				haveVideo: true,
				tabNum: 1,
				videoEnd:false,
				video: {
					isLive: false, //是否直播
					url: '',
					cover: '',
					videoId: '',
					playauth: '',
					cover: '',
				},
				chatData:{
					chatList: [],//聊天数据
					uid_count:0 //观看人数
				},
				textareaRow: 1,
				socket: {}, //储存websocket对象
				textareaVal: "",//发的信息
				diffTime: 0,
				hiddenVideo:true,
			}
		},
		computed: {
			// state() {
			// 	return this.$store.state;
			// }
		},
		methods: {
			textareaFocus(){
				this.textareaRow = 2;
				if(this.player) {
					let player = this.player.player;
					this.player.player.pause();
				}
				this.hiddenVideo = false;  //隐藏
			},
			textareaBlur(){
				this.textareaRow = 1;
				if(this.player){
					let player = this.player.player;
						this.player.player.play()
				};
				this.hiddenVideo = true;  //显示
			},
			video_tab(num) {
				this.tabNum = num
			},
			//倒计时
			timer() {
				const dataTimer = setTimeout(() => {
					var todayDateTime = new Date().getTime();
					var playDate = this.resVideo.start_time * 1000;
					//当前时间大于活动开始时间，开始直播
					if (todayDateTime - playDate > 0) {
						// this.activityStatus = 2;
						clearTimeout(dataTimer);
						// this.$router.go(0);
						return;
					} else {
						this.diffTime = Number(playDate) - Number(todayDateTime);  //时间差
					}
					setTimeout(this.timer());
				}, 1000);
			},
			//发送消息
			send() {
				if(!this.textareaVal){ return; }; //没有输入值
				if(!(/[^\s]+/.test(this.textareaVal))) return;   //输入的全是空格
				
				// this.socket.send(JSON.stringify({
				// 	id: this.$route.query.id,
				// 	textareaVal: this.textareaVal
				// }));
				
				
				this.replaceTextarea1(this.textareaVal);
				this.$axios({
					method: 'post',
					url: '/api/client/send_message',
					data: {
						type: 'chatMessage',
						live_video_id: this.$route.query.id,
						content: this.textareaVal
					}
				}).then((res) => {
					this.getHeight();
				});
				this.clear();
			},
			clear() {
				this.textareaVal = '';
				// this.blur();
			},
			blur() {
				document.getElementById('chatContent').focus();
			},
			//接收消息
			receiveMsg() {
				var that = this;
				this.socket.onMessage((evt) => {
					const data = JSON.parse(evt.data),
						type = data.data.type,
						id = this.$route.query.id;
					
					// console.log(data);
					
					switch (type) {
						// 服务端ping客户端
						case 'ping':
							// $.post("/api/client/send_message",{type:'ping'},function(){})
							break;
						case 'init':
							// 利用jquery发起ajax请求，将client_id发给后端进行uid绑定
							this.$axios.post('/api/client/bind', {
								client_id: data.data.client_id,
								live_video_id: id,
							}).then((res) => {

							})
							break;
						// 监测聊天数据
						case 'chatMessage':
							that.chatData.chatList.push(data.data);
							
							
							// alert(data.data.member_id);

							if(data.data.system == 1){
                that.chatData.uid_count = data.data.uid_count;
              }
							this.$nextTick(()=>{
								setTimeout(()=>{
									this.getHeight();
								},0);

								console.log(that.chatData.chatList)
							});
							break;
					};
				})
			},
			//获取历史聊天
			// getHistory(){
			// 	this.$axios({
			// 		method: 'get',
			// 		url: '/api/live_video/getMessageList',
			// 		data: {
			// 			page:1,
			// 			live_video_id: this.$route.query.id,
			// 		}
			// 	}).then((res) => {
			// 	});
			// },
			replaceTextarea1(str){
				//替换所有的换行符
				str = str.replace(/\r\n/g," ")
				str = str.replace(/\n/g," ");
				//替换所有的空格（中文空格、英文空格都会被替换）
				// str = str.replace(/\s/g,"");
				this.textareaVal = str;
			},
			//获取直播地址
			getDirectVideo(url) {
				// console.log('直播')
				this.$axios.get('/api/live_video/get_live_play_url', {
					params: {
						play_url: url
					}
				}).then((res) => {
					this.video.url = res.data.data.url;
					this.video.isLive = true;
					this.videoPlay_init(this.video);
				}).catch((error) => {
					// console.log(error);
				});
			},
			getVideo(id) {
				this.$axios.get('/api/live_video/get_play_auth', {
					params: {
						videoId: id
					}
				}).then((res) => {
					this.video = utils.extend(this.video, res.data.data);
					this.videoPlay_init(this.video);
				}).catch((error) => {
					// console.log(error);
				});
			},
			videoPlay_init(video) {
				// 微信分享
				this.$weChatShare({
					title: this.resVideo.share_title,
					desc: this.resVideo.share_content,
					imgUrl: this.resVideo.share_img,
				});
				
				let that = this;
				this.player = new VideoPlayer({
					id: 'J_prismPlayer',
					autoplay: video.isLive,
					isLive: video.isLive,
					//直播
					source: video.url,
					//点播
					vid: video.videoId,
					playauth: video.playauth,
					cover: video.cover,
          extraInfo:{ //直播流中断不重试
						"liveRetry":1
					},
          liveOverTime:false,
					hooks:{
						liveStreamStop(){
							this.videoEnd = true;
						}
					}
				});
				
				

			},
			//获取视频详情
			getVideoDetail() {
				this.$axios.get('/api/live_video/detail', {
					params: {
						live_video_id: this.$route.query.id
					}
				}).then((res) => {
					this.resVideo = res.data.data.video_info;
					this.video.cover = this.resVideo.cover;
					//直播预告
					
					if (this.resVideo.status == 1) {
						this.haveVideo = false;
						this.timer(); //直播未开始时倒计时
					} else if (this.resVideo.status == 2 || this.resVideo.status == 3) {  //正在直播 历史直播
						this.haveVideo = true;
						if(this.resVideo.status == 2){
							// console.log(this.resVideo)
							this.getDirectVideo(this.resVideo.play_url);
						}else{
							this.getVideo(this.resVideo.videoId)
						};
						this.socket = new WebSocketChat(`wss://${programUrl.webSocket}/websocket`);
						this.receiveMsg();
						
						
					}

				}).catch((error) => {
					// console.log(error);
				});
			},
			getHeight(){
				this.$el.children[0].scrollTop = document.getElementById('videoH').offsetHeight + 300;
			},
			init() {
				this.getVideoDetail()
			}
		},
		beforeRouteLeave (to, from, next) {
			// console.log('断开1')
			this.socket.websocket.close();
			next()
		},
		// destroy() {
		// 	console.log('断开2')
		// 	this.socket.onclose()
		// },
		mounted() {
			this.init();
		}
	}
</script>

<style lang='scss' scoped>
	.wap {
		.hidden_video{
			visibility: hidden;
			height: 0;
		}
		.videoEnd{
			top: 0px;
			bottom: 0px;
			right: 0px;
			left: 0px;
			margin: auto auto;
			display: block;
			width: 100px;
			height: 25px;
			text-align: center;
			line-height: 25px;
			background: rgba(0,0,0,.7);
			border-radius: rem(12);
			z-index: 1000;
		}
		.videoHeight{
			width: 100%;
			height: 310px !important;
			background-color: #f4f4f4;
			.bgImg {
				width: rem(116);
				height: rem(85);
				top: 20%;
				left: 50%;
				transform: translateX(-50%);
			}
			.time {
				width: 100%;
				bottom: 0;
				left: 0;
				background-color: rgba(0, 0, 0, .6);
				padding: rem(8) rem(15);
				box-sizing: border-box;
			}
			
			
		}
		.playVideoWrap{
			.lookNum{
				color: #fff;
				height: rem(20);
				/*background-color: rgba(0, 0, 0, .6);*/
				border-radius: rem(9);
				i {
					font-size: rem(10);
				}
			}
			.refresh {
				color: #333;
				background-color: #fff;
				border-radius: rem(12);
				text-align: center;
				i {
					font-size: rem(10);
				}
			}
		}
		.video_max_height{
			max-height: rem(210) !important;
		}
		.video {
			width: 100%;
			background-color: #f4f4f4;
			.bgImg {
				width: rem(116);
				height: rem(85);
				top: 20%;
				left: 50%;
				transform: translateX(-50%);
			}
			.time {
				width: 100%;
				bottom: 0;
				left: 0;
				background-color: rgba(0, 0, 0, .6);
				padding: rem(8) rem(15);
				box-sizing: border-box;
			}
			.refresh {
				top: rem(15);
				left: rem(15);
				color: #fff;
				width: rem(20);
				height: rem(20);
				background-color: rgba(0, 0, 0, .6);
				border-radius: 50%;
				text-align: center;
				i {
					font-size: rem(10);
				}
			}
		}
		.tab {
			height: rem(45);
			line-height: rem(45);
			.tabActive {
				color: $color-base;
				border-bottom: 2px $color-base solid;
			}
		}
		.cont_wrap {
			/*background-color: pink;*/
			.intro {
				line-height: rem(22);
			}
			
		}
		.send_wrap {
			width: 100%;
			bottom: 0;
			left: 0;
			box-sizing: border-box;
			z-index: 1000;
			.textWrap {
				border: none;
				min-height: 20px;
				max-height: 300px;
				padding: rem(3);
				outline: 0;
				background-color: #f7f7f7;
				border-radius: rem(4);
				outline-style: none;
				color: #333;
				overflow-x: hidden;
				overflow-y: auto;
			}
			textarea {
				border: none;
				padding: rem(3);
				outline: 0;
				background-color: #f7f7f7;
				border-radius: rem(4);
				outline-style: none;
				color: #333;
			}
			textarea::-moz-placeholder {
				color: #999;
			}
			textarea:-ms-textarea-placeholder {
				color: #999;
			}
			textarea::-webkit-textarea-placeholder {
				color: #999;
			}
			.sendBtn {
				width: rem(50);
				height: rem(33);
				line-height: rem(33);
				background-color: $color-base;
			}
		}
	}
	
	.enter-x5-player video.center {
		object-position: 50% 50% !important;
	}
	
	.prism-progress-cursor {
		margin-left: 0px !important;
	}
	
	/*.enter-x5-player video
	{
		object-position: 0px 10px;
		/*height:auto !important;*/
	
	/*}*/
	
	video::-webkit-media-controls {
		display: none !important;
	}


</style>