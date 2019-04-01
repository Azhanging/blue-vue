<template>
	<bv-home-view class='wap' :router-level='3'>
		<life_nav_tab :growIndex='3' :title='{
            title:{
                value: "健康导航"
            }
        }'></life_nav_tab>

		<div class="recommend-li">
			<div class="recommend-li-top">
				<div class="recommend-li-top-img">
					<img src="https://image.dtb315.com/76343.jpg">
				</div>
				<div class="recommend-li-top-tit">
					<h3>风和日丽</h3>
					<p>2019-02-19</p>
				</div>
			</div>

			<div class="recommend-li-box">
				<div class="recommend-li-box-p">
					生活中有很多食物并不是所有人都能吃的，一些
					人吃了以后就会生病了。大漠粮芯藻这种食物很
					多人都听过，但是没有吃过的。螺旋藻这种食物
					营养丰富，同样的也不是所有人都适合吃的。那
					么到底螺旋藻适合哪些人吃呢?
				</div>
				<div class="recommend-li-box-imgb">
					<!-- <div v-for="item in imglist"><img src="https://image.dtb315.com/327000.jpg?val=Thumb"></div>-->
					<bv-scroll :api="api">
						<div v-for="item in imglist">
							<div v-blue-photoswipe="{itemTagName:'DIV'}">
								<div v-for="img in item.imgs" class="img_list">
									<img :src="img.src" width="50" data-size="0x0" :msrc="img.src"/>
								</div>
							</div>
						</div>
					</bv-scroll>
				</div>

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
	import {scrollMixin, scrollEndHook, scrollNoHasListData} from '$scroll';
	import life_nav_tab from "../components/life-nav-tab"

	export default {
		name: "index",
		components: {
			life_nav_tab,
		},
		data() {
			return {
				imglist: [{
					imgs: [{src: 'https://image.dtb315.com/327640.jpg?val=Thumb'},
						{src: 'https://image.dtb315.com/327773.jpg?val=Thumb'},
						{src: 'https://image.dtb315.com/326999.jpg?val=Thumb'},
						{src: 'https://image.dtb315.com/327036.jpg?val=Thumb'},
						{src: 'https://image.dtb315.com/327703.jpg?val=Thumb'}
					]
				}],
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
	h3, p {
		margin: 0;
		padding: 0;
	}

	.recommend-li {
		margin-bottom: rem(50);
		padding: 0 rem(15);
		border-bottom: 1px solid #e5e5e5;
		overflow: hidden;

		.recommend-li-top {
			padding: rem(15) 0;
			display: flex;

			.recommend-li-top-img {
				width: rem(50);
				height: rem(50);
				overflow: hidden;
				border-radius: 100%;
				margin-right: rem(8);

				img {
					width: 100%;
					vertical-align: top;
				}
			}

			.recommend-li-top-tit {
				flex: 1;

				h3 {
					font-size: rem(18);
					color: #222;
					font-weight: normal;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				p {
					font-size: rem(14);
					color: #888;
					margin-top: rem(8);
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
		}

		.recommend-li-box {
			.recommend-li-box-p {
				font-size: rem(16);
				color: #333;
				line-height: rem(24);
				margin-bottom: rem(15);
			}

			.recommend-li-box-imgb {
				&:after {
					clear: both;
					content: '.';
					display: block;
					width: 0;
					height: 0;
					visibility: hidden;
				}

				.img_list {
					float: left;
					width: 32.5%;
					margin-right: 3px;
					margin-bottom: 3px;
					height: rem(100);
					overflow: hidden;

					img {
						width: 100%;
						vertical-align: top;
						min-height: rem(100);
					}

					&:nth-child(3n) {
						margin-right: 0;
					}
				}
			}

			.recommend-li-box-video {
				position: relative;

				.recommend-li-box-video-t {
					img {
						width: 100%;
						vertical-align: top;
					}
				}

				.recommend-li-box-video-back {
					background: rgba(0, 0, 0, .5);
					position: absolute;
					left: 0;
					top: 0;
					bottom: 0;
					right: 0;
					z-index: 5;
				}

				.recommend-li-box-video-btn {
					width: rem(40);
					height: rem(40);
					position: absolute;
					left: 50%;
					top: 50%;
					margin-left: rem(-20);
					margin-top: rem(-20);
					z-index: 6;
					color: #fff;
					border: 1px solid #fff;
					border-radius: 100%;
					text-align: center;
					line-height: rem(40);
					box-sizing: border-box;

					i {
						font-size: rem(14);
					}
				}
			}

			.recommend-li-box-view {
				padding: rem(10) 0;
				font-size: rem(12);
				color: #666;

				span {
					margin-right: rem(20);
				}
			}

			.question-review {
				overflow: hidden;
				border-top: 1px solid #e5e5e5;
				margin-top: rem(15);
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