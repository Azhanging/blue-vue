<template>
	<div class='chat_wrap bc-pd-15rp' id='chat'>
		<!--<div v-for='(item,index) in chatList' :key='index'-->
		     <!--class='bc-flex bc-flex-ac-s bc-mg-b-15rp'-->
		     <!--:class='item.type == 0 ? "right":"left"'>-->
			<!--<img class='headImg' :src='item.img' alt=''>-->
			<!--<div class='content'>-->
				<!--<div class='name bc-mg-b-5rp'>名字MEME</div>-->
				<!--<div class='cont'>-->
					<!--有灵魂的设计师是这样设计的-干货特辑有灵魂的设计师是-->
				<!--</div>-->
			<!--</div>-->
		<!--</div>-->
		
		<div v-for='(item,index) in chatList' :key='index' class=' bc-mg-b-15rp'>
			<div class='bc-t-c bc-t-999 bc-mg-b-15rp'>{{1548946491687 | timeFilter("M-D h:min")}}</div>
			<div class='bc-flex bc-flex-ac-s' :class='item.type == 0 ? "right":"left"'>
				<img class='headImg' :src='item.img' alt=''>
				<div class='content'>
					<div class='name bc-mg-b-5rp'>名字MEME</div>
					<div class='cont'>
						有灵魂的设计师是这样设计的-干货特辑有灵魂的设计师是
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>


	export default {
		name: "chat",
		props:{
			chatList:{
				default:[],
				type:Array
			}
		},
		data() {
			return {

			}
		},
		computed:{
			msg(){
				const store = this.$store.state;
				this.$nextTick(() => {
					this.scrollBot()
				});
				return(store.msg[this.user.id] && store.msg[this.user.id].msg) || [];
			}
		},
		methods:{
			video_tab(num){
				this.tabNum = num
			},
			scrollBot(){
				const videoH = document.getElementById('videoH');
				this.$parent.$el.children[0].scrollTo(0,videoH.offsetHeight)
			}
		},
		mounted(){
			this.$nextTick(() => {
				this.scrollBot()
			})
		}
	}
</script>

<style lang='scss' scoped>
	.chat_wrap {
		padding-bottom: rem(60) !important;
		.right{
			flex-direction: row-reverse;
			.headImg{
				width: rem(40);
				height: rem(40);
				border-radius: 50%;
				margin-left: rem(10);
			}
			.content{
				max-width: 70%;
				margin-top: -6px;
				.name{
					text-align: right;
				}
				.cont{
					padding: rem(5);
					background: url($base-url+'/img/grow/rightchat.png')  no-repeat;
					background-size: 100% 100%;
				}
			}
		}
		.left{
			flex-direction: row;
			.headImg{
				width: rem(40);
				height: rem(40);
				border-radius: 50%;
				margin-right: rem(10);
				
			}
			.content{
				max-width: 70%;
				margin-top: -6px;
				.cont{
					padding: rem(5);
					background: url($base-url+'/img/grow/leftchat.png')  no-repeat;
					background-size: 100% 100%;
				}
			}
		}
	}
</style>