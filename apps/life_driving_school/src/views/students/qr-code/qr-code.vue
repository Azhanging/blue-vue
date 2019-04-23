<template>
	<bv-home-view class='wap' :router-level='2' style="background: #f4f4f4">
		<w-home-header :header='{
            title:{
                value: "我的二维码"
            }
        }'

		>
			<div slot="right-control">
				<div class="bc-t-r">
					<i class='iconfont iconfenxiang bc-mg-r-10rp bc-t-base' @click="share_show"></i>
				</div>
			</div>
		</w-home-header>

		<div class="qr-code-box">
			<button class="qr-code-box-btn">保存</button>
			<div class="qr-code-img">
				<!--<template>
					&lt;!&ndash;<vue-qr style="width: 100%;height: 100%" :bgSrc='config.imagePath' :text="config.value" :size="200" :margin="0"></vue-qr>
					<vue-qr style="width: 100%;height: 100%" :logoSrc="config.imagePath" :text="config.value" :margin="0"></vue-qr>&ndash;&gt;
					<vue-qr style="width: 100%;height: 100%" :bgSrc='config.imagePath' :logoSrc="config.imagePath" :text="config.value" :size="200" :margin="0"></vue-qr>

				</template>-->
				<img src="https://p.ssl.qhimg.com/d/inn/0444533a/Snip20160525_6.png">
			</div>
			<div class="qr-code-title">我是{{ userInfo.nickname }}</div>
			<div class="qr-code-invitation">邀请您加入点通宝</div>
			<div class="qr-code-desc">
				<div class="qr-code-desc-tit">扫一扫加入购物宝，一次扫码，终身受益</div>
				<div class="qr-code-desc-phone">客服电话：13812345678</div>
				<div class="qr-code-desc-em">客服邮箱：DTB@dtb315.com</div>
			</div>
		</div>

		<div class="qr-code-share" v-if="share_box">
			<div class="qr-code-share-title">分享到</div>
			<div class="qr-code-share-box">
				<div class="qr-code-share-box-item" v-for="i in 4">
					<i class="iconfont"></i>
					<div>微信</div>
				</div>
			</div>

			<div class="qr-code-share-cancel" @click="share_hide">取消</div>

		</div>

	</bv-home-view>
</template>

<script>
	//import VueQr from 'vue-qr'
	export default {
		name: "qr-code",
		computed:{
			userInfo(){
				return this.$store.state.userInfo;
			}
		},
		components: {
			//VueQr
		},
		data() {
			return {
				share_box:false,
				config: {
					value: '',//显示的值、跳转的地址
					imagePath: ''//中间logo的地址
				}
			}
		},
		methods: {
			share_show() {
				this.share_box=true;
			},
			share_hide() {
				this.share_box=false;
			}
		},
		mounted() {
			this.config.value = window.location.href+'id='+this.userInfo.id
			this.config.imagePath = this.userInfo.head_img
			//console.log(this.userInfo.id)
		}
	}
</script>

<style scoped lang="scss">
.qr-code-box{
	margin: rem(15) auto;
	width: rem(300);
	height: rem(350);
	border-radius: rem(3);
	overflow: hidden;
	background: url($base-url+'/img/students/qr-code-box.png') center no-repeat;
	background-size: 100% 100%;
	text-align: center;
	position: relative;
	.qr-code-box-btn{
		position: absolute;
		right: rem(10);
		top:rem(10);
		width: rem(40);
		height: rem(40);
		background: rgba(255,255,255,.5);
		border-radius: 100%;
		font-size: rem(14);
		color: #30766F;
	}
	.qr-code-img{
		width: rem(164);
		margin: rem(30) auto 0;
		padding: rem(5);
		box-sizing: border-box;
		background: #fff;
		img{width: 100%;vertical-align: top;}
	}
	.qr-code-title{
		margin-top: rem(10);
		color: #333;
		font-size: rem(18);
	}
	.qr-code-invitation{
		color: #2F716A;
		font-size: rem(12);
	}
	.qr-code-desc{
		width: rem(270);
		margin: rem(15) auto;
		overflow: hidden;
		padding: rem(8);
		box-sizing: border-box;
		.qr-code-desc-tit{
			color: #30766F;
			font-size: rem(14);
		}
		.qr-code-desc-phone{
			color: #666;
			font-size: rem(12);
		}
		.qr-code-desc-em{
			color: #666;
			font-size: rem(12);
		}
	}
}
.qr-code-share{
	background: #fff;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	.qr-code-share-title{
		padding: rem(20);
		text-align: center;
		font-size: rem(16);
		color: #666;
	}
	.qr-code-share-box{
		padding-bottom: rem(20);
		display: flex;
		.qr-code-share-box-item{
			flex: 1;
			padding: 0 rem(10);
			text-align: center;
		}
	}
	.qr-code-share-cancel{
		text-align: center;
		padding: rem(20);
		color: #666;
		font-size: rem(16);
		border-top: 1px solid #e5e5e5;
	}
}
</style>
