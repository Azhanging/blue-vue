<template>
	<bv-home-view class='wap' :router-level='3' style='background-color: #f4f4f4;'>
		
		
		<div ref='viewBox' id="videoH">
			<w-home-header :header='header'>
				<!--<div slot='right-control' class='bc-t-r'>-->
					<!--<i class='iconfont iconfenxiang bc-t-base bc-f-20rp bc-mg-r-10rp'  @click='$share'></i>-->
				<!--</div>-->
				
				<div class='video_wrap'>
					<!--未开播-->
					<div class='bc-ps-r video' v-if='!haveVideo'>
						<img width='100%' class='bc-block bc-ps-a bgImg' :src="`${$config.path.static}/img/grow/video.png`" alt=''>
						<div class='bc-ps-a time bc-f-12rp bc-t-white bc-v-m'>
							<i class='iconfont iconshijian'></i>
							<span class='bc-mg-l-6rp'>倒计时：{{diffTime | backTimeFilter}}</span>
						</div>
						<div class='bc-ps-a refresh' @click='$router.go(0)'>
							<i class='iconfont iconshuaxin'></i>
						</div>
					</div>
					<!--开播-->
					<div  class="prism-player video" v-if='haveVideo' id="J_prismPlayer">
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
						<span class='bc-t-999'>本次直播将于 {{resVideo.start_time | timeFilter("Y年M月D日 h:min")}} 开始</span>
					</div>
					<!--直播聊天-->
					<div v-if='haveVideo'>
						<chat :chatList='chatList' :userInfoId='userInfoId'></chat>
					</div>
				</div>
				
				<!--内容概要-->
				<div  v-else class='bc-pd-tb-30rp bc-pd-lr-15rp' >
					<div class='bc-f-16rp bc-mg-b-15rp'>主题介绍</div>
					<div class='bc-f-14rp bc-t-999  intro'>
						{{resVideo.content}}
					</div>
				</div>
			</div>
			
			
		</div>
		
		<template slot='other'>
			<!--底部发送-->
			<div class='send_wrap bc-ps-f bc-pd-lr-15rp bc-pd-tb-10rp  bc-flex bc-flex-ai-c bc-bg-white'>
				<!--<i class='iconfont iconbiaoqing bc-f-22rp'></i>-->
				<!--<div contenteditable="true"  style="-webkit-user-select: text" class='bc-mg-r-15rp bc-flex-1 textWrap'></div>-->
				<textarea id='chatContent' class='bc-mg-lr-15rp bc-flex-1' v-model="textareaVal" :rows='textareaRow'   @focus="textareaRow = 2" @blur="textareaRow = 1" placeholder='来说点什么' ></textarea>
				<div class='sendBtn bc-t-white bc-t-c' @click='send'>发送</div>
			</div>
		</template>
	</bv-home-view>
	
	<!--<bv-home-view v-else='$config.device.isPc' class='pc'>-->
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


	export default {
		name: "videoRoom",
		components:{
			chat
		},
		data() {
			return {
				header: {
					title:{
						value:'直播间'
					}
				},
				userInfoId:-1,
				resVideo:{},
				player:{},
				haveVideo:true,
				tabNum:1,
				video:{
					isLive:false, //是否直播
					url:'',
					cover:'',
					videoId : '',
					playauth : '',
					cover: '',
				},
				chatList:[],//聊天数据
				textareaRow:1,
				socket:{}, //储存websocket对象
				textareaVal:"" ,//发的信息
				diffTime:0,

			}
		},
		computed: {
			// state() {
			// 	return this.$store.state;
			// }
		},
		methods:{
			video_tab(num){
				this.tabNum = num
			},
			//倒计时
			timer() {
				const dataTimer = setTimeout(()=> {
					var todayDateTime =  new Date().getTime();
					var playDate = this.resVideo.start_time;
					//当前时间大于活动开始时间，开始直播
					if (todayDateTime - playDate > 0) {
						// this.activityStatus = 2;
						clearTimeout(dataTimer);
						// this.$router.go(0);
						return;
					}else{
						this.diffTime = Number(playDate) - Number(todayDateTime);  //时间差
					}
					setTimeout(this.timer());
				}, 1000);
			},
			//发送消息
			send(){

				this.$axios({
					method: 'post',
					url:'/api/client/send_message',
					data:{
						type:'chatMessage',
						live_video_id:this.$route.query.id,
						content:this.textareaVal
					}
				}).then((res)=>{

				});
				this.clear();
			},
			clear() {
				this.textareaVal = '';
				this.blur();
			},
			blur() {
				document.getElementById('chatContent').focus();
			},
			//接收消息
			receiveMsg(){
				var that = this;
				this.socket.onMessage((evt) => {
					const data = JSON.parse(evt.data),
						type = data.data.type,
						id = this.$route.query.id;
					switch(type){
						// 服务端ping客户端
						case 'ping':
							// $.post("/api/client/send_message",{type:'ping'},function(){})
							break;
						case 'init':
							// 利用jquery发起ajax请求，将client_id发给后端进行uid绑定
							this.$axios.post('/api/client/bind', {
									client_id:data.data.client_id,
									live_video_id:id,
							}).then((res) => {
							
							})
							break;
						// 监测聊天数据
						case 'chatMessage':
							that.chatList.push(data.data);
							console.log(that.chatList)
							break;
					};
				})
			},
			//获取直播地址
			getDirectVideo(url){
				this.$axios.get('api/live_video/get_live_play_url',{
					params:{
						play_url:url
					}
				}).then((res) => {
					this.video.url = res.data.data.url;
					this.video.isLive = true;
					this.videoPlay_init(this.video);
				}).catch((error) => {
					console.log(error);
				});
			},
			getVideo(id){
				this.$axios.get('api/live_video/get_play_auth',{
					params:{
						videoId:id
					}
				}).then((res) => {
						this.video = utils.extend(this.video,res.data.data);
						this.videoPlay_init(this.video);
				}).catch((error) => {
					console.log(error);
				});
			},
			videoPlay_init(video){
				console.log(video)
				this.player = new VideoPlayer({
					id: 'J_prismPlayer',
					autoplay: true,
					isLive: video.isLive,
					width:'100%',
					playsinline: true,
					controlBarVisibility: 'hover',
					//直播
					source:video.url,
					//点播
					vid : video.videoId,
					playauth : video.playauth,

					useH5Prism: true,
					useFlashPrism: false,
					x5_video_position: 'normal',
					//prismplayer 2.0.1版本支持的属性，主要用户实现在android 微信上的同层播放
					x5_type: 'h5', //通过 video 属性 “x5-video-player-type” 声明启用同层H5播放器，支持的值：h5 https://x5.tencent.com/tbs/guide/video.html
					cover:video.cover,

					// skinLayout:false
				});
				console.log(this.player)
			},
			//获取视频详情
			getVideoDetail(){
				this.$axios.get('api/live_video/detail',{
					params:{
						live_video_id:this.$route.query.id
					}
				}).then((res) => {
					this.resVideo = res.data.data.video_info;
					this.video.cover = this.resVideo.cover;
					this.haveVideoFn();
					if(this.resVideo.status == 2 ){
						//直播时判断直播有没有开始
						if(this.haveVideo){
							this.getDirectVideo(this.resVideo.play_url)
						}
					}else if(this.resVideo.status == 1 || this.resVideo.status == 3){
						this.getVideo(this.resVideo.videoId)
					}
					
				}).catch((error) => {
					console.log(error);
				});
			},
			init(){
				this.getVideoDetail()
			},
			//判断是否有视频
			haveVideoFn(){
				var nowTime = new Date().getTime();
				this.haveVideo = nowTime < this.resVideo.start_time ? false :true;
				if(this.haveVideo){
					//直播或者历史
					console.log('链接')
					this.socket = new WebSocketChat("ws://120.132.112.2:2348");
					this.receiveMsg();
					
				}else{
					this.timer(); //直播未开始时倒计时
				}
			}
		},
		destroy () {
			this.socket.onclose()
		},
		mounted(){
			this.init();
			this.userInfoId = store.state.userInfo.id
		}
	}
</script>

<style lang='scss' scoped>
	.wap {
		.video{
			width: 100%;
			max-height:rem(210) !important;
			background-color: #f4f4f4;
			.bgImg{
				width: rem(116);
				height: rem(85);
				top:20%;
				left: 50%;
				transform: translateX(-50%);
			}
			.time{
				width: 100%;
				bottom: 0;
				left: 0;
				background-color: rgba(0,0,0,.6);
				padding: rem(8) rem(15);
				box-sizing: border-box;
			}
			.refresh{
				top: rem(15);
				left: rem(15);
				color: #fff;
				width: rem(20);
				height: rem(20);
				background-color: rgba(0,0,0,.6);
				border-radius: 50%;
				text-align: center;
				i{
					font-size: rem(10);
				}
			}
		}
		.tab{
			height: rem(45);
			line-height: rem(45);
			.tabActive{
				color:$color-base;
				border-bottom: 2px $color-base solid;
			}
		}
		.cont_wrap{
			/*background-color: pink;*/
			.intro{
				line-height: rem(22);
			}
			
		}
		.send_wrap{
			width: 100%;
			bottom: 0;
			left: 0;
			box-sizing: border-box;
			z-index: 1000;
			.textWrap{
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
			textarea{
				border: none;
				padding: rem(3);
				outline: 0;
				background-color: #f7f7f7;
				border-radius: rem(4);
				outline-style: none;
				color:#333;
			}
			textarea::-moz-placeholder {
				color: #999;
			}
			textarea:-ms-textarea-placeholder{
				color: #999;
			}
			textarea::-webkit-textarea-placeholder{
				color:#999;
			}
			.sendBtn{
				width: rem(50);
				height: rem(33);
				line-height: rem(33);
				background-color:$color-base;
			}
		}
	}
	
	.enter-x5-player video.center
	{
		object-position:50% 50% !important;
	}
	
	.prism-progress-cursor
	{
		margin-left:0px !important;
	}
	
	/*.enter-x5-player video
	{
		object-position: 0px 10px;
		/*height:auto !important;*/
	
	/*}*/
	
	
	video::-webkit-media-controls {
		display:none !important;
	}


</style>