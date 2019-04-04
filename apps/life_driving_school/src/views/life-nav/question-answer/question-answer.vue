<template>
	<bv-home-view class='wap' :router-level='2' style="background: #ededed;">
		<life_nav_tab :growIndex='2' :title='{
            title:{
                value: "生命导航"
            }
        }'></life_nav_tab>

		<div class="question-lists">
			<div class="question-item" v-for="(item,index) in list">
				<div class="question-ask">
					<div class="question-ask-l"><i>Q</i></div>
					<div class="question-ask-c">怎么才能调养身体，将自己脱离亚健康状态？</div>
					<div class="question-ask-r" @click="btn_reply"><i class="iconfont icongengduo"></i></div>
				</div>
				<div class="question-answer">
					<div class="question-answer-l">
						<i>A</i>
					</div>
					<div class="question-answer-r">
						滚滚长江东逝水，浪花淘尽英雄。是非成败转头空。青山依旧在，几度夕阳红。白发渔樵江渚上，惯看秋月春风。一壶浊酒喜相逢。古今多少事，都付笑谈中。
					</div>
				</div>

				<div class="question-review" v-if="ifshow===index">
					<h2>全部评论</h2>
					<div class="question-review-top">
						<div class="question-review-top-l">
							<img src="https://image.dtb315.com/76343.jpg">
						</div>
						<div class="question-review-top-r">
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
						<div class="question-review-top-r">
							<div class="question-review-top-tit">
								<div class="question-review-top-tit-l">鼠妹的小夏目</div>
								<div class="question-review-top-tit-r">
									<span><i class="iconfont icondianzan"></i> 155</span>
									<span @click="btn_reply"><i class="iconfont icongengduo"></i></span>
								</div>
							</div>
							<div class="question-review-top-time">2小时前</div>
							<div class="question-review-top-box">你好，我是鼠妹的夏目</div>
						</div>
					</div>
				</div>

				<div class="question-btn" @click="ifsClick(index)">展开评论
					<i class="iconfont"
					   :class="[{iconxiangxia1:(ifshow!==index)},{iconxiangshang1:(ifshow===index)}]"></i>
				</div>

			</div>


		</div>

		<router-link :to="`${currentFullPath}/detail`" class="question-quiz">
			提问
		</router-link>

		<div class="reply-mask" v-if="reply_show"></div>
		<div class="reply-show" v-if="reply_show">
			<div class="reply-item">回复</div>
			<div class="reply-item" @click="btn_reply_h">取消</div>
		</div>

	</bv-home-view>
</template>

<script>
	import router from '@router';
	import {scrollMixin, scrollEndHook, scrollNoHasListData} from '$scroll';
	import life_nav_tab from "@components/wap/life-nav/w-life-nav-tab";

	export default {
		name: "index",
		components: {
			life_nav_tab
		},
		data() {
			return {
				list: [
					{id: 1},
					{id: 1},
					{id: 1},
				],
				ifshow: '',
				reply_show:false
			}
		},
		computed:{
			currentFullPath(){
				return this.$router.currentRoute.fullPath;
			}
		},
		methods: {
			ifsClick(index) {
				if (this.ifshow === index) {
					this.ifshow = '';
				} else {
					this.ifshow = index;
				}
			},
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
	h2 {
		margin: 0;
		padding: 0;
	}

	.question-lists {
		padding: rem(10) rem(15) 0;

		.question-item {
			background: #fff;
			margin-bottom: rem(15);
			border-radius: rem(3);
			font-size: rem(14);

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

	.question-quiz {
		position: fixed;
		right: rem(5);
		bottom: rem(100);
		width: rem(44);
		height: rem(44);
		border-radius: 100%;
		overflow: hidden;
		background: #CA9F75;
		font-size: rem(14);
		color: #fff;
		line-height: rem(44);
		text-align: center;
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
