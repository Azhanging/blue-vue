<template>
	<div class='chat_wrap bc-pd-15rp' id='chat'>
		<div v-for='(item,index) in chatList' :key='index'  v-if='chatList.length > 0' class=' bc-mg-b-15rp'>
			<div class='bc-t-c bc-t-999 bc-mg-b-15rp' v-if='item.time'>{{item.time}}</div>
			<div v-if='item.system == 1' class='bc-t-c bc-t-999'>{{item.content}}</div>
			<div v-else class='bc-flex bc-flex-ac-s' :class='item.member_id == $store.state.userInfo.id ? "right":"left"'>
				<img class='headImg' :src='item.head_img' alt=''>
				<div class='content'>
					<div class='name bc-mg-b-5rp'>{{item.nickname}}</div>
					<span class='cont'>
						{{item.content}}
					</span>
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
			},
			userInfoId:{
				default:'',
				type:[Number,String]
			}
		},
		data() {
			return {

			}
		},
		computed:{
			msg(){
				// const store = this.$store.state;
				// return(store.msg[this.user.id] && store.msg[this.user.id].msg) || [];
			}
		},
		methods:{
			// video_tab(num){
			// 	this.tabNum = num
			// }
		},
		mounted(){
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
				text-align: right;
				.name{
					text-align: right;
				}
				.cont{
					padding: rem(5) rem(10);
					background: url($base-url+'/img/grow/rightchat.png')  no-repeat;
					background-size: 100% 100%;
					display: inline-block;
					text-align: left;
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
				text-align: left;
				.cont{
					padding: rem(5) rem(10);
					background: url($base-url+'/img/grow/leftchat.png')  no-repeat;
					background-size: 100% 100%;
					display: inline-block;
					text-align: left;
				}
			}
		}
	}
</style>