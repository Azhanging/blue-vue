<template>
	<bv-home-view class='wap' :router-level='4' style='background-color: #f4f4f4;'>
		<w-home-header :header="{
			title:{
				value:'详情'
			}
		}"></w-home-header>

		<div style="height: 500px;"></div>

		<div class="album-detail">
			<div class="question-review">
				<div class="question-review-top">
					<div class="question-review-top-l">
						<img src="https://image.dtb315.com/76343.jpg">
					</div>
					<div class="question-review-top_r">
						<div class="question-review-top-tit">
							<div class="question-review-top-tit-l">聪明的一休</div>
							<div class="question-review-top-tit-r">
								<span><i class="iconfont icondianzan"></i> 2222</span>
								<span @click="btn_reply"><i class="iconfont icongengduo"></i></span>
							</div>
						</div>
						<div class="question-review-top-time">1小时前</div>
						<div class="question-review-top-box">猫和老鼠你好，我是聪明的一休</div>
						<div class="question-review-top-reply"><span>@猫和老鼠</span>我是猫和老鼠我是猫和老鼠我是猫和老鼠我是猫和老鼠我</div>
					</div>
				</div>
				<div class="question-review-top">
					<div class="question-review-top-l">
						<img src="https://image.dtb315.com/76343.jpg">
					</div>
					<div class="question-review-top_r">
						<div class="question-review-top-tit">
							<div class="question-review-top-tit-l">鼠妹的小夏目</div>
							<div class="question-review-top-tit-r">
								<span><i class="iconfont icondianzan"></i> 155</span>
								<span><i class="iconfont icongengduo"></i></span>
							</div>
						</div>
						<div class="question-review-top-time">2小时前</div>
						<div class="question-review-top-box">你好，我是鼠妹的夏目</div>
					</div>
				</div>
			</div>
		</div>

		<div class="review-txt">
			<div class="review-txt-l">
				<i class="iconfont iconbianji"></i><input type="text" placeholder="写评论...">
			</div>
			<div class="review-txt-r">
				<div><i class="iconfont iconpinglun"></i><span>3654</span></div>
				<div><i class="iconfont iconxingxing"></i></div>
				<div><i class="iconfont icondianzan"></i></div>
				<div><i class="iconfont icon-"></i></div>
			</div>
		</div>

		<div class="reply_mask" v-if="reply_show"></div>
		<div class="reply_show" v-if="reply_show">
			<div class="reply_item">回复</div>
			<div class="reply_item" @click="btn_reply_h">取消</div>
		</div>

	</bv-home-view>
</template>

<script>
	export default {
		name: "album-detail",
		data() {
			return {
				reply_show:false
			}
		},
		methods:{
			btn_reply() {
				this.reply_show = true
			},
			btn_reply_h() {
				this.reply_show = false
			}
		}
	}
</script>

<style scoped lang="scss">
	.album-detail{
		padding: 0 rem(15);
		background: #fff;
		margin-bottom: rem(50);
		.question-review {
			overflow: hidden;
			padding-top: rem(15);

			.question-review-top {
				display: flex;
				margin-bottom: rem(10);

				.question-review-top-l {
					width: rem(38);
					height: rem(38);
					border-radius: 100%;
					overflow: hidden;
					margin-right: rem(15);

					img {
						vertical-align: top;
						width: 100%;
					}
				}

				.question-review-top_r {
					flex: 1;

					.question-review-top-tit {
						display: flex;
						line-height: rem(20);
						font-size: rem(14);

						.question-review-top-tit-l {
							flex: 1;
						}

						.question-review-top-tit-r {
							span {
								margin-left: rem(10);
							}
						}
					}

					.question-review-top-time {
						font-size: rem(12);
					}

					.question-review-top-box {
						margin: rem(10) 0;
						font-size: rem(14);
						color: #333;
					}

					.question-review-top-reply {
						background: #F7F7F7;
						padding: rem(10);
						color: #666;

						span {
							color: #507DAF;
						}
					}
				}
			}
		}
	}
	.review-txt {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 9;
		height: rem(50);
		background: #fff;
		padding: rem(10) rem(15);
		display: flex;
		box-sizing: border-box;
		border-top: 1px solid #e5e5e5;

		.review-txt-l {
			width: rem(155);
			display: flex;
			height: rem(30);
			background: #f7f7f7;
			color: #999;
			box-sizing: border-box;
			padding: 0 rem(15);
			align-items: center;

			input[type='text'] {
				flex: 1;
				background: none;
				height: rem(30);
				outline: none;
				border: 0;
				margin-left: rem(10);
			}
		}

		.review-txt-r {
			flex: 1;
			text-align: center;
			line-height: rem(30);

			div {
				display: inline-block;
				margin: 0 rem(8);
				position: relative;

				span {
					position: absolute;
					left: rem(10);
					top: -2px;
					background: #FE6270;
					height: rem(12);
					border-radius: rem(3);
					line-height: rem(12);
					vertical-align: middle;
					color: #fff;
					padding: 1px 3px;
					font-size: rem(10);
				}
			}
		}
	}

	.reply_mask{
		position: fixed;
		left: 0;
		right: 0;
		top:0;
		bottom: 0;
		background: rgba(000,000,000,.5);
		z-index: 200;
	}
	.reply_show{
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		background: #fff;
		z-index: 201;
		.reply_item{
			padding: rem(15);
			text-align: center;
			color: #333;
			font-size: rem(18);
			border-bottom: 1px solid #e5e5e5;
			&:last-child{
				border-bottom: 0;
			}
		}
	}
</style>