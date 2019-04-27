<template>
	<bv-home-view class='wap' :router-level='2' style="background: #ededed;">
		<life_nav_tab :title='{
            title:{
                value: "生活导航"
            }
        }' :leftControl="`/`"></life_nav_tab>
		<bv-scroll :api="api" :disabled="load.state.disabled">
			<div class="question-lists">
				<router-link :to="`${$router.currentRoute.fullPath}/detail/${item.id}`" class="question-item" v-for="(item,index) in load.data.lists">
					<div class="question-ask">
						<div class="question-ask-l"><i>Q</i></div>
						<div class="question-ask-c">{{ item.question }}</div>
						<!--<div class="question-ask-r" @click="btn_reply"><i class="iconfont icongengduo"></i></div>-->
					</div>
					<div class="question-answer">
						<div class="question-answer-l">
							<i>A</i>
						</div>
						<div class="question-answer-r">
							{{ item.answer }}
						</div>
					</div>
				</router-link>
			</div>
			
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


		<router-link :to="`${$router.currentRoute.fullPath}/questions`" class="question-quiz">
			提问
		</router-link>


		<!--<div class="review-txt" v-if="review_txt">
			<div class="review-txt-l">
				<i class="iconfont iconbianji"></i><input ref="review_hf" :autofocus="focus" type="text" placeholder="评论...">
			</div>
			<div class="review-txt-r">
				<div><i class="iconfont iconpinglun"></i><span>3654</span></div>
				<div><i class="iconfont iconxingxing"></i></div>
				<div><i class="iconfont icondianzan"></i></div>
				<div><i class="iconfont icon-"></i></div>
			</div>
		</div>-->


<!--		<div class="reply-mask" v-if="reply_show"></div>
		<div class="reply-show" v-if="reply_show">
			<div class="reply-item" @click="btn_reply_txt()">回复</div>
			<div class="reply-item" @click="btn_reply_h">取消</div>
		</div>-->

	</bv-home-view>
</template>

<script>
	import router from '@router';
	import {scrollMixin, scrollEndHook, scrollNoHasListData} from '$scroll';
	import life_nav_tab from "@components/wap/life-nav/w-life-nav-tab";


	export default {
		name: "question-answer",
		mixins: [scrollMixin()],
		components: {
			life_nav_tab
		},
		data() {
			return {
				reply_show:false,
				review_txt:false
			}
		},
		computed:{
			currentFullPath(){
				return this.$router.currentRoute.fullPath;
			}
		},
		methods: {
			btn_reply() {
				this.reply_show = true
			},
			btn_reply_h() {
				this.reply_show = false
			},
			btn_reply_txt(){
				this.reply_show = false;
				this.review_txt = true;
				//this.$refs.review_hf.focus();
				this.$nextTick(()=>{
					this.$refs.review_hf.focus()
				})
			},

			api() {
				//const page = this.load.params.page++;
				return this.$axios.get('/api/feedback/getList', {
					params: {
						column_id : this.$route.params.id,
						page: this.load.params.page++
					}
				}).then((res) => {
					const { data: resultData } = res.data;
					if (scrollNoHasListData.call(this, {
						resultData,
						listKey: 'list'
					})) {
						scrollEndHook.call(this);
					} else {
						if(resultData.list.length < 10) scrollEndHook.call(this);
						this.load.data.lists = this.load.data.lists.concat(resultData.list);
					}
				}).catch(() => {
					return scrollEndHook.call(this);
				});

			}
		}
	}
</script>

<style scoped lang="scss">
	h2 {
		margin: 0;
		padding: 0;
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
	.question-lists {
		padding: rem(10) rem(15) 0;

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
