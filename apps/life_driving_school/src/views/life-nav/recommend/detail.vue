<template>
	<bv-home-view class='wap' :router-level='3'>
		<growTab :growIndex='3' :title='{
            title:{
                value: "健康导航"
            }
        }'></growTab>

		<div class="recommend_li">
			<div class="recommend_li_top">
				<div class="recommend_li_top_img">
					<img src="https://image.dtb315.com/76343.jpg">
				</div>
				<div class="recommend_li_top_tit">
					<h3>风和日丽</h3>
					<p>2019-02-19</p>
				</div>
			</div>

			<div class="recommend_li_box">
				<div class="recommend_li_box_p">
					生活中有很多食物并不是所有人都能吃的，一些
					人吃了以后就会生病了。大漠粮芯藻这种食物很
					多人都听过，但是没有吃过的。螺旋藻这种食物
					营养丰富，同样的也不是所有人都适合吃的。那
					么到底螺旋藻适合哪些人吃呢?
				</div>
				<div class="recommend_li_box_imgb">
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

				<div class="question_review">
					<div class="question_review_top">
						<div class="question_review_top_l">
							<img src="https://image.dtb315.com/76343.jpg">
						</div>
						<div class="question_review_top_r">
							<div class="question_review_top_tit">
								<div class="question_review_top_tit_l">聪明的一休</div>
								<div class="question_review_top_tit_r">
									<span><i class="iconfont icondianzan"></i> 2222</span>
									<span><i class="iconfont icongengduo"></i></span>
								</div>
							</div>
							<div class="question_review_top_time">1小时前</div>
							<div class="question_review_top_box">猫和老鼠你好，我是聪明的一休</div>
							<div class="question_review_top_reply"><span>@猫和老鼠</span>我是猫和老鼠我是猫和老鼠我是猫和老鼠我是猫和老鼠我</div>
						</div>
					</div>
					<div class="question_review_top">
						<div class="question_review_top_l">
							<img src="https://image.dtb315.com/76343.jpg">
						</div>
						<div class="question_review_top_r">
							<div class="question_review_top_tit">
								<div class="question_review_top_tit_l">鼠妹的小夏目</div>
								<div class="question_review_top_tit_r">
									<span><i class="iconfont icondianzan"></i> 155</span>
									<span><i class="iconfont icongengduo"></i></span>
								</div>
							</div>
							<div class="question_review_top_time">2小时前</div>
							<div class="question_review_top_box">你好，我是鼠妹的夏目</div>
						</div>
					</div>
				</div>


			</div>
		</div>


		<div class="review_txt">
			<div class="review_txt_l">
				<i class="iconfont iconbianji"></i><input type="text" placeholder="写评论...">
			</div>
			<div class="review_txt_r">
				<div><i class="iconfont iconpinglun"></i><span>3654</span></div>
				<div><i class="iconfont iconxingxing"></i></div>
				<div><i class="iconfont icondianzan"></i></div>
				<div><i class="iconfont icon-"></i></div>
			</div>
		</div>

	</bv-home-view>
</template>

<script>
	import {scrollMixin, scrollEndHook, scrollNoHasListData} from '$scroll';
	import growTab from "../components/life_nav_tab"

	export default {
		name: "index",
		components: {
			growTab,
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
				}]
			}
		},
	}
</script>

<style scoped lang="scss">
	h3, p {
		margin: 0;
		padding: 0;
	}

	.recommend_li {
		margin-bottom: 50px;
		padding: 0 15px;
		border-bottom: 1px solid #e5e5e5;
		overflow: hidden;

		.recommend_li_top {
			padding: 15px 0;
			display: flex;

			.recommend_li_top_img {
				width: 50px;
				height: 50px;
				overflow: hidden;
				border-radius: 100%;
				margin-right: 8px;

				img {
					width: 100%;
					vertical-align: top;
				}
			}

			.recommend_li_top_tit {
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
					margin-top: 8px;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
		}

		.recommend_li_box {
			.recommend_li_box_p {
				font-size: rem(16);
				color: #333;
				line-height: 24px;
				margin-bottom: 15px;
			}

			.recommend_li_box_imgb {
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
					height: 100px;
					overflow: hidden;

					img {
						width: 100%;
						vertical-align: top;
						min-height: 100px;
					}

					&:nth-child(3n) {
						margin-right: 0;
					}
				}
			}

			.recommend_li_box_video {
				position: relative;

				.recommend_li_box_video_t {
					img {
						width: 100%;
						vertical-align: top;
					}
				}

				.recommend_li_box_video_back {
					background: rgba(0, 0, 0, .5);
					position: absolute;
					left: 0;
					top: 0;
					bottom: 0;
					right: 0;
					z-index: 5;
				}

				.recommend_li_box_video_btn {
					width: 40px;
					height: 40px;
					position: absolute;
					left: 50%;
					top: 50%;
					margin-left: -20px;
					margin-top: -20px;
					z-index: 6;
					color: #fff;
					border: 1px solid #fff;
					border-radius: 100%;
					text-align: center;
					line-height: 40px;
					box-sizing: border-box;

					i {
						font-size: rem(14);
					}
				}
			}

			.recommend_li_box_view {
				padding: 10px 0;
				font-size: rem(12);
				color: #666;

				span {
					margin-right: 20px;
				}
			}

			.question_review {
				overflow: hidden;
				border-top: 1px solid #e5e5e5;
				margin-top: 15px;
				padding-top: 15px;

				.question_review_top {
					display: flex;
					margin-bottom: 10px;

					.question_review_top_l {
						width: 38px;
						height: 38px;
						border-radius: 100%;
						overflow: hidden;
						margin-right: 15px;

						img {
							vertical-align: top;
							width: 100%;
						}
					}

					.question_review_top_r {
						flex: 1;

						.question_review_top_tit {
							display: flex;
							line-height: 20px;
							font-size: rem(14);

							.question_review_top_tit_l {
								flex: 1;
							}

							.question_review_top_tit_r {
								span {
									margin-left: 10px;
								}
							}
						}

						.question_review_top_time {
							font-size: rem(12);
						}

						.question_review_top_box {
							margin: 10px 0;
							font-size: rem(14);
							color: #333;
						}

						.question_review_top_reply {
							background: #F7F7F7;
							padding: 10px;
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

	.review_txt {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 9;
		height: 50px;
		background: #fff;
		padding: 10px 15px;
		display: flex;
		box-sizing: border-box;

		.review_txt_l {
			width: 155px;
			display: flex;
			height: 30px;
			background: #f7f7f7;
			color: #999;
			box-sizing: border-box;
			padding: 0 15px;
			align-items: center;

			input[type='text'] {
				flex: 1;
				background: none;
				height: 30px;
				outline: none;
				border: 0;
				margin-left: 10px;
			}
		}

		.review_txt_r {
			flex: 1;
			text-align: center;
			line-height: 30px;

			div {
				display: inline-block;
				margin: 0 8px;
				position: relative;

				span {
					position: absolute;
					left: 10px;
					top: -2px;
					background: #FE6270;
					height: 12px;
					border-radius: 3px;
					line-height: 12px;
					vertical-align: middle;
					color: #fff;
					padding: 1px 3px;
					font-size: rem(10);
				}
			}
		}
	}
</style>