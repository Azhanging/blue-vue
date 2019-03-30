<template>
	<bv-home-view class='wap' :router-level='2' style="background: #ededed;">
		<growTab :growIndex='2' :title='{
            title:{
                value: "生命导航"
            }
        }'></growTab>

		<div class="question_lists">
			<div class="question_item" v-for="(item,index) in list">
				<div class="question_ask">
					<div class="question_ask_l"><i>Q</i></div>
					<div class="question_ask_c">怎么才能调养身体，将自己脱离亚健康状态？</div>
					<div class="question_ask_r"><i class="iconfont icongengduo"></i></div>
				</div>
				<div class="question_answer">
					<div class="question_answer_l">
						<i>A</i>
					</div>
					<div class="question_answer_r">
						滚滚长江东逝水，浪花淘尽英雄。是非成败转头空。青山依旧在，几度夕阳红。白发渔樵江渚上，惯看秋月春风。一壶浊酒喜相逢。古今多少事，都付笑谈中。
					</div>
				</div>

				<div class="question_review" v-if="ifshow===index">
					<h2>全部评论</h2>
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

				<div class="question_btn" @click="if_s_click(index)">展开评论
					<i class="iconfont"
					   :class="[{iconxiangxia1:(ifshow!==index)},{iconxiangshang1:(ifshow===index)}]"></i>
				</div>

			</div>


		</div>

		<div class="question_quiz" @click='detailClick'>
			提问
		</div>


	</bv-home-view>
</template>

<script>
	import router from '@router';
	import {scrollMixin, scrollEndHook, scrollNoHasListData} from '$scroll';
	import growTab from "../components/life_nav_tab"

	export default {
		name: "index",
		components: {
			growTab
		},
		data() {
			return {
				list: [
					{id: 1},
					{id: 1},
					{id: 1},
				],
				ifshow: ''
			}
		},
		methods: {
			if_s_click(index) {
				if (this.ifshow === index) {
					this.ifshow = '';
				} else {
					this.ifshow = index;
				}
			},
			detailClick() {
				this.$router.push({'path': `${router.currentRoute.fullPath}/detail`})
			}
		}
	}
</script>

<style scoped lang="scss">
	h2 {
		margin: 0;
		padding: 0;
	}

	.question_lists {
		padding: 10px 15px 0;

		.question_item {
			background: #fff;
			margin-bottom: 15px;
			border-radius: 3px;
			font-size: rem(14);

			.question_ask {
				padding: 15px;
				display: flex;

				.question_ask_l {
					width: 15px;
					height: 15px;
					background: #CA9F75;
					vertical-align: middle;
					line-height: 15px;
					text-align: center;
					margin-top: 2px;
					margin-right: 7px;

					i {
						font-style: normal;
						color: #fff;
					}
				}

				.question_ask_c {
					flex: 1;
					line-height: 20px;
					color: #333;
				}
			}

			.question_answer {
				display: flex;
				padding: 0 15px;

				.question_answer_l {
					width: 15px;
					height: 15px;
					background: #CA9F75;
					vertical-align: middle;
					line-height: 15px;
					text-align: center;
					margin-top: 2px;
					margin-right: 7px;

					i {
						font-style: normal;
						color: #fff;
					}
				}

				.question_answer_r {
					flex: 1;
					background: #F7F7F7;
					padding: 10px;
					color: #666;
				}

			}

			.question_review {
				overflow: hidden;

				h2 {
					border-top: 1px solid #e5e5e5;
					margin-top: 15px;
					font-weight: normal;
					color: #333;
					font-size: rem(14);
					padding: 15px 15px 20px;
				}

				.question_review_top {
					padding: 0 15px;
					display: flex;

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

			.question_btn {
				text-align: center;
				padding: 12px;
				color: #CA9F75;
			}
		}
	}

	.question_quiz {
		position: fixed;
		right: 5px;
		bottom: 100px;
		width: 44px;
		height: 44px;
		border-radius: 100%;
		overflow: hidden;
		background: #CA9F75;
		font-size: rem(14);
		color: #fff;
		line-height: 44px;
		text-align: center;
	}
</style>