<template>
	<div class="expense-l-box">
		<div class="expense-icon">
			<div>
				<span @click="btn_ifshowWin"><i class="iconfont icongeren"></i></span>
				<p>消费者</p>
			</div>
			<div @click="btn_ifshowWin">
				<span><i class="iconfont icondianping"></i></span>
				<p>点评天使</p>
			</div>
			<div @click="btn_ifshowWin">
				<span><i class="iconfont iconhuiyuan"></i></span>
				<p>vip会员</p>
			</div>
		</div>
		<div class="expense-list">
			<w-arrlist></w-arrlist>
			<!--<itemList></itemList>-->
		</div>

		<div class="expense-mask" v-if="winShow"></div>
		<div class="expense-win" v-if="winShow">
			<div class="expense-win-box">
				<div id="expense-win-close" @click="btn_hideWin">
					<i class="iconfont iconguanbi"></i>
				</div>
				每个人都不是完美无缺的，每个人都不是完美无缺的，每个人都不是完美无缺的，每个人都不是完美无缺的，每个人都不是完美无缺的，
			</div>
			<div class="expense-win-more">
				<router-link to="">了解更多</router-link>
			</div>
		</div>

	</div>
</template>

<script>
	import {scrollMixin, scrollEndHook, scrollNoHasListData} from '$scroll';
	import WArrlist from '@components/wap/article/w-arrlist'
	export default {
		name: "course",
		components: {
			'w-arrlist': WArrlist
		},
		data() {
			return {
				winShow:false
			}
		},
		methods: {
			btn_ifshowWin(){
				this.winShow = !this.window;
			},
			btn_hideWin() {
				this.winShow = false
			}
		}
	}
</script>

<style scoped lang="scss">
	.expense-mask{
		background: rgba(000,000,000,.5);
		position: fixed;
		left: 0;
		right: 0;
		top:0;
		bottom: 0;
		z-index: 201;
	}
	.expense-win{
		position: fixed;
		left: 50%;
		top:35%;
		width: 80%;
		margin-left: -40%;
		z-index: 202;
		background: #fff;
		border-radius: rem(10);
		overflow: hidden;
		.expense-win-box{
			position: relative;
			padding: rem(20) rem(15);
			color: #666;
			#expense-win-close{
				position: absolute;
				right: rem(3);
				top:rem(3);
			}
		}
		.expense-win-more{
			a{
				display: block;
				background: #CA9F75;
				color: #fff;
				font-size: rem(14);
				padding: rem(12);
				text-align: center;
			}
		}
	}

	.expense-icon {
		display: flex;
		margin: 0 rem(15) rem(10);

		div {
			flex: 1;
			text-align: center;
			span{
				display: block;
				margin: 0 auto;
				width: rem(33);
				height: rem(33);
				line-height: rem(33);
				border: 1px solid #CA9F75;
				color: #CA9F75;
				align-items: center;
				text-align: center;
				border-radius: 100%;
			}
			p {
				color: #333;
				font-size: rem(12);
				margin-top: 7px;
			}
		}
	}
</style>
