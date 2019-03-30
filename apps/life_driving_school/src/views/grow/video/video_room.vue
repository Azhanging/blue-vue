<template>
	<bv-home-view class='wap' :router-level='3' style='background-color: #f4f4f4;'>
		
		<w-home-header :title='"直播间"'>
			<div slot='right-control' class='bc-t-r'>
				<i class='iconfont iconfenxiang bc-t-base bc-f-20rp bc-mg-r-10rp'  @click='$share'></i>
			</div>
			
			<div class='video_wrap'>
				<!--未开播-->
				<div class='bc-ps-r video' v-if='!haveVideo'>
					<img width='100%' class='bc-block bc-ps-a bgImg' :src="`${$config.path.static}/img/grow/video.png`" alt=''>
					<div class='bc-ps-a time bc-f-12rp bc-t-white bc-v-m'>
						<i class='iconfont iconshijian'></i>
						<span class='bc-mg-l-6rp'>倒计时：{{1548946491687 | timeFilter("D天 h时 min分 s秒")}}</span>
					</div>
					<div class='bc-ps-a refresh'>
						<i class='iconfont iconshuaxin'></i>
					</div>
				</div>
				<!--开播-->
				<!--<div class='bc-ps-r video' v-if='haveVideo'>-->
					<!--<img width='100%' class='bc-block bc-ps-a bgImg' :src="`${$config.path.static}/img/grow/video.png`" alt=''>-->
					<!--<div class='bc-ps-a time bc-f-12rp bc-t-white bc-v-m'>-->
						<!--<i class='iconfont iconshijian'></i>-->
						<!--<span class='bc-mg-l-6rp'>倒计时：{{1548946491687 | timeFilter("D天 h时 min分 s秒")}}</span>-->
					<!--</div>-->
					<!--<div class='bc-ps-a refresh'>-->
						<!--<i class='iconfont iconshuaxin'></i>-->
					<!--</div>-->
				<!--</div>-->
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
					<p class='bc-f-16rp bc-mg-t-30rp'>直播标题</p>
					<span class='bc-t-999'>本次直播将于 {{1548946491687 | timeFilter("Y年M月D日 h:min")}} 开始</span>
				</div>
				<!--开播聊天-->
				<div v-if='haveVideo'>
					 <chat :chatList='chatList'></chat>
				</div>
			</div>
		
			<!--内容概要-->
			<div  v-else class='bc-pd-tb-30rp bc-pd-lr-15rp' >
				<div class='bc-f-16rp bc-mg-b-15rp'>主题介绍</div>
				<div class='bc-f-14rp bc-t-999  intro'>
					在网络应用场景下：表情是日常生活的艺术化表达，被喻为语音与文字以外的第三种语言。富有创意，精心为聊天场景制作的表情，不仅可以增加用户在聊天中的乐趣，还能收到意想不到的表达效果。
				</div>
			</div>
		</div>
		
		<!--底部发送-->
		<div class='send_wrap bc-ps-f bc-pd-lr-15rp bc-pd-tb-10rp bc-flex bc-flex-ai-c bc-bg-white'>
			<!--<i class='iconfont iconbiaoqing bc-f-22rp'></i>-->
			<div contenteditable="true"  style="-webkit-user-select: auto" class='bc-mg-r-15rp bc-flex-1 textWrap'></div>
			<!--<div contenteditable="true" class='bc-mg-lr-15rp bc-flex-1 textarea'-->
			     <!--:class='msgfocus?"textfocus":""' placeholder='来说点什么'></div>-->
			<!--<textarea class='bc-mg-lr-15rp bc-flex-1' :class='msgfocus?"textfocus":""' placeholder='来说点什么'></textarea>-->
			<div class='sendBtn bc-t-white bc-t-c'>发送</div>
		</div>
	
	</bv-home-view>
	
	<!--<bv-home-view v-else='$config.device.isPc' class='pc'>-->
	<!---->
	<!---->
	<!--</bv-home-view>-->


</template>

<script>
	
	import chat from "./chat"

	export default {
		name: "videoRoom",
		components:{
			chat
		},
		data() {
			return {
				tabNum:1,
				msgfocus:false, //是否聚焦
				haveVideo:true, //未开播
				//聊天数据
				chatList:[
					{
						name:'MEME',
						img:'https://imagedev.dtb315.com/626033.jpg?val=Thumb',
						msg:'有灵魂的设计师是这样设计的-干货特辑有灵魂的设计师是',
						time:1548946491687,
						type:'1'   //1是别人，0是自己
					},
					{
						name:'CYAN',
						img:'https://imagedev.dtb315.com/462515.jpg?val=Thumb',
						time:1548946491687,
						msg:'特辑有灵魂的设计师是',
						type:'0'   //1是别人，0是自己
					},
					{
						name:'YOYOYO',
						img:'https://imagedev.dtb315.com/612569.jpg?val=Thumb',
						time:1548946491687,
						msg:'特辑有灵魂的设计师是',
						type:'1'   //1是别人，0是自己
					}
				]
			}
		},
		methods:{
			video_tab(num){
				this.tabNum = num
			}
		},
		mounted(){
		
		}
	}
</script>

<style lang='scss' scoped>
	.wap {
		.video{
			width: 100%;
			height:rem(210);
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
			.textfocus{
				color: #333;
			}
			.sendBtn{
				width: rem(50);
				height: rem(33);
				line-height: rem(33);
				background-color:$color-base;
			}
		}
	}
</style>