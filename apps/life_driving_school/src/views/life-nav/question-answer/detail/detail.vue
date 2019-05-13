<template>
	<bv-home-view class='wap' :router-level='3' style="background: #ededed;">

		<w-home-header :header='{
            title:{
                value: "问答详情"
            }
        }'></w-home-header>

		<div class="question-lists">
			<div class="question-item">
				<div class="question-ask">
					<div class="question-ask-l"><i>Q</i></div>
					<div class="question-ask-c">{{ det_data.question }}</div>
				</div>
				<div class="question-answer">
					<div class="question-answer-l">
						<i>A</i>
					</div>
					<div class="question-answer-r">
						{{ det_data.answer }}
					</div>
				</div>
				<div class="question-review">
					<!--<h2>全部评论</h2>-->

					<!--<WrecommendReview :opts="opts"></WrecommendReview>-->
					<!--文章阅读量 点赞量-->
					<w-article-clicknum :opts="opts" :comment="comment"></w-article-clicknum>

					<!--文章评论-->
					<bv-scroll :api="api" :disabled="load.state.disabled">
						<w-comment
							:opts="opts"
							:comment="comment"
							@replyFocus='replyFocus'
							@hideReply="hideReply"
							@showReply="showReply"
						></w-comment>
						<template slot="load-down">
							<div class="bc-t-c bc-pd-10rp" v-if="load.state.hasMore">
								数据加载中...
							</div>
							<div class="bc-t-c bc-pd-10rp" v-else-if="load.data.lists.length === 0">
								暂无数据
							</div>
							<div class="bc-t-c bc-pd-10rp" v-else-if="!load.state.hasMore && load.data.lists.length > 0">
								暂无更多数据...
							</div>
						</template>
					</bv-scroll>

					<!--回复评论-->
					<!--<template slot="footer">

					</template>-->
					<w-comment-reply :opts="opts" :comment="comment" :btn_contribute="false" ref="reply"></w-comment-reply>

				</div>
			</div>
		</div>

	</bv-home-view>
</template>

<script>
	import Index from "../question-answer";
	import WArticleClicknum from '@components/wap/article/w-article-clicknum';
	import WComment from '@components/wap/article/w-comment';
	import WCommentReply from '@components/wap/article/w-comment-reply';
	import { scrollMixin, scrollEndHook, scrollNoHasListData } from '$scroll';
	import { commentMixin } from '@components/wap/article/w-article-body/article';
	export default {
		name: "detail",
		mixins: [scrollMixin(), commentMixin({
			scrollEndHook,
			scrollNoHasListData
		})],
		components: {
			Index,
			'w-article-clicknum': WArticleClicknum,
			'w-comment': WComment,
			'w-comment-reply': WCommentReply
		},
		data() {
			return {
				comment: {},
				det_data:'',
				opts: {
					data: {
						contentParams: {// 文章内容 请求参数
							article_id: this.$route.params.circle_id
						},
						commentParams: { // 评论内容 请求参数
							article_id: this.$route.params.circle_id,
							data_id: 3 // data_id带类型1文章,2书籍3,问答专区评论
						},
						submitCommentParams: { // 提交评论 请求参数 只需第一个
							article_id: this.$route.params.circle_id,
							data_id: 3 // data_id带类型1文章,2书籍3,问答专区评论
						}
					}
				}
			}
		},
		methods: {
			show_detail(){//详情获取
				return this.$axios.get('/api/feedback/info',{
					params: {
						feedback_id: this.$route.params.circle_id
					}
				}).then((res)=>{
					this.det_data = res.data.data
					const {share_title, share_img,  share_content} = this.det_data;
					//this.info = data;
					this.comment.shareInfo = {
						title: share_title,
						thumImage: share_img,
						descr: share_content,
					};
					// 微信分享
					this.$weChatShare({
						title: share_title,
						imgUrl: share_img,
						desc: share_content,
					});
					
				}).catch((err)=>{
					console.log(err);
				})
			},
		},
		mounted() {
			this.show_detail();
		}
	}
</script>

<style scoped lang="scss">
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
	.question-lists {
		padding: rem(10) rem(15) 0;
		margin-bottom: rem(50);

		.question-item {
			background: #fff;
			margin-bottom: rem(15);
			padding-bottom: rem(15);
			border-radius: rem(3);
			font-size: rem(14);
			display: block;
			.question-ask {
				padding: rem(15);
				display: flex;

				.question-ask-l {
					width: rem(15);
					height: rem(15);
					background: #CA9F75;
					vertical-align: middle;
					line-height: rem(15);
					text-align: center;
					margin-top: rem(2);
					margin-right: rem(7);

					i {
						font-style: normal;
						color: #fff;
					}
				}

				.question-ask-c {
					flex: 1;
					line-height: rem(20);
					color: #333;
				}
			}

			.question-answer {
				display: flex;
				padding: 0 rem(15);
				margin-bottom: rem(15);
				.question-answer-l {
					width: rem(15);
					height: rem(15);
					background: #CA9F75;
					vertical-align: middle;
					line-height: rem(15);
					text-align: center;
					margin-top: rem(2);
					margin-right: rem(7);

					i {
						font-style: normal;
						color: #fff;
					}
				}

				.question-answer-r {
					flex: 1;
					background: #F7F7F7;
					padding: rem(10);
					color: #666;
				}

			}

			.question-review {
				overflow: hidden;

				h2 {
					border-top: 1px solid #e5e5e5;
					margin-top: rem(15);
					font-weight: normal;
					color: #333;
					font-size: rem(14);
					padding: rem(15) rem(15) rem(10);
				}

				.question-review-top {
					padding: 0 rem(15);
					display: flex;
					margin-top: rem(10);
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

			.question-btn {
				text-align: center;
				padding: rem(12);
				color: #CA9F75;
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
