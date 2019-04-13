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
					<img :src="det_data.head_img">
				</div>
				<div class="recommend-li-top-tit">
					<h3>{{ det_data.name }}</h3>
					<p>{{ det_data.create_time }}</p>
				</div>
			</div>

			<div class="recommend-li-box">
				<div class="recommend-li-box-p">
					{{ det_data.content }}
				</div>
				<div class="recommend-li-box-imgb">
					<!-- <div v-for="item in imglist"><img src="https://image.dtb315.com/327000.jpg?val=Thumb"></div>-->
					<bv-scroll :api="api">
						<div>
							<div v-blue-photoswipe="{itemTagName:'DIV'}">
								<div v-for="img in det_data.list_img" class="img-list">
									<img :src="img" width="50" data-size="0x0" :msrc="img"/>
								</div>
							</div>
						</div>
					</bv-scroll>
				</div>

				<div class="question-review">
					<WrecommendReview :config="config"></WrecommendReview>
				</div>
			</div>
		</div>



	</bv-home-view>
</template>

<script>
	import {scrollMixin, scrollEndHook, scrollNoHasListData} from '$scroll';
	import life_nav_tab from "@components/wap/life-nav/w-life-nav-tab";
	import { $toast } from "$use-in-vue/mint-ui/toast";
	import WrecommendReview from '@components/wap/article/w-recommend-review/w-recommend-review';//评论
	export default {
		name: "index",
		components: {
			life_nav_tab,
			WrecommendReview
		},
		data() {
			return {
				det_data:'',//详情数据
				config: {
					data: {
						contentParams: {// 文章内容 请求参数
							article_id: this.$route.params.circle_id
						},
						commentParams: { // 评论内容 请求参数
							article_id: this.$route.params.circle_id,
							data_id: 4 // data_id带类型1文章,2书籍3,问答专区评论
						},
						submitCommentParams: { // 提交评论 请求参数 只需第一个
							article_id: this.$route.params.circle_id,
							data_id: 4 // data_id带类型1文章,2书籍3,问答专区评论
						}
					}
				}
			}
		},
		methods:{
			/*详情数据请求*/
			detail_data() {
				return this.$axios.get('/api/circle/info',{
					params: {
						circle_id: this.$route.params.circle_id
					}
				}).then((res)=>{
					//console.log(res.data.data)
					this.det_data = res.data.data
				}).catch((err)=>{
					console.log(err);
				})
			},
		},
		mounted() {
			this.detail_data();
			//console.log(this.$route.params.circle_id)
		}
	}
</script>

<style scoped lang="scss">
	h3, p {
		margin: 0;
		padding: 0;
	}

	.recommend-li {
		padding: 0 rem(15);
		border-bottom: 1px solid #e5e5e5;
		overflow: hidden;
		margin-bottom: rem(50);
		.recommend-li-top {
			padding: rem(15) 0;
			overflow: hidden;
			.recommend-li-top-img {
				width: rem(50);
				height: rem(50);
				overflow: hidden;
				border-radius: 100%;
				margin-right: rem(8);
				float: left;
				img {
					width: 100%;
					min-height: 100%;
					vertical-align: top;
				}
			}

			.recommend-li-top-tit {


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

				.img-list {
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

				span{
					margin-right: rem(20);
				}
				span.on{
					color: #CA9F75;
					i.icondianzan{
						color: #CA9F75;
					}
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

					.question-review-top-r {
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
								span.on{
									color: #CA9F75;
									i.icondianzan{
										color: #CA9F75;
									}
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
			.review-txt-form{
				flex: 1;
			}
			input[type='search'] {
				background: none;
				height: rem(30);
				outline: none;
				border: 0;
				margin-left: rem(10);
				width: rem(110);
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

	.reply-mask{
		position: fixed;
		left: 0;
		right: 0;
		top:0;
		bottom: 0;
		background: rgba(000,000,000,.5);
		z-index: 200;
	}
	.reply-show{
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		background: #fff;
		z-index: 201;
		.reply-item{
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
